const { User } = require("../models/user.js");
const { secret } = require('../config/config.js');
const verifyToken = require('../public/js/authenticate.js');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
var form = null;

exports.index = async function(request, response) {
    if (await verifyToken(request, response)) {
        response.redirect('/');
    } else {
        response.render("entry.hbs", {
            title: 'Вход  | esd-by.org'
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
            name: username,
            message: 'Пользователя с таким логином не существует'
        };
        response.redirect('/entry');
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
                name: username,
                message: 'Неверный пароль'
            };
            response.redirect('/entry');
        }
    }
};