/* eslint-disable camelcase */
const { getAssessmentByBatch } = require('../services/assessment')
const { errorResponse } = require('../utils/errorResponse')

/**
 * @description Check assessment with batch_id exists already
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next middleware function
 */
const checkAssessmentExists = (type = 'fetch') => async (req, res, next) => {
	try {
		const { params: { batchId } } = req
		const assessment = await getAssessmentByBatch(batchId)

		if (!assessment && type === 'fetch') {
			return errorResponse(
				res,
				`Assessment for batch ${batchId} does not exist`,
				404,
			)
		}

		if (assessment && type === 'create') {
			return errorResponse(
				res,
				`Assessment for batch ${batchId} already exists`,
				400,
			)
		}

		req.assessment = assessment
		next()
	} catch (err) {
		next(err)
	}
}

module.exports = checkAssessmentExists
