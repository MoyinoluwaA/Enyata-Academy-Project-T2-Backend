const { createAssessments } = require('../services/assessment')
const { successResponse } = require('../utils/successResponse')

exports.createAssessment = async (req, res, next) => {
	try {
		const { body } = req
		const assessment = await createAssessments(body)

		successResponse(res, 'Assessment created successfully', assessment, 201)
	} catch (err) {
		next(err)
	}
}
