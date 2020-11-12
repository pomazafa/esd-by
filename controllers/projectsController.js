const {
  Project,
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
  const projects = await Project.findAll({ order: [['publishDate', 'DESC']]});

  await asyncForEach(projects, async projects => {
    await translateProjects(projects);
  });

  if (request.user != null) {
    if (request.user.role === 2) {
      response.render('projects.hbs', {
        Projects: projects.map(n => n.toJSON()),
        Title: `${i18n.__('projects')} | esd-by.org`,
        isAdmin: true,
      });
    } else {
      response.render('projects.hbs', {
        Projects: projects.map(n => n.toJSON()),
        Title: `${i18n.__('projects')} | esd-by.org`,
        isAuth: true,
      });
    }
  } else {
    response.render('projects.hbs', {
      Projects: projects.map(n => n.toJSON()),
      Title: `${i18n.__('projects')} | esd-by.org`,
    });
  }
};

exports.getProject = async function (request, response) {
  const id = request.params.id;
  const projects = await Project.findOne({
    where: {
      id: id,
    },
  });

  await translateProjects(projects);

  if (request.user != null) {
    if (request.user.role == 2) {
      response.render('project.hbs', {
        Projects: projects.toJSON(),
        Title: projects.title + ' | esd-by.org',
        isAdmin: true,
      });
    } else {
      response.render('project.hbs', {
        Projects: projects.toJSON(),
        Title: projects.title + ' | esd-by.org',
        isAuth: true,
      });
    }
  } else {
    response.render('project.hbs', {
      Projects: projects.toJSON(),
      Title: projects.title + ' | esd-by.org',
    });
  }
};

const translateProjects = async projects => {
  return await translate(projects, ['title', 'messageShort', 'message']);
};

exports.addget = async function (request, response) {
  if (request.user != null) {
    if (request.user.role == 2) {
      response.render('addproject.hbs', {
        Title: `${i18n.__('addProject')} | esd-by.org`,
        form: form
      });
      form = null;
    } else {
      response.redirect(i18nUtil.urlWithLocale('projects'));
    }
  } else {
    response.redirect(i18nUtil.urlWithLocale('projects'));
  }
};

exports.addpost = async function (request, response) {
  const title = request.body.title;
  const messageShort = request.body.messageShort == '' ? null : request.body.messageShort;
  const photoDescription = request.body.photoDescription == '' ?
    null :
    request.body.photoDescription;
  const message = request.body.message;

  if (title === "") {
    form = {
      errmessage: i18n.__('emptyTitle'),
      title: title,
      messageShort: messageShort,
      photoDescription: photoDescription,
      message: message
    }
    response.redirect('/projects/add')
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
    response.redirect('/projects/add')
    return;
  }

  await Project.create({
    title: title,
    photoURL: request.file ? request.file.filename : null,
    photoDescription: photoDescription,
    publishDate: new Date(),
    message: message,
    messageShort: messageShort,
  });
  response.redirect(i18nUtil.urlWithLocale('projects'));
};

exports.delete = async function (request, response) {
  const id = request.params.id;

  const projects = await Project.findOne({
    where: {
      id: id,
    },
  });

  await Project.destroy({
    where: {
      id: id,
    },
  });

  const fileName = './public/images/uploads/' + projects.photoURL;

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

  response.redirect(i18nUtil.urlWithLocale('projects'));
};