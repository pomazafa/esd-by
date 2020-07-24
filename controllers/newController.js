const verifyToken = require('../public/js/authenticate.js');
const {
    New
} = require('../models/model.js');

exports.index = async function (request, response) {
    const lang = request.params.lang;
    if (await verifyToken(request, response) && request.user != null) {
        if (request.user.role == 2) {
            if (lang.toLowerCase() == "en") {
                response.send('english version would be later.........')
            } else {
                const news = await New.findAll();
                response.render("news.hbs", {
                    News: news.map(n => n.toJSON()),
                    Title: "Новости | esd-by.org",
                    isAdmin: true
                })
            }
        } else {
            if (lang.toLowerCase() == "en") {
                response.send('english version would be later.........')
            } else {
                const news = await New.findAll();
                response.render("news.hbs", {
                    News: news.map(n => n.toJSON()),
                    Title: "Новости | esd-by.org",
                    isAuth: true
                })
            }
        }
    } else {
        if (lang.toLowerCase() == "en") {
            response.send('english version would be later.........')
        } else {
            const news = await New.findAll();
            response.render("news.hbs", {
                News: news.map(n => n.toJSON()),
                Title: "Новости | esd-by.org"
            })
        }
    }

};

exports.getNew = async function (request, response) {
    const lang = request.params.lang;
    const id = request.params.id;
    if (await verifyToken(request, response) && request.user != null) {
        if (request.user.role == 2) {
            if (lang.toLowerCase() == "en") {
                response.send('english version would be later.........')
            } else {
                const news = await New.findOne({
                    where: {
                        id: id
                    }
                });
                response.render("new.hbs", {
                    News: news.toJSON(),
                    Title: news.title + " | esd-by.org",
                    isAdmin: true
                })
            }
        } else {
            if (lang.toLowerCase() == "en") {
                response.send('english version would be later.........')
            } else {
                const news = await New.findOne({
                    where: {
                        id: id
                    }
                });
                response.render("new.hbs", {
                    News: news.toJSON(),
                    Title: news.title + " | esd-by.org",
                    isAuth: true
                })
            }
        }
    } else {
        if (lang.toLowerCase() == "en") {
            response.send('english version would be later.........')
        } else {
            const news = await New.findOne({
                where: {
                    id: id
                }
            });
            response.render("new.hbs", {
                News: news.toJSON(),
                Title: news.title + " | esd-by.org"
            })
        }
    }
};

exports.addget = async function (request, response) {
    const lang = request.params.lang;
    if (await verifyToken(request, response) && request.user != null) {
        if (request.user.role == 2) {
            if (lang.toLowerCase() == "en") {
                response.send('english version would be later.........')
            } else {
                response.render("addnew.hbs", {
                    Title: "Добавить новость | esd-by.org"
                })
            }
        } else {
            response.redirect('/news/ru')
        }
    } else {
        response.redirect('/news/ru')
    }
};
exports.addpost = async function (request, response) {
    const title = request.body.title;
    const messageShort = request.body.messageShort == "" ? null : request.body.messageShort;
    const photoDescription = request.body.photoDescription == "" ? null : request.body.photoDescription;
    const message = request.body.message;

    await New.create({
        title: title,
        photoURL: request.filename,
        photoDescription: photoDescription,
        newDate: new Date(),
        message: message,
        messageShort: messageShort
    });
    response.redirect('/news/ru');
};

exports.delete = async function (request, response) {
    const id = request.params.id;

    await New.destroy({
        where: {
            id: id
        }
    })
    response.redirect('/news/ru');
};