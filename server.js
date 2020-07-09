const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRouter.js");
const homeRouter = require("./routes/homeRouter.js");


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
        }
    },
    defaultLayout: "main",
    extname: "hbs"
}))

hbs.registerPartials(__dirname + "/views/partials");

app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/users", userRouter);
app.use("/", homeRouter);

app.use(function (req, res, next) {
    res.status(404).send("Not Found");
});

app.listen(3000);
