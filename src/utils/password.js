const bcrypt = require('bcryptjs')

// eslint-disable-next-line no-return-await
exports.hashPassword = async (password) => await bcrypt.hash(password, 10)
