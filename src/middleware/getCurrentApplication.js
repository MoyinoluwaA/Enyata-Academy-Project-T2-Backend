const { getLatestApplication } = require('../services/application')
const { errorResponse } = require('../utils/errorResponse')

/**
   * @description Get batch id of current application
   */
const getCurrentApplication = async (req, res, next) => {
	try {
		const application = await getLatestApplication()
		if (!application) {
			return errorResponse(res, 'No application currently', 404)
		}

		const today = new Date(Date.now())
		const isOngoing = application.start_date <= today <= application.closing_date
		if (!isOngoing) {
			return errorResponse(res, 'No application is ongoing', 404)
		}

		req.batchId = application.id
		next()
	} catch (err) {
		next(err)
	}
}

module.exports = getCurrentApplication
