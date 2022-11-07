const { Router } = require('express')
const cardController = require('../controller/card.controller')

const router = new Router()

router.post('/create', cardController.Create)
router.get('/read', cardController.ReadAll)
router.get('/read/:id', cardController.ReadOne)
router.put('/update', cardController.Update)
router.delete('/delete', cardController.Delete)
router.post('/upload', cardController.FileUpl)

module.exports = router