const { User } = require('../models/model.js');
const { secret } = require('../config/config.js');
const i18n = require('i18n');
const error401 = require('../public/js/error401.js');
var form = null;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
var Message = null;

exports.index = async function (request, response) {
  if (request.user != null) {
    if (request.user.role === 1) {
      response.render('profile.hbs', {
        User: request.user.toJSON(),
        isAuth: true,
        isAdmin: true,
        Title: `${i18n.__('profileUpdate')} | esd-by.org`,
        Message: Message,
      });
    } else {
      response.render('profile.hbs', {
        User: request.user.toJSON(),
        isAuth: true,
        Title: `${i18n.__('profileUpdate')} | esd-by.org`,
        Message: Message,
      });
    }
    Message = null;
  } else {
    response.render('login.hbs', {
      Title: `${i18n.__('login')} | esd-by.org`,
      form: form,
    });
  }
};

exports.exit = async function (request, response) {
  response.cookie('token', '');
  response.redirect('/');
};

exports.authenticate = async function (request, response) {
  const username = request.body.username;
  const userPassword = request.body.password;
  const result = await User.findOne({
    where: {
      name: username,
    },
  });
  if (result === null) {
    form = {
      username: username,
      message: i18n.__('noUser'),
    };
    response.redirect('/login');
  } else {
    const salt = result.passwordSalt;
    const passwordHash = crypto.createHash('sha512').update(`${userPassword}${salt}`).digest('hex');

    if (passwordHash === result.password) {
      const token = jwt.sign({ user: result }, secret, {});
      response.cookie('token', token, {
        secure: false,
      });
      response.redirect('/');
    } else {
      form = {
        username: username,
        message: i18n.__('invalidPassword'),
      };
      response.redirect('/login');
    }
  }
};

exports.update = async function (request, response) {
  if (!request.user) {
    response.redirect('/login');
  }
  const userName = request.body.name;
  let userPassword = request.body.password;
  const userPasswordNew = request.body.passwordNew;
  const result = await User.findOne({
    where: {
      id: request.user.id,
    },
  });
  if (result === null) {
    error401(request, response);
  } else {
    if (userPasswordNew != '') {
      if (userPassword != '') {
        const salt = result.passwordSalt;
        const passwordHash = crypto.createHash('sha512')
          .update(`${userPassword}${salt}`)
          .digest('hex');
        if (passwordHash === result.password) {
          userPassword = crypto.createHash('sha512')
            .update(`${userPasswordNew}${salt}`)
            .digest('hex');
        } else {
          Message = i18n.__('invalidOldPassword');
          response.redirect('/login');
          return;
        }
      } else {
          Message = i18n.__('emptyOldPassword');
        response.redirect('/login');
        return;
      }
    } else {
      if (userPassword == '') {
        userPassword = result.password;
      } else {
          Message = i18n.__('emptyNewPassword');
        response.redirect('/login');
        return;
      }
    }
    let values = {
      name: userName,
      password: userPassword,
    };
    result.update(values);

    Message = i18n.__('dataSavedSuccessfully');
    response.redirect('/login');
  }
};
