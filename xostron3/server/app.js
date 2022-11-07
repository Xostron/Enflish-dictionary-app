const express = require('express')
const config = require('config')
const sequelize = require('./db').sequelize
const cors = require('cors')
const router = require('./routes/indexRouter')
const fileUpload = require('express-fileupload')
const path = require('path')

const PORT = config.get('port') || 5000

const app = express()

app.use(cors())
app.use(express.json("application/json"))
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

const startServer = async () => {
    try {
        //создает и приводит таблицу в соответсвии с моделью
        sequelize.sync()
        app.listen(PORT, () => console.log('Сервер (Node) запустился на порту ' + PORT))

    } catch (error) {
        console.log(error)
    }
}
startServer() 