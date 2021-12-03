const { addApplicantScore } = require('../services/applicant')
const { createAssessments } = require('../services/assessment')
const { successResponse } = require('../utils/successResponse')

exports.createAssessment = async (req, res, next) => {
	try {
		const { body, params: { batchId } } = req
		const assessment = await createAssessments(batchId, body)

		successResponse(res, 'Assessment created successfully', assessment, 201)
	} catch (err) {
		next(err)
	}
}

exports.getAssessment = async (req, res, next) => {
	try {
		const { assessment } = req

		successResponse(res, 'Assessment fetched successfully', assessment, 200)
	} catch (err) {
		next(err)
	}
}

exports.addAssessmentScore = async (req, res, next) => {
	try {
		const { params: { batchId }, body } = req
		const score = await addApplicantScore(batchId, body)

		successResponse(res, 'Test scores sent successfully', score, 200)
	} catch (err) {
		next(err)
	}
}
