/**
 * @description Returns an error response with the given message and status code
 * @param {Response} res http response object
 * @param {String} message custom error message
 * @param {Number} [status=500] http error status
 * @returns {Response} http response with error status and message
 */

exports.errorResponse = (res, message, status = 500) => {
	let errMessage
	if (message == null) {
		switch (status) {
		case 400:
			errMessage = 'Internal server error'
			break
		case 403:
			errMessage = 'Invalid user access'
			break
		case 422:
			errMessage = 'Invalid user input'
			break
		default:
			errMessage = 'Internal server error'
			break
		}
	} else {
		errMessage = message
	}
	return res.status(status).send({ status: 'fail', code: status, message: errMessage })
}
