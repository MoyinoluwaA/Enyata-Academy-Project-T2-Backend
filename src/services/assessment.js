/* eslint-disable prefer-const */
/* eslint-disable camelcase */
const db = require('../db')
const { addAssessment, getAssessmentByBatch } = require('../db/queries/assessment')

exports.createAssessments = async (batchId, body) => {
	let {
		assessment_test, start_date, closing_date, time_allotted,
	} = body
	assessment_test = JSON.stringify(assessment_test)
	return db.one(
		addAssessment,
		[batchId, assessment_test, start_date, closing_date, time_allotted],
	)
}

exports.getAssessmentByBatch = async (batchId) => db.oneOrNone(getAssessmentByBatch, batchId)
