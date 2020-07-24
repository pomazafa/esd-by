module.exports = function error401(request, response)
{
    response.render('message.hbs', {
            Title: "Ошибка авторизации",
            message: "Чтобы выполнить это действие, необходимо авторизоваться",
            buttonAction: "window.location.href = '/login/exit'",
            buttonValue: "Авторизоваться"
        });
}