const { addNewApplication } = require('../services/application')
const { successResponse } = require('../utils/successResponse')

const createApplication = async (req, res, next) => {
	try {
		const { body } = req
		const application = await addNewApplication(body)

		successResponse(res, 'Application created successfully', application, 201)
	} catch (err) {
		next(err)
	}
}

module.exports = {
	createApplication,
}
