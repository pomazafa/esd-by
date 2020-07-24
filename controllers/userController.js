const { User } = require('../models/model.js');
const { secret } = require('../config/config.js');
const verifyToken = require('../public/js/authenticate.js');
const error401 = require('../public/js/error401.js');
var form = null;
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
var Message = null;

exports.index = async function(request, response) {
    if (await verifyToken(request, response)) {
        if (request.user != null) {
            if (request.user.role == 1) {
                response.render('profile.hbs', {
                    User: request.user.toJSON(),
                    isAuth: true,
                    isAdmin: true,
                    Title: 'Изменение профиля | esd-by.org',
                    Message: Message
                })
            } else {
                response.render('profile.hbs', {
                    User: request.user.toJSON(),
                    isAuth: true,
                    Title: 'Изменение профиля | esd-by.org',
                    Message: Message
                })
            }
            Message = null;
        } else {
            error401(request, response);
        }
    } 
    else {
        response.render("login.hbs", {
            Title: 'Вход  | esd-by.org', form: form
        });
    }
};

exports.exit = async function(request, response) {
    response.cookie('token', '');
    response.redirect("/");
};

exports.authenticate = async function(request, response) {
    const username = request.body.username;
    const userPassword = request.body.password;
    const result = await User.findOne({
        where: {
            name: username
        }
    })
    if (result === null) {
        form = {
            username: username,
            message: 'Пользователя с таким логином не существует'
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
                message: 'Неверный пароль'
            };
            response.redirect('/login');
        }
    }
};

exports.update = async function (request, response) {
    if (await verifyToken(request, response)) {
        const userName = request.body.name;
        var userPassword = request.body.password;
        const userPasswordNew = request.body.passwordNew;
        const result = await User.findOne({
            where: {
                id: request.user.id
            }
        })
        if (result === null) {
            error401(request, response);
        } else {
                if (userPasswordNew != "") {
                    if (userPassword != "") {
                        const salt = result.passwordSalt;
                        const passwordHash = crypto.createHash('sha512').update(`${userPassword}${salt}`).digest('hex');
                        if (passwordHash === result.password) {
                            userPassword = crypto.createHash('sha512').update(`${userPasswordNew}${salt}`).digest('hex');
                        } else {
                            Message = "Старый пароль введён неверно";
                            response.redirect('/login');
                            return;
                        }
                    } else {
                        Message = "Вы не ввели старый пароль";
                        response.redirect('/login');
                        return;
                    }
                } else {
                    if (userPassword == "") {
                        userPassword = result.password;
                    } else {
                        Message = "Вы не ввели новый пароль";
                        response.redirect('/login');
                        return;
                    }
                }
                let values = {
                    name: userName,
                    password: userPassword
                };
                result.update(values);

                Message = "Данные успешно сохранены";
                response.redirect('/login');
        }
    } else {
        response.redirect('/login');
    }
}