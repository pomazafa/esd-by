const i18n = require('i18n');

module.exports = {
  configure: (app, i18n, config) => {
    app.locals.i18n = config;
    i18n.configure(config);
  },
  init: (req, res, next) => {
    const rxLocale = /^\/(\w\w)/i;
    if (rxLocale.test(req.url)) {
      const locale = rxLocale.exec(req.url)[1];
      if (req.app.locals.i18n.locales.indexOf(locale) >= 0)
        i18n.setLocale(locale);
    }
    next();
  },
  url: (app, url) => {
    const locales = app.locals.i18n.locales;
    const urls = [];
    for (var i = 0; i < locales.length; i++)
      urls[i] = '/' + locales[i] + url;
    urls[i] = url;
    return urls;
  },
  urlWithLocale: (url) => {
    return `/${i18n.getLocale()}/${url}`;
  },
};
