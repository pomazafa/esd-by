const {
    Program,
  } = require('../models/model.js');
  const i18n = require('i18n');
  const i18nUtil = require('../i18n/i18nUtil');
  const fs = require('fs');
  const {
    asyncForEach
  } = require('../util/controllerUtil');
  const {
    translate
  } = require('../util/tranlateUtil');
  
  let form = null;
  
  exports.index = async function (request, response) {
    const programs = await Program.findAll();
  
    await asyncForEach(programs, async programs => {
      await translatePrograms(programs);
    });
  
    if (request.user != null) {
      if (request.user.role === 2) {
        response.render('programs.hbs', {
          Programs: programs.map(n => n.toJSON()),
          Title: `${i18n.__('programs')} | esd-by.org`,
          isAdmin: true,
        });
      } else {
        response.render('programs.hbs', {
          Programs: programs.map(n => n.toJSON()),
          Title: `${i18n.__('programs')} | esd-by.org`,
          isAuth: true,
        });
      }
    } else {
      response.render('programs.hbs', {
        Programs: programs.map(n => n.toJSON()),
        Title: `${i18n.__('programs')} | esd-by.org`,
      });
    }
  };
  
  exports.getProgram = async function (request, response) {
    const id = request.params.id;
    const programs = await Program.findOne({
      where: {
        id: id,
      },
    });
  
    await translatePrograms(programs);
  
    if (request.user != null) {
      if (request.user.role == 2) {
        response.render('program.hbs', {
          Programs: programs.toJSON(),
          Title: programs.title + ' | esd-by.org',
          isAdmin: true,
        });
      } else {
        response.render('program.hbs', {
          Programs: programs.toJSON(),
          Title: programs.title + ' | esd-by.org',
          isAuth: true,
        });
      }
    } else {
      response.render('program.hbs', {
        Programs: programs.toJSON(),
        Title: programs.title + ' | esd-by.org',
      });
    }
  };
  
  const translatePrograms = async programs => {
    return await translate(programs, ['title', 'messageShort', 'message']);
  };
  
  exports.addget = async function (request, response) {
    if (request.user != null) {
      if (request.user.role == 2) {
        response.render('addprogram.hbs', {
          Title: `${i18n.__('addProgram')} | esd-by.org`,
          form: form
        });
        form = null;
      } else {
        response.redirect(i18nUtil.urlWithLocale('programs'));
      }
    } else {
      response.redirect(i18nUtil.urlWithLocale('programs'));
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
      response.redirect('/programs/add')
      return;
    }
    if (message === "") {
      form = {
        errmessage: i18n.__('emptyMessage'),
        title: title,
        messageShort: messageShort,
        message: message
      }
      response.redirect('/programs/add')
      return;
    }
  
    await Program.create({
      title: title,
      publishDate: new Date(),
      message: message,
      messageShort: messageShort,
    });
    response.redirect(i18nUtil.urlWithLocale('programs'));
  };
  
  exports.delete = async function (request, response) {
    const id = request.params.id;
  
    await Program.destroy({
      where: {
        id: id,
      },
    });
  
    response.redirect(i18nUtil.urlWithLocale('programs'));
  };