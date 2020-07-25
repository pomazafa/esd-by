const {
    Event
  } = require('../models/model.js');
  const i18n = require('i18n');
  const i18nUtil = require('../i18n/i18nUtil');
  
  exports.index = async function (request, response) {
    if (request.user != null) {
      if (request.user.role === 2) {
        const events = await Event.findAll({include: [Photo]});
        response.render('events.hbs', {
          Events: events.map(n => n.toJSON()),
          Title: `${i18n.__('events')} | esd-by.org`,
          isAdmin: true,
        });
      } else {
        const events = await Event.findAll({include: [Photo]});
        response.render('events.hbs', {
          Events: events.map(n => n.toJSON()),
          Title: `${i18n.__('events')} | esd-by.org`,
          isAuth: true,
        });
      }
    } else {
      const events = await Event.findAll({include: [Photo]});
      response.render('events.hbs', {
        Events: events.map(n => n.toJSON()),
        Title: `${i18n.__('events')} | esd-by.org`,
      });
    }
  };
  
  exports.getEvent = async function (request, response) {
    const id = request.params.id;
    if (request.user != null) {
      if (request.user.role == 2) {
        const events = await Event.findOne({
          where: {
            id: id,
          },
          include: [Photo]
        });
        response.render('event.hbs', {
          Events: events.toJSON(),
          Title: events.title + ' | esd-by.org',
          isAdmin: true,
        });
      } else {
        const events = await Event.findOne({
          where: {
            id: id,
          },
          include: [Photo]
        });
        response.render('event.hbs', {
          Events: events.toJSON(),
          Title: events.title + ' | esd-by.org',
          isAuth: true
        });
      }
    } else {
      const events = await Event.findOne({
        where: {
          id: id,
        },
        include: [Photo]
      });
      response.render('event.hbs', {
        Events: events.toJSON(),
        Title: events.title + ' | esd-by.org',
      });
    }
  };
  
  exports.addget = async function (request, response) {
    if (request.user != null) {
      if (request.user.role == 2) {
        response.render('addevent.hbs', {
          Title: `${i18n.__('addEvent')} | esd-by.org`,
        });
      } else {
        response.redirect(i18nUtil.urlWithLocale('events'));
      }
    } else {
      response.redirect(i18nUtil.urlWithLocale('events'));
    }
  };
  
  exports.addpost = async function (request, response) {
    const title = request.body.title;
    const messageShort = request.body.messageShort == '' ? null : request.body.messageShort;
    const message = request.body.message;
  
    await Event.create({
      title: title,
      publishDate: new Date(),
      message: message,
      messageShort: messageShort,
    });
    response.redirect(i18nUtil.urlWithLocale('events'));
  };
  
  exports.delete = async function (request, response) {
    const id = request.params.id;
  
    await Event.destroy({
      where: {
        id: id,
      }
    });
    response.redirect(i18nUtil.urlWithLocale('events'));
  };
  