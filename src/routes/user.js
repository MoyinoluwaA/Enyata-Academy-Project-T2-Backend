const express = require('express')
const { registerUser } = require('../controller/user')
const checkUserExists = require('../middleware/checkUserExists')
const validateInput = require('../middleware/validation')
const { createUserSchema } = require('../models/user')
const router = express.Router()

router.post(
    '/register', 
    validateInput(createUserSchema, 'body'),
    checkUserExists('register'),
    registerUser
)

module.exports = router