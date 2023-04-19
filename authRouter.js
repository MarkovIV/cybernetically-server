const Router = require('express')
const controller = require('./authController')
const authMiddleware = require('./middleware/authMiddleware')

const router = new Router()

router.post('/login', controller.login)
router.get('/counter', authMiddleware, controller.getCounter)

module.exports = router