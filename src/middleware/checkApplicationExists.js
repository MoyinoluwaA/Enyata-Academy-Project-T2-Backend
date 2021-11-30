/* eslint-disable camelcase */
const { getApplicationById } = require('../services/application')
const { errorResponse } = require('../utils/errorResponse')

/**
 * @description Ensure admin cannot create new application with batch_id that that exists already
 * @param {object} type - The request type [createApplication by default]
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @param {function} next - The next middleware function
 */
const checkApplicationExists = (type = 'createApplication') => async (req, res, next) => {
	try {
		const { body: { batch_id }, params: { batchId } } = req
		const application = await getApplicationById(Number(batch_id) || batchId)

		if (type === 'createApplication') {
			if (application) {
				return errorResponse(
					res,
					'Application with this batch_id already exists',
					400,
				)
			}
		} else if (!application) {
			return errorResponse(
				res,
				'Application with this batch_id does not exist',
				404,
			)
		}
		req.application = application
		next()
	} catch (err) {
		next(err)
	}
}

module.exports = checkApplicationExists
