const { pool, User_word, User_word_stc } = require('../db')

class User_wordController {

    async Create(req, res) {
        const { repeat_count, correct_count, ratio, create_date, last_repeat_date, user_id, word_id, user_name } = req.body
        try {
            const link = await db.query(`INSERT INTO user_word (repeat_count, correct_count, ratio, create_date, last_repeat_date, user_id, word_id) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [repeat_count, correct_count, ratio, create_date, last_repeat_date, user_id, word_id])
            res.status(201).json({
                message: `Слово сохранено`,
                link: link
            })
        } catch (error) {
            res.status(500).json({
                message: `Ошибка БД: ${error.message}`
            })
        }


    }

    async ReadAll(req, res) {
        const link = await db.query('SELECT * FROM user_word')
        res.json(link.rows)
    }

    async ReadOne(req, res) {
        const id = req.params.id
        const link = await db.query('SELECT * FROM user_word WHERE id=$1', [id])
        res.json(link.rows)
    }

    async Update(req, res) {
        const id = req.params.id
        const { repeat_count, correct_count, ratio, create_date, last_repeat_date } = req.body
        const link = await db.query(
            'UPDATE user_word set repeat_count=$1, correct_count=$2, ratio=$3, create_date=$4, last_repeat_date=$5 where id=$6 RETURNING *',
            [repeat_count, correct_count, ratio, create_date, last_repeat_date, id])
        res.json(link.rows[0])
    }

    async Delete(req, res) {
        const id = req.params.id
        const link = db.query('delete from user_word where id=$1', [id])
        res.json("del")
    }
}
module.exports = new User_wordController()