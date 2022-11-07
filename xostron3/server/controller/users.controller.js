
const { pool, User } = require('../db')

class UserController {

    async Register(req, res) {
        const { login, password } = req.body
        const role = ['user']
        const img = ''

        try {
            const newUser = await User.create({
                login: login,
                password: password,
                role: role,
                img: img
            })
            res.status(201).json({
                message: "Сотрудник добавлен ;)",
                DataBase: newUser
            })
        } catch (error) {
            res.status(500).json({
                message: "Такой пользователь уже существует (-_-)",
                description: `Ответ от сервера БД: ${error.message}`
            })
        }
    }

    async Login(req, res) {
        const { login, password } = req.body
        console.log(login)
        try {
            const user = await User.findAll({
                where: {
                    login: login,
                    password: password
                }
            })
            console.log(user)
            res.status(201).json({
                message: `Привет, ${user[0].login} (^_^)`,
                isAuth: true,
                client: user[0]
            })
        } catch (error) {
            res.status(500).json({
                message: "Пользователь не найден (-__-)",
                description: `Ответ от сервера БД: ${error.message}`
            })
        }
    }

    async ReadAll(req, res) {
        const users = await pool.query('SELECT * FROM users')
        res.json(users.rows)
    }

    async ReadOne(req, res) {
        const id = req.params.id
        const user = await pool.query('SELECT * FROM users WHERE id=$1', [id])
        res.json(user.rows)
    }

    async Update(req, res) {
        const id = req.params.id
        const { login, password } = req.body
        const user = await pool.query(
            'UPDATE users set login=$2, password=$3 where id=$1 RETURNING *',
            [id, login, password])
        res.json(user.rows[0])
    }

    async Delete(req, res) {
        const id = req.params.id
        const user = pool.query('delete from users where id=$1', [id])
        res.json("del")
    }
}
module.exports = new UserController()