/* eslint-disable prefer-const */
/* eslint-disable camelcase */
const db = require('../db')
const { addAssessment } = require('../db/queries/assessment')

exports.createAssessments = async (body) => {
	let {
		batch_id, image, assessment_test, start_date, closing_date, time_allotted,
	} = body
	assessment_test = JSON.stringify(assessment_test)
	return db.one(
		addAssessment,
		[batch_id, image || null, assessment_test, start_date, closing_date, time_allotted],
	)
}
