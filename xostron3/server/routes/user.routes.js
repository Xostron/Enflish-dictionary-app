const { Router } = require('express')
const userController = require('../controller/users.controller')

const router = new Router()

router.post('/register', userController.Register)
router.post('/login', userController.Login)
router.get('/auth', userController.Check)
router.get('/read', userController.ReadAll)
router.get('/read/:id', userController.ReadOne)
router.put('/update/:id', userController.Update)
router.delete('/delete/:id', userController.Delete)

module.exports = router

