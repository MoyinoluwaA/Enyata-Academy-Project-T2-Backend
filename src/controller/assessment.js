const { addApplicantScore } = require('../services/applicant')
const { createAssessments, calculateAssessmentScore, fetchAssessmentHistory } = require('../services/assessment')
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
		const {
			params: { batchId }, body, assessment, query: { applicantId },
		} = req
		const score = await calculateAssessmentScore(body, assessment)
		await addApplicantScore(batchId, body, applicantId, score)

		successResponse(res, 'Test scores sent successfully', [], 200)
	} catch (err) {
		next(err)
	}
}

exports.getAssessmentStatus = async (req, res, next) => {
	try {
		successResponse(res, 'Assessment for batch exists', { assessment: true }, 200)
	} catch (err) {
		next(err)
	}
}

exports.getAssessmentHistory = async (req, res, next) => {
	try {
		const history = await fetchAssessmentHistory()

		successResponse(res, 'Assessment history', history, 200)
	} catch (err) {
		next(err)
	}
}
