/* eslint-disable camelcase */
const { getApplicationById } = require('../services/application')
const { errorResponse } = require('../utils/errorResponse')

/**
   * @description Ensure admin cannot create new application with batch_id that that exists already
   */
const checkApplicationExists = async (req, res, next) => {
	try {
		const { body: { batch_id } } = req
		const application = await getApplicationById(batch_id)

		if (application) {
			return errorResponse(res, 'Application with this batch_id already exists', 400)
		}

		next()
	} catch (err) {
		next(err)
	}
}

module.exports = checkApplicationExists
