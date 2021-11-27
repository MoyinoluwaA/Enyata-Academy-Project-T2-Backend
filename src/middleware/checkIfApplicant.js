const { getApplicantInBatch } = require('../services/applicant')
const { errorResponse } = require('../utils/errorResponse')

/**
   * @description Ensure user can apply only once per application
   */
const checkIfApplicant = async (req, res, next) => {
	try {
		const { user, batchId } = req
		const [applicant] = await getApplicantInBatch(user.id, batchId)

		if (applicant) {
			return errorResponse(res, 'You can only apply once per batch', 401)
		}

		next()
	} catch (err) {
		next(err)
	}
}

module.exports = checkIfApplicant
