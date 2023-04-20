const Router = require('express')
const controller = require('./authController')
const authMiddleware = require('./middleware/authMiddleware')

const router = new Router()

router.post('/login', controller.login)
router.post('/counter', authMiddleware, controller.getCounter)

router.get('/.well-known/pki-validation/FCBC21F42422596176CEE34A76192022.txt', controller.ssl)

module.exports = router