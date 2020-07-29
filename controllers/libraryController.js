const i18n = require('i18n');
const {
  Category,
  CategoryDoc,
  Subcategory,
  SubcategoryDoc,
  sequelize
} = require('../models/model.js');
const {
  asyncForEach
} = require('../util/controllerUtil');
const i18nUtil = require('../i18n/i18nUtil');
const {
  translate
} = require('../util/tranlateUtil');
const translateLibrary = async library => {
  return await translate(library, ['title']);
};

exports.index = async function (request, response) {
  const library = await Category.findAll({
    include: [Subcategory]
  });

  await asyncForEach(library, async library => {
    await translateLibrary(library);
  });

  if (request.user != null) {
    if (request.user.role === 2) {
      response.render('library.hbs', {
        Library: library.map(n => n.toJSON()),
        Title: `${i18n.__('library')} | esd-by.org`,
        isAdmin: true,
      });
    } else {
      response.render('library.hbs', {
        Library: library.map(n => n.toJSON()),
        Title: `${i18n.__('library')} | esd-by.org`,
        isAuth: true,
      });
    }
  } else {
    response.render('library.hbs', {
      Library: library.map(n => n.toJSON()),
      Title: `${i18n.__('library')} | esd-by.org`,
    });
  }
};

exports.addCategory = async function (request, response) {
  const title = request.body.title;
  if (request.user != null) {
    if (request.user.role == 2) {
      Category.create({
        title: title
      })
    }
  }
  response.redirect(i18nUtil.urlWithLocale('library'))
};

exports.addSubcategory = async function (request, response) {
  const id = request.params.id;
  const title = request.body.title;
  if (title && id) {
    if (request.user != null) {
      if (request.user.role == 2) {
        Subcategory.create({
          title: title,
          CategoryId: id
        })
      }
    }
  }
  response.redirect(i18nUtil.urlWithLocale('library'));
};

exports.addCategoryDoc = async function (request, response) {

  response.redirect(i18nUtil.urlWithLocale('library'));
};

exports.addSubcategoryDoc = async function (request, response) {

  response.redirect(i18nUtil.urlWithLocale('library'));
};