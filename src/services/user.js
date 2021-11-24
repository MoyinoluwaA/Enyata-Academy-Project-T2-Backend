const db = require('../db')
const queries = require('../db/queries/user')
const { hashPassword } = require('../utils/password')

const createUser = async body => {
    const { first_name, last_name, email, phone, password } = body
    const encryptedPassword = await hashPassword(password)

    const payload = [first_name, last_name, email, phone, encryptedPassword]
    return db.one(queries.addUser, payload)
}

const getUser = email => db.any(queries.getUser, email)

module.exports = {
    createUser,
    getUser
}