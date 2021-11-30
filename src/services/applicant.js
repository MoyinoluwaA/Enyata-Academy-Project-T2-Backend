/* eslint-disable arrow-body-style */
/* eslint-disable camelcase */
const db = require('../db')
const queries = require('../db/queries/applicant')

/**
 * @description - Get an applicant in a batch
 * @param {string} user_id id of the user
 * @param {string} batch_id id of the batch
 * @returns {<promise>}	promise object with the result of the query
 */
exports.getApplicantInBatch = async (user_id, batch_id) => {
	return db.oneOrNone(queries.getApplicantInBatch, [user_id, batch_id])
}

/**
 * @description - Make new application by applicants in a batch
 * @param {string} user_id id of the user
 * @param {string} batch_id id of the batch
 * @returns {<Array>} array of applicants
 */
exports.makeNewApplication = async (user_id, batch_id) => {
	return db.any(queries.addApplicant, [user_id, batch_id])
}

/**
 * @description - Get all applicants in a batch
 * @param {string} batch_id id of the batch
 * @returns {<Array>} array of applicants
 */
exports.getApplicantsInBatch = async (batch_id) => {
	return db.any(queries.getApplicantsInBatch, [batch_id])
}

/**
 * @description - update the status of the applicant
 * @param {string} applicantId applicant id
 * @param {string} status applicant status
 * @returns {<promise>}	promise object with the result of the query
 */
exports.updateApplicantStatus = async (applicantId, status) => {
	return db.one(queries.updateApplicantStatus, [applicantId, status])
}

/**
 * @description - get applicant by id
 * @param {string} applicantId applicant id
 * @returns {<promise>}	promise object with the result of the query
 */
exports.getApplicantById = async (applicantId) => {
	return db.oneOrNone(queries.getApplicantById, [applicantId])
}

exports.addApplicantScore = async (batch_id, body) => {
	const { applicant_id, assessment_answers, assessment_score } = body
	// eslint-disable-next-line max-len
	return db.oneOrNone(queries.addApplicantScore, [assessment_answers, assessment_score, batch_id, applicant_id])
}
