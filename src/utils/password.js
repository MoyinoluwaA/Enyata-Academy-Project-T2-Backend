/* eslint-disable no-return-await */
const bcrypt = require('bcryptjs')

exports.hashPassword = async (password) => await bcrypt.hash(password, 10)

// eslint-disable-next-line max-len
exports.comparePassword = async (password, userPassword) => await bcrypt.compare(password, userPassword)
