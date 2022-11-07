const { Router } = require('express')
const router = new Router()
const excelController = require('../controller/excel.controller')

router.get('/export', excelController.exportExcel)

module.exports = router
