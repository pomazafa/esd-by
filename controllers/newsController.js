const {
  New,
} = require('../models/model.js');
const i18n = require('i18n');
const i18nUtil = require('../i18n/i18nUtil');
const fs = require('fs');
const { asyncForEach } = require('../util/controllerUtil');
const { translate } = require('../util/tranlateUtil');

let form = null;

exports.index = async function (request, response) {
  const news = await New.findAll({ order: [['newDate', 'DESC']]});

  await asyncForEach(news, async news => {
    await translateNews(news);
  });

  if (request.user != null) {
    if (request.user.role === 2) {
      response.render('news.hbs', {
        News: news.map(n => n.toJSON()),
        Title: `${i18n.__('news')} | esd-by.org`,
        isAdmin: true,
      });
    } else {
      response.render('news.hbs', {
        News: news.map(n => n.toJSON()),
        Title: `${i18n.__('news')} | esd-by.org`,
        isAuth: true,
      });
    }
  } else {
    response.render('news.hbs', {
      News: news.map(n => n.toJSON()),
      Title: `${i18n.__('news')} | esd-by.org`,
    });
  }
};

exports.getNew = async function (request, response) {
  const id = request.params.id;
  const news = await New.findOne({
    where: {
      id: id,
    },
  });

  await translateNews(news);

  if (request.user != null) {
    if (request.user.role == 2) {
      response.render('new.hbs', {
        News: news.toJSON(),
        Title: news.title + ' | esd-by.org',
        isAdmin: true,
      });
    } else {
      response.render('new.hbs', {
        News: news.toJSON(),
        Title: news.title + ' | esd-by.org',
        isAuth: true,
      });
    }
  } else {
    response.render('new.hbs', {
      News: news.toJSON(),
      Title: news.title + ' | esd-by.org',
    });
  }
};

const translateNews = async news => {
  return await translate(news, ['title', 'messageShort', 'message']);
};

exports.addget = async function (request, response) {
  if (request.user != null) {
    if (request.user.role == 2) {
      response.render('addnew.hbs', {
        Title: `${i18n.__('addNews')} | esd-by.org`,
        form: form
      });
      form = null;
    } else {
      response.redirect(i18nUtil.urlWithLocale('news'));
    }
  } else {
    response.redirect(i18nUtil.urlWithLocale('news'));
  }
};

exports.addpost = async function (request, response) {
  const title = request.body.title;
  const messageShort = request.body.messageShort == '' ? null : request.body.messageShort;
  const photoDescription = request.body.photoDescription == ''
    ? null
    : request.body.photoDescription;
  const message = request.body.message;

  if (title === "") {
    form = {
      errmessage: i18n.__('emptyTitle'),
      title: title,
      messageShort: messageShort,
      photoDescription: photoDescription,
      message: message
    }
    response.redirect('/news/add')
    return;
  }
  if (message === "") {
    form = {
      errmessage: i18n.__('emptyMessage'),
      title: title,
      messageShort: messageShort,
      photoDescription: photoDescription,
      message: message
    }
    response.redirect('/news/add')
    return;
  }

  await New.create({
    title: title,
    photoURL: request.file ? request.file.filename : null,
    photoDescription: photoDescription,
    newDate: new Date(),
    message: message,
    messageShort: messageShort,
  });
  response.redirect(i18nUtil.urlWithLocale('news'));
};

exports.delete = async function (request, response) {
  const id = request.params.id;

  const news = await New.findOne({
    where: {
      id: id,
    },
  });

  await New.destroy({
    where: {
      id: id,
    },
  });

  const fileName = './public/images/uploads/' + news.photoURL;

  fs.access(fileName, fs.F_OK, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    fs.unlink(fileName, function (err) {
      if (err) return console.log(err);
      console.log('file deleted successfully');
    });
  });

  response.redirect(i18nUtil.urlWithLocale('news'));
};
