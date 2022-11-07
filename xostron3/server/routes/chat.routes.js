const { Router } = require('express')
const chatController = require('../controller/chat.controller')

const router = new Router()

router.post('/create', chatController.Create)
router.get('/read', chatController.ReadAll)
router.get('/read/:id', chatController.ReadOne)
router.put('/update', chatController.Update)
router.delete('/delete', chatController.Delete)


module.exports = router