const Router = require('express')
const controller = require('./authController')
const authMiddleware = require('./middleware/authMiddleware')

const router = new Router()

router.post('/login', controller.login)
router.post('/counter', authMiddleware, controller.getCounter)

router.get('/.well-known/pki-validation/B3AB1D32008BE473A865EF58D94235EA.txt', controller.ssl)

module.exports = router