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

	async ssl(req, res) {
        try {
			console.log('Success!')
			res.json('4B24996678E935A75C57E63F0A2768B850A0C3C7F8E954EF4C4391BDEC20312Bcomodoca.comad078c685f2a9c0')
        } catch (e) {
            console.log(e)
			res.status(400).json({message: 'Something went wrong'})
        }
    }
}

module.exports = new authController()