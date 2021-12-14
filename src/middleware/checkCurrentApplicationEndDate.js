const { getLatestApplication } = require('../services/application')
const { errorResponse } = require('../utils/errorResponse')

/**
   * @description Check if current application has ended
   */
const checkCurrentApplicationEndDate = async (req, res, next) => {
	try {
		const application = await getLatestApplication()

		if (!application) {
			return errorResponse(res, 'No application currently', 404)
		}
		const today = new Date(Date.now())
		const isOngoing = today <= application.closing_date

		if (isOngoing) {
			return errorResponse(res, 'An application is ongoing', 400)
		}

		next()
	} catch (err) {
		next(err)
	}
}

module.exports = checkCurrentApplicationEndDate
