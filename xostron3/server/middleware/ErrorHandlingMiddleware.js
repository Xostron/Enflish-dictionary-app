const ApiError = require('../error/ApiError')

// next - функция, вызвав которую передает управление следующему middleware
// здесь next не вызываем т.к. это замыкающий middleware? должен строго находиться
// последним среди middlewares
/*концепция middleware:
на сервере каждому запросу по определенному маршруту соответсвует endpoint - 
функция, которая обрабатывает/изменяет данные запроса, middleware - 
это промежуточная функция, которая выполняется между запросом и 
endpointом(функция, которая оюраюатывает этот запрос), 
например проверка запроса на соответсвие cors(), проверка аутентификации (jwt) 
для обработки запросов от тех или иных пользователей, проверка ролей и т.д.
*/
module.exports = function (err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message })
    }
    return res.status(500).json({ message: 'Неизвестная ошибка на сервере!' })
}