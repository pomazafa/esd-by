const express = require("express");
const i18n = require('i18n');
const app = express();
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRouter.js");
const homeRouter = require("./routes/homeRouter.js");
const newsRouter = require("./routes/newsRouter.js");
const eventsRouter = require("./routes/eventsRouter.js");
const expressHbs = require("express-handlebars");
const verifyToken = require('./util/authenticate');
const i18nUtil = require('./i18n/i18nUtil');
const hbs = require("hbs");
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.engine("hbs", expressHbs({
    layoutsDir: "views/layouts",
    helpers: {
        when: function (operand_1, operand_2, options) {
            result = operand_1 == operand_2;
            if (result) return options.fn(this);
            return options.inverse(this);
        },
        formatTime: function (myDate) {
            var minute = myDate.getMinutes();
            var month = myDate.getMonth() + 1;
            if (minute < 10) {
                minute = "0" + minute;
            }
            if (month < 10) {
                month = "0" + month;
            }
            return  myDate.getDate() + '.' + month + '.' + myDate.getFullYear()+ " " + myDate.getHours() + ":" + minute;
        },
      switchLocaleUri: (newLocale, uri) => {
        const rxLocale = /^\/(\w\w)\//i;
        if (rxLocale.test(uri)) {
          return `/${newLocale}/${uri.replace(rxLocale.exec(uri)[0], '')}`;
        }
        return `/${newLocale}${uri}`;
      },
      uriWithLocale: (uri, id) => {
        return Number.isFinite(id) ? `${i18nUtil.urlWithLocale(uri)}/${id}` : i18nUtil.urlWithLocale(uri);
      },
      i18n: key => {
        return i18n.__(key);
      },
      __: key => {
        return i18n.__(key);
      },
      __n: key => {
        i18n.__n(key);
      },
    },
    defaultLayout: "main",
    extname: "hbs"
}));

hbs.registerPartials(__dirname + "/views/partials");

app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: false }));

i18nUtil.configure(app, i18n, {
  locales: ['ru', 'en'],
  defaultLocale: 'ru',
  register: global,
  directory: __dirname + "/i18n/locales"
});
app.use(i18nUtil.init);

app.use((req, res, next) => {
  res.locals.req = req;
  next();
});

app.use(verifyToken);

app.use(i18nUtil.url(app, '/news'), newsRouter);
app.use(i18nUtil.url(app, '/events'), eventsRouter);
app.use(i18nUtil.url(app, '/'), userRouter);
app.use(i18nUtil.url(app, '/'), homeRouter);

app.use(function (req, res, next) {
    res.status(404).send("Not Found");
});

app.listen(3000);
