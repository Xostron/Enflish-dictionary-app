const { Router } = require('express')
const engdictController = require('../controller/engdict.controller')

const router = new Router()

router.post('/create', engdictController.Create)
router.get('/read', engdictController.ReadAll)
router.get('/read/:id', engdictController.ReadOne)
router.put('/update', engdictController.Update)
router.delete('/delete', engdictController.Delete)


module.exports = router