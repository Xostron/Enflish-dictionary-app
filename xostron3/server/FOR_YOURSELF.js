function getRow() {
    a = [1, 2, 3]
    b = [4, 5, 6]
    c = {
        1: {
            name: 'askar',
            num: '1980'
        },
        j: {
            name: 'styuna',
            num: '410'
        },

    }
    d = Object.values(c)
    return { a, b, c, d }
}



//***************************ENGDICT pg driver************************************ */

const { pool, DictEng } = require('../db')
const { Op } = require('sequelize')
const CODE_ACCESS = {
    SUPER: 1,
    USUAL: 0,
    GUEST: null
}
const STATUS = {
    NO_READ: 0,
    READ: 1,
    DELETE_ONE: 2,
    DELETE_ALL: 3
}

function filterWords(exist, parent) {
    // фильтруем импортированные слова от существующих
    const arr = exist.map((val) => val.word)
    const filterWords = parent.filter((value, index) => {
        return (!arr.includes(value.word) && value.word != '')
    })

    return filterWords
}

function filterRepeat(arr) {
    const ori_word = arr.map(val => val.word)
    let resWord = []
    let resIdx = []
    ori_word.forEach((val, idx) => {
        if (!resWord.includes(val) && val != '') {
            resWord.push(val)
            resIdx.push(idx)
        }
    })
    let result = resIdx.map((val, idx) => {
        return arr[val]
    })
    return result
}

async function createRow(table, arr) {
    if (arr.length > 0) {
        let columnArr = Object.keys(arr[0])
        columnArr = columnArr.filter((val) => val != 'id')
        let column = '(' + columnArr.join(',') + ') '//(word, transcription, translate, comment)
        let arrQueryTemp = Object.values(arr).map((value, idx) => {
            return [value.word, value.transcription, value.translate, value.comment]
        })
        let arrQuery = [].concat(...arrQueryTemp)//сглаживание вложенных массивов
        const test2 = arrQueryTemp.map((val, idx) => {
            return ` (${val.map((val2, idx2) => { return `\$${(idx * val.length + 1) + (idx2)}` }).join(',')})`
        }).join(',')
        let values = 'values' + test2//values($1, $2, $3, $4)
        let query = `INSERT INTO ${table} `
        query = query + column + values

        const saveWords = await pool.query(query, arrQuery)
        return {
            message: 'Данные сохранены!'
            // result: saveWords
        }
    }
    return { message: 'Слова уже существуют в БД или отправлена пустая форма' }
}

async function readRow(table, column = '', arr = []) {
    // table - имя таблицы БД, 
    // column = '' - имя столбца таблицы БД (условие WHERE), 
    // arr = [] - значения, которые ищем (условие WHERE)
    let searchQuery = `SELECT * FROM ${table} `
    let phrase = ''
    let phrase2 = ''
    if (column !== '' && arr != []) {
        for (let i = 0; i < arr.length; i++) {
            if (i < arr.length - 1) {
                phrase = phrase + `${column}=\$${i + 1} OR `
            } else {
                phrase = phrase + `${column}=\$${i + 1}`
                phrase2 = 'WHERE ' + phrase
            }
        }
    }
    //SELECT * FROM engdict WHERE word=$1 OR word=$2 OR word=$3 OR word=$4
    searchQuery = searchQuery + phrase2
    console.log('READ = ', searchQuery)
    const findWord = await pool.query(searchQuery, arr);
    const rows = findWord.rows
    const length = findWord.rowCount
    return { rows, length }
}


function updateRow() {

}
function deleteRow() {

}

class EngdictController {

    async createWord(req, res) {
        const { word, transcription, translate, comment,
            login_id, login_code_access,
            repeat_count, correct_count, ratio, create_date, last_repeat_date } = req.body
        //Создание нового слова с проверкой (уникальность слова)
        try {
            //ищем слово в таблице engdict+
            const findWord = await pool.query('SELECT * FROM engdict WHERE word=$1', [word])
            if (findWord.rowCount) {//слово найдено в таблице engdict

                console.log('findWord.rows[0]', findWord.rows[0])

                //ищем ссылку на user_word
                const findUser_word = await pool.query('SELECT * FROM user_word WHERE word_id=$1 AND user_id=$2',
                    [findWord.rows[0].id, login_id])

                if (findUser_word.rowCount) {//ссылка найдена - изменяем ссылку (добавляем вариант перевода)
                    const newTranslate = [...findWord.rows[0].translate, ...translate]
                    console.log('newTranslate', newTranslate)
                    const link = await pool.query(
                        'UPDATE user_word set translate=$3 where word_id=$1 AND user_id=$2 RETURNING *',
                        [findWord.rows[0].id, login_id, newTranslate])
                    res.status(201).json({
                        message: `роль admin/usual; Слово найдено; ссылка найдена - update`,
                        link: link
                    })
                } else {//ссылка не найдена - создаем ссылку на слово
                    const newTranslate = [...findWord.rows[0].translate, ...translate]
                    console.log('newTranslate', newTranslate)
                    const link = await pool.query(`INSERT INTO user_word 
                        (repeat_count, correct_count, ratio, create_date, last_repeat_date, user_id, word_id, translate) 
                        values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
                        [repeat_count, correct_count, ratio, create_date, last_repeat_date, login_id, findWord.rows[0].id, newTranslate])
                    res.status(201).json({
                        message: `роль admin/usual; Слово найдено; ссылка не найдена - создание ссылки`,
                        link: link.rows[0]
                    })
                }

            } else {//слово не найдено в общем словаре engdict
                if (login_code_access == CODE.SUPER) {// код доступа - Админ
                    //ищем ссылку на user_word
                    const findUser_word = await pool.query('SELECT * FROM user_word WHERE word=$1 AND user_id=$2', [word, login_id])
                    if (findUser_word.rowCount) {
                        //ссылка найдена - добавляем в словарь и изменяем ссылку 
                        const dict = await pool.query(`INSERT INTO engdict 
                        (word, transcription, translate, comment) 
                        values ($1, $2, $3, $4) RETURNING *`,
                            [word,
                                transcription == '' ? findUser_Word.rows[0].transcription : transcription,
                                translate,
                                comment == '' ? findUser_Word.rows[0].comment : comment])

                        const newTranslate = [...findUser_Word.rows[0].translate, ...translate]
                        console.log('newTranslate', newTranslate)
                        const link = await pool.query(
                            'UPDATE user_word set translate=$3, word_id=$4 where word=$1 AND user_id=$2 RETURNING *',
                            [word, login_id, newTranslate, dict.rows[0].id])
                        res.status(201).json({
                            message: `роль admin; Слово не найдено; Слово добавлено; ссылка найдена - update`,
                            link: link
                        })
                    } else {//ссылка не найдена - добавляем в словарь и создаем ссылку на слово
                        const dict = await pool.query(`INSERT INTO engdict 
                        (word, transcription, translate, comment) 
                        values ($1, $2, $3, $4) RETURNING *`,
                            [word, transcription, translate, comment])

                        const link = await pool.query(`INSERT INTO user_word 
                        (repeat_count, correct_count, ratio, create_date, last_repeat_date, user_id, word_id) 
                        values ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
                            [repeat_count, correct_count, ratio, create_date, last_repeat_date, login_id, dict.rows[0].id])
                        res.status(201).json({
                            message: `роль admin; Слово не найдено - создание; ссылка не найдена - создание`,
                            link: link
                        })
                    }
                } else {// код доступа - обычный пользователь
                    //ищем ссылку на user_word
                    const findUser_word = await pool.query('SELECT * FROM user_word WHERE word=$1 AND user_id=$2', [word, login_id])

                    if (findUser_word.rowCount) {
                        //ссылка найдена - изменяем ссылку (usual user не может добавлять слова в общий).
                        const newTranslate = [...findUser_word.rows[0].translate, ...translate]
                        console.log('newTranslate', newTranslate)
                        const link = await pool.query(
                            'UPDATE user_word set translate=$3, transcription=$4, comment=$5 where word=$1 AND user_id=$2 RETURNING *',
                            [word,
                                login_id,
                                newTranslate,
                                transcription != null ? transcription : findUser_word.rows[0].transcription,
                                comment != null ? comment : findUser_word.rows[0].comment])
                        res.status(201).json({
                            message: `роль usual; Слово не найдено; ссылка найдена - обновление ссылки`,
                            link: link
                        })
                    } else {//ссылка не найдена - создаем ссылку на слово

                        const link = await pool.query(`INSERT INTO user_word 
                        (repeat_count, correct_count, ratio, create_date, last_repeat_date, user_id, word, transcription, translate, comment) 
                        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
                            [repeat_count, correct_count, ratio, create_date, last_repeat_date, login_id, word, transcription, translate, comment])
                        res.status(201).json({
                            message: `роль usual; Слово не найдено; ссылка не найдена - создание ссылки`,
                            link: link
                        })
                    }
                }
            }
        } catch (error) {
            res.status(500).json({
                message: `Ошибка БД: ${error.message}`
            })
        }
    }

    async getWords(req, res) {
        const dict = await pool.query('SELECT * FROM engdict')
        res.json(dict.rows)
    }

    async getOneWord(req, res) {
        const id = req.params.id
        const dict = await pool.query('SELECT * FROM engdict WHERE id=$1', [id])
        res.json(dict.rows)
    }

    async updateWord(req, res) {
        const id = req.params.id
        const { word, transcription, translate, comment } = req.body
        const dict = await pool.query(
            'UPDATE engdict set word=$1, transcription=$2, translate=$3, comment=$4 where id=$5 RETURNING *',
            [word, transcription, translate, comment, id])
        res.json(dict.rows[0])
    }

    async deleteWord(req, res) {
        const id = req.params.id
        const dict = pool.query('delete from engdict where id=$1', [id])
        res.json("delete")
    }

    async save(req, res) {
        //извлекаем данные из тела запроса (от фронтенда)
        //dict - объект объектов (слова)
        //login_id, ..., last_repeat_date = объект link (идентификатор пользователя)
        const { arr,
            login_id, login_code_access,
            repeat_count, correct_count, ratio, create_date, last_repeat_date } = req.body
        try {
            //преобразуем объект объектов в массив объектов
            const allWords = Object.values(arr)

            const nameAllWords = allWords.map((value) => {
                return value.word
            })
            //Поиск существующих слов в БД { rows, length }
            const existWords = await readRow('engdict', 'word', nameAllWords)

            if (login_code_access === CODE.SUPER) {// код доступа - Admin
                // // фильтруем импортированные слова от существующих и повторяющихся слов из пост запроса
                // const afterFilter = filterRepeat(filterWords(existWords.rows, allWords))
                // //Сохранение слов в БД
                // const saveWords = await createRow('engdict', afterFilter)
                // res.status(201).json({
                //     message: `${saveWords.message}, Cемпай ^-^`
                //     // pool: saveWords.result
                // })
                res.status(201).json({
                    message: 'admin'
                })
            } else if (login_code_access === CODE.USUAL) {// код доступа - Client
                // //1.Найти существующие слова в таблице link по полю word
                // const existWordsLink = await readRow('link', 'word', nameAllWords)
                // //Найти id_word в link (это слова, ссылающиеся на engdict)
                // const existIdLink = await readRow('link')
                // let arrArrId = Object.values(existIdLink.rows).map((value, idx) => {
                //     return [value.id_word]
                // })
                // let arrId = [].concat(...arrArrId)//сглаживание вложенных массивов
                // //link.id_word поиск в engdict
                // const existWords = await readRow('engdict', 'id', arrId)
                // //фильтрация
                // const afterFilter = filterRepeat(filterWords(existWords.rows, allWords))
                // //сохранение в link
                // const saveWords = await createRow('engdict', afterFilter)
                // res.status(201).json({
                //     message: `${saveWords.message}, Кохай ^-^`
                //     // pool: saveWords.result
                // })
                res.status(201).json({
                    message: 'Guest'
                })
            } else {// код доступа - Guest
                res.status(201).json({
                    message: 'Для продолжения операции, пожалуйста, авторизуйтесь:)'
                })
            }

            // console.log('=======СУЩЕСТВУЮЩИЕ БД========', existWords.rows)
            // console.log('=======ИМПОРТИРОВАННЫЕ Excel========', importWords)
            // console.log('=======ПОСЛЕ ФИЛЬТРА========', afterFilter)

            //Сохранение слов в БД

        } catch (error) {
            res.status(201).json({
                message: error
            })
        }


    }
    //сохранение одного или нескольких слов в DictEng
    async testCreate(req, res) {
        const { arr,
            login_id, login_code_access,
            repeat_count, correct_count,
            ratio, create_date, last_repeat_date } = req.body
        try {
            //преобразуем объект объектов в массив объектов
            const allWords = Object.values(arr)
            //Массив объектов - преобразовать в массив объектов с одним полем word
            const searchOrder = allWords.map((value) => {
                return value.word
            })
            // console.log('search test', searchOrder)
            const existWords = await DictEng.findAll({
                attributes: ['word']
                ,
                where: {
                    word: { [Op.or]: [...searchOrder] }
                }
            })
            const filteredWords = filterRepeat(filterWords(existWords, allWords))
            console.log('afterFilter = ', filteredWords)
            const words = await DictEng.bulkCreate(filteredWords)
            res.status(201).json({
                exist: existWords,
                save: words
            })
        } catch (error) {
            res.status(400).json({
                message: error
            })
        }



    }
}
module.exports = new EngdictController()

//***************************ENGDICT pg driver************************************ */