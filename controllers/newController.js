const { New } = require('../models/model.js');
exports.index = async function (request, response) {
    const lang = request.params.lang;
    if(lang.toLowerCase() == "en")
    {
        response.send('english version would be later.........')
    }
    else
    {
        const news = await New.findAll();
        response.render("news.hbs", {News: news.map(n => n.toJSON()), Title: "Новости | esd-by.org"})
    }
};
