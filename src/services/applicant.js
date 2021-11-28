/* eslint-disable arrow-body-style */
/* eslint-disable camelcase */
const db = require('../db')
const queries = require('../db/queries/applicant')

exports.getApplicantInBatch = async (user_id, batch_id) => {
	return db.oneOrNone(queries.getApplicantInBatch, [user_id, batch_id])
}

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
