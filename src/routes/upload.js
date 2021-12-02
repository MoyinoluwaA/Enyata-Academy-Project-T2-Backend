const express = require('express')
const upload = require('../controller/upload')
const multer = require('../middleware/multer')
const { getAuthToken, verifyAuthToken } = require('../middleware/validateToken')

const router = express.Router()

router
	.post(
		'/',
		getAuthToken,
		verifyAuthToken,
		multer,
		upload,
	)

module.exports = router
