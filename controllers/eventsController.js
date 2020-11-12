const {
  Event,
  Photo,
  sequelize
} = require('../models/model.js');
const i18n = require('i18n');
const i18nUtil = require('../i18n/i18nUtil');
const fs = require('fs');
const { asyncForEach } = require('../util/controllerUtil');
const { translate } = require('../util/tranlateUtil');

let form = null;

exports.index = async function (request, response) {
  const events = await Event.findAll({ include: [Photo], order: [['publishDate', 'DESC']] });

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
        form: form
      });
      form = null;
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

  if (title === "") {
    form = {
      errmessage: i18n.__('emptyTitle'),
      title: title,
      messageShort: messageShort,
      message: message
    }
    response.redirect('/events/add')
    return;
  }
  if (message === "") {
    form = {
      errmessage: i18n.__('emptyMessage'),
      title: title,
      messageShort: messageShort,
      message: message
    }
    response.redirect('/events/add')
    return;
  }

  let transaction;
  try {
    transaction = await sequelize.transaction();
    const event = await Event.create({
      title: title,
      publishDate: new Date(),
      description: message,
      descriptionShort: messageShort,
    }, { transaction: transaction });

    for (let i = 0; i < request.files.length; i++) {
      await Photo.create({
        photoURL: request.files[i].filename,
        photoDescription: request.body[`photo-${i}`],
        EventId: event.id,
      }, { transaction: transaction });
    }

    await transaction.commit();
  } catch (err) {
    if (transaction) {
      await transaction.rollback();
      //todo handle
    }
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

  let transaction;
  try {
    transaction = await sequelize.transaction();

    await Photo.destroy({ where: { EventId: id } }, { transaction: transaction });
    await Event.destroy({
      where: {
        id: id,
      },
    }, { transaction: transaction });

    for (let i = 0; i < photos.length; i++) {
      const fileName = './public/images/uploads/' + photos[i].photoURL;
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
    }

    await transaction.commit();
  } catch (err) {
    if (transaction) {
      await transaction.rollback();
      //todo handle
    }
  }

  response.redirect(i18nUtil.urlWithLocale('events'));
};
