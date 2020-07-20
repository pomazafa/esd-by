exports.index = function (request, response) {
    const lang = request.params.lang;
    response.send(lang);
};
