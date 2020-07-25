const i18n = require('i18n');

exports.index = function (request, response) {
  response.render('about.hbs', { Title: `${i18n.__('aboutAssociation')} | esd-by.org` });
};
