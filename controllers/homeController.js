exports.index = function (request, response) {
    response.render('about.hbs', {russian:true});
};
exports.about = function (request, response) {
    const lang = request.params.lang;
    response.send(lang);
};
