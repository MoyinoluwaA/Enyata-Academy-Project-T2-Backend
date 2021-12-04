/* eslint-disable camelcase */
const { getApplicantInBatch, getApplicantById } = require('../services/applicant')
const { errorResponse } = require('../utils/errorResponse')

/**
   * @description check if applicant exists
   * @param {Object} type - type of action [apply by default]
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Object} next - Express next middleware function
   */
const checkIfApplicant = (type = 'apply') => async (req, res, next) => {
	try {
		if (type === 'apply') {
			const { user, query: { batchId } } = req
			const applicant = await getApplicantInBatch(user.id, batchId)

			if (applicant) {
				return errorResponse(res, 'You can only apply once per batch', 401)
			}
		} else if (type === 'status') {
			const { user, batchId } = req
			const applicant = await getApplicantInBatch(user.id, batchId)

			let isApplicant
			// eslint-disable-next-line no-unused-expressions
			applicant ? isApplicant = true : isApplicant = false
			req.isApplicant = isApplicant
			req.applicant = applicant
		} else {
			const { params: { applicantId } } = req
			const applicant = await getApplicantById(applicantId)

			if (!applicant) {
				return errorResponse(res, 'Applicant not found', 404)
			}
		}

		next()
	} catch (err) {
		next(err)
	}
}

module.exports = checkIfApplicant
