/* eslint-disable camelcase */
const { getApplicantById } = require('../services/applicant')
const { errorResponse } = require('../utils/errorResponse')

/**
   * @description check applicant status
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Object} next - Express next middleware function
   */
const checkApplicantStatus = async (req, res, next) => {
	try {
		const { query: { applicantId }, body: { applicant_id } } = req
		const applicant = await getApplicantById(applicantId || applicant_id)

		if (!applicant) {
			return errorResponse(res, 'Applicant not found', 404)
		}

		if (applicant.status !== 'approved') {
			return errorResponse(res, 'You have not been approved', 400)
		}

		next()
	} catch (err) {
		next(err)
	}
}

module.exports = checkApplicantStatus
