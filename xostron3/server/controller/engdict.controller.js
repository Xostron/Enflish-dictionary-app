
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

//фильтр parent ль exist
function filterWords(exist, parent) {
    // фильтруем импортированные слова от существующих
    const arr = exist.map((val) => val.word)
    const filterWords = parent.filter((value, index) => {
        return (!arr.includes(value.word) && value.word != '')
    })

    return filterWords
}

//отсев от повторов
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

//драйвер pg - сохранить слова/слово 
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

//драйвер pg - получить слова/слово 
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


class EngdictController {

    //сохранение одного или нескольких строк в DictEng
    async Create(req, res) {
        const arr = req.body // данные от формы фронтенда
        console.log('asd = ', arr)
        try {
            //преобразуем объект объектов в массив объектов
            const allWords = Object.values(arr)
            //преобразование массива объектов с одним полем word (для запроса в БД)
            const searchOrder = allWords.map((value) => {
                return value.word
            })
            // console.log('search test', searchOrder)

            //*фильтруем слова от дубликатов
            //запрос в БД
            const existWords = await DictEng.findAll({
                attributes: ['word']
                ,
                where: {
                    word: { [Op.or]: [...searchOrder] }
                }
            })
            //filterWords убирает из allWords существующие в БД слова existWords
            //filterRepeat убирает из получившегося массива повторяющиеся слова
            const filteredWords = filterRepeat(filterWords(existWords, allWords))
            console.log('afterFilter = ', filteredWords)

            //сохраняем слова/слово
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
    //Прочитать все строки
    async ReadAll(req, res) {
        try {
            const words = await DictEng.findAll({ order: [['createdAt', 'DESC']] })
            res.status(201).json({
                message: words
            })
        } catch (error) {
            res.status(400).json({
                message: error
            })
        }
    }
    //Прочитать строку по id
    async ReadOne(req, res) {
        const id = req.params.id
        try {
            const word = await DictEng.findAll({
                where: {
                    id: id
                }
            })
            res.status(201).json({
                message: word
            })
        } catch (error) {
            res.status(400).json({
                message: error
            })
        }
    }
    //Обновить одну или все строки
    async Update(req, res) {
        const arr = req.body
        console.log('testNode = ', arr)
        try {
            const allWords = Object.values(arr)
            console.log(allWords)
            const updWords = []
            allWords.forEach(async (value) => {
                const word = await DictEng.update({
                    word: value.word,
                    transcription: value.transcription,
                    translate: value.translate,
                    example: value.example
                },
                    {
                        where: {
                            id: value.id
                        }
                    })
                updWords.push(word)
            })
            res.status(201).json({
                message: updWords
            })
        } catch (error) {
            res.status(400).json({
                message: error
            })
        }
    }
    //удалить один или несколько строк
    async Delete(req, res) {

        const val = req.body

        // res.status(201).json({
        //     message: 'delete'
        // })
        try {
            const allWords = Object.values(val)
            console.log('allWords = ', Object.values(val))
            allWords.forEach(async (value) => {
                const words = await DictEng.destroy({
                    where: {
                        word: value.word
                    }
                })
                console.log("===", value)
            })
            res.status(201).json({
                message: 'delete'
            })
        } catch (error) {
            res.status(400).json({
                message: error
            })
        }
    }
    // async Delete(req, res) {
    //     const id = req.params.id
    //     console.log('id = ', id)

    //     try {
    //          const words = await DictEng.destroy({
    //                 where: {
    //                     word: id
    //                 }
    //             })
    //         res.status(201).json({
    //             message: 'delete'
    //         })
    //     } catch (error) {
    //         res.status(400).json({
    //             message: error
    //         })
    //     }
    // }
}

module.exports = new EngdictController()


