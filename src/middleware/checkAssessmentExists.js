/* eslint-disable camelcase */
const { getAssessmentByBatch } = require('../services/assessment')
const { errorResponse } = require('../utils/errorResponse')

/**
 * @description Check assessment with batch_id exists already
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next middleware function
 */
const checkAssessmentExists = async (req, res, next) => {
	try {
		const { params: { batchId } } = req
		const assessment = await getAssessmentByBatch(batchId)

		if (!assessment) {
			return errorResponse(
				res,
				`Assessment for batch ${batchId} does not exist`,
				404,
			)
		}

		req.assessment = assessment
		next()
	} catch (err) {
		next(err)
	}
}

module.exports = checkAssessmentExists
