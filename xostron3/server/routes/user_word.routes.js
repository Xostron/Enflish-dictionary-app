const { Router } = require('express')
const user_wordController = require('../controller/user_word.controller')

// /api/user_word/create

const router = new Router()

router.post('/create', user_wordController.Create)
router.get('/read', user_wordController.ReadAll)
router.get('/read/:id', user_wordController.ReadOne)
router.put('/update', user_wordController.Update)
router.delete('/delete', user_wordController.Delete)

module.exports = router