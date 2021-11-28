/* eslint-disable max-len */
/* eslint-disable camelcase */
const { errorResponse } = require('../utils/errorResponse')

/**
 * @description Ensure admin cannot create assessment with date that is less than application closing date
 * @param {object} type - The request type [createAssessment by default]
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next middleware function
 */

exports.validateAssessmentDate = (req, res, next) => {
	let { start_date } = req.body
	const { application } = req
	start_date = new Date(start_date)
	if (start_date < application.closing_date) {
		return errorResponse(res, 'Assessment date is less than application closing date', 400)
	}
	next()
}
