/* eslint-disable camelcase */
const db = require('../db')
const queries = require('../db/queries/application')

exports.addNewApplication = async (body) => {
	const {
		batch_id, start_date, closing_date, application_link, instructions,
	} = body

	const payload = [batch_id, start_date, closing_date, application_link, instructions]
	return db.one(queries.addApplication, payload)
}

exports.getApplicationById = (batch_id) => db.any(queries.getApplicationById, batch_id)
exports.getLatestApplication = async () => db.any(queries.getLastApplication)
