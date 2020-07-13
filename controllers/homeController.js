exports.index = function (request, response) {
    response.render('about.hbs', {russian:true});
};
exports.about = function (request, response) {
    response.send("О сайте");
};
