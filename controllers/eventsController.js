const {
  Event,
  Photo,
} = require('../models/model.js');
const i18n = require('i18n');
const i18nUtil = require('../i18n/i18nUtil');
const fs = require('fs');
const { asyncForEach } = require('../util/controllerUtil');
const { translate } = require('../util/tranlateUtil');

exports.index = async function (request, response) {
  const events = await Event.findAll({ include: [Photo] });

  await asyncForEach(events, async event => {
    await translateEvent(event);
  });

  if (request.user != null) {
    if (request.user.role === 2) {
      response.render('events.hbs', {
        Events: events.map(n => n.toJSON()),
        Title: `${i18n.__('events')} | esd-by.org`,
        isAdmin: true,
      });
    } else {
      response.render('events.hbs', {
        Events: events.map(n => n.toJSON()),
        Title: `${i18n.__('events')} | esd-by.org`,
        isAuth: true,
      });
    }
  } else {
    response.render('events.hbs', {
      Events: events.map(n => n.toJSON()),
      Title: `${i18n.__('events')} | esd-by.org`,
    });
  }
};

exports.getEvent = async function (request, response) {
  const id = request.params.id;
  const event = await Event.findOne({
    where: {
      id: id,
    },
    include: [Photo],
  });

  await translateEvent(event);

  if (request.user != null) {
    if (request.user.role == 2) {
      response.render('event.hbs', {
        Events: event.toJSON(),
        Title: event.title + ' | esd-by.org',
        isAdmin: true,
      });
    } else {
      response.render('event.hbs', {
        Events: event.toJSON(),
        Title: event.title + ' | esd-by.org',
        isAuth: true,
      });
    }
  } else {
    response.render('event.hbs', {
      Events: event.toJSON(),
      Title: event.title + ' | esd-by.org',
    });
  }
};

const translateEvent = async event => {
  return await translate(event, ['title', 'descriptionShort', 'description']);
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

  const event = await Event.create({
    title: title,
    publishDate: new Date(),
    description: message,
    descriptionShort: messageShort,
  });

  for (let i = 0; i < request.files.length; i++) {
    await Photo.create({
      photoURL: request.files[i].filename,
      photoDescription: request.body[`photo-${i}`],
      EventId: event.id
    });
  }

  response.redirect(i18nUtil.urlWithLocale('events'));
};

exports.delete = async function (request, response) {
  const id = request.params.id;

  const photos = await Photo.findAll({
    where: {
      EventId: id,
    },
  });

  for (let i = 0; i < photos.length; i++) {
    await photos[i].destroy();
    const fileName = './public/images/uploads/' + photos[i].photoURL;
    fs.access(fileName, fs.F_OK, (err) => {
      if (err) {
        console.error(err);
        return
      }
      fs.unlink(fileName,function(err){
        if(err) return console.log(err);
        console.log('file deleted successfully');
      });
    });
  }

  await Event.destroy({
    where: {
      id: id,
    },
  });
  response.redirect(i18nUtil.urlWithLocale('events'));
};
