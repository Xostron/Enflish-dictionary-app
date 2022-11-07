const { pool, Card, BasketCard } = require('../db')
const { Op } = require('sequelize')
const path = require('path')
const uuid = require('uuid')

class CardController {
    async Create(req, res) {

        try {
            const arr = req.body
            const img = req.files.image
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            console.log('files.file = ', req.files.image)
            console.log('files.file = ', req.body)
            return res.json({
                fileName: fileName
            })
        } catch (error) {
            res.status(400).json({
                message: error
            })
        }
    }

    async ReadAll(req, res) {
        try {
            const cards = await Card.findAll({ order: [['createdAt', 'DESC']] })
            res.status(201).json({
                message: cards
            })
        } catch (error) {
            res.status(400).json({
                message: error
            })
        }
    }

    async ReadOne(req, res) {

    }

    async Update(req, res) {

    }

    async Delete(req, res) {

    }
    async FileUpl(req, res) {
        const file = req.files.image
        console.log('files = ', req.files)
        console.log('files.file = ', req.files.image)
        let fileName = uuid.v4() + ".jpg"

        console.log('fileName = ', fileName)

        const pathUpload = path.resolve(__dirname, '..', 'static', fileName)
        console.log('mypath = ', pathUpload)

        file.mv(path.resolve(__dirname, '..', 'static', fileName))
        return res.json({
            fileName: fileName,
            filePath: pathUpload
        })
        // file.mv(pathUpload, err => {
        //     if (err) {
        //         console.log(err)
        //         return res.status(500).send(err)
        //     }
        //     console.log('file was uploaded')

        //     res.json({
        //         fileName: file.name,
        //         filePath: pathUpload
        //     })
        // })
    }

}

module.exports = new CardController()