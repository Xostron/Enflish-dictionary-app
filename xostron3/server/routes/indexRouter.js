const Router = require('express')

const router = new Router()

const userRouter = require('./user.routes')
const dictengRouter = require('./dicteng.routes')
const user_wordRouter = require('./user_word.routes')
const cardRouter = require('./card.routes')
const chatRouter = require('./chat.routes')
const excelRouter = require('./excel.routes')
const sessionRouter = require('./session.routes')

router.use('/user', userRouter)
router.use('/dicteng', dictengRouter)
router.use('/card', cardRouter)
router.use('/user_word', user_wordRouter)
router.use('/chat', chatRouter)
router.use('/session', sessionRouter)
router.use('/excelExport', excelRouter)


module.exports = router