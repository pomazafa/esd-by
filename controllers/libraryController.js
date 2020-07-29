const i18n = require('i18n');
const {
    Category,
    CategoryDoc,
    Subcategory,
    SubcategoryDoc,
    sequelize
  } = require('../models/model.js');
const { asyncForEach } = require('../util/controllerUtil');

exports.index = async function (request, response) {
    const library = await Category.findAll();

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
  if (request.user != null) {
    if (request.user.role == 2) {
      response.render('addcategory.hbs', {
        Title: `${i18n.__('addCategory')} | esd-by.org`,
        form: form
      });
      form = null;
    } else {
      response.redirect(i18nUtil.urlWithLocale('library'));
    }
  } else {
    response.redirect(i18nUtil.urlWithLocale('library'));
  }
};

exports.addSubcategory = async function (request, response) {
  const id = request.params.id;
  if (request.user != null) {
    if (request.user.role == 2) {
      response.render('addSubcategory.hbs', {
        Title: `${i18n.__('addSubcategory')} | esd-by.org`,
        form: form
      });
      form = null;
    } else {
      response.redirect(i18nUtil.urlWithLocale('library'));
    }
  } else {
    response.redirect(i18nUtil.urlWithLocale('library'));
  }
};