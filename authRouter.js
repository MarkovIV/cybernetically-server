const Router = require('express')
const controller = require('./authController')
const authMiddleware = require('./middleware/authMiddleware')

const router = new Router()

router.post('/login', controller.login)
router.post('/counter', authMiddleware, controller.getCounter)

router.get('/.well-known/pki-validation/BE5CD2245533A508C0CE5EC4B4183D3F.txt', controller.ssl)

module.exports = router