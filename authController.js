require('dotenv').config()
const {users} = require('./data/users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const generateAccessToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, process.env.SECRET, {expiresIn: "24h"})
}

class authController {
    async login(req, res) {
        try {
            const {username, password} = req.body

			if (username === undefined) {
				return res.status(400).json({message: 'Login error'})
			}

            const user = users.find(el => el.username === username)
            if (!user) {
                return res.status(400).json({message: `User ${username} isn\'t found`})
            }

			// Использовал данный код для вычисления хэша пароля фиктивного пользователя (на сервере храним только захэшированные пароли)
			// const hashPassword = bcrypt.hashSync(password, 7)
			// console.log('hashPassword', hashPassword)

            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: 'Wrong password entered'})
            }
            const token = generateAccessToken(user.id)
            return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }

    async getCounter(req, res) {
        try {
			const {counter} = req.body
            res.json(counter * 2)
        } catch (e) {
            console.log(e)
			res.status(400).json({message: 'Error while requesting counter'})
        }
    }
}

module.exports = new authController()