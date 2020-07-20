exports.index = function (request, response) {
    response.render('about.hbs', {Title:"Об Ассоциации | esd-by.org"});
};
exports.about = function (request, response) {
    const lang = request.params.lang;
    response.send(lang);
};
