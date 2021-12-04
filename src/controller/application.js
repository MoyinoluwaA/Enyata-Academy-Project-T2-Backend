/* eslint-disable camelcase */
const {
	makeNewApplication, getApplicantsInBatch, updateApplicantStatus, getApplicantsStats,
} = require('../services/applicant')
const { addNewApplication, getBatchDetails } = require('../services/application')
const { updateUser } = require('../services/user')
const { successResponse } = require('../utils/successResponse')

/**
 * @description: Create application by admin
 * @param {type} req - request object
 * @param {type} res - response object
 * @returns {object} - response object
 */
const createApplication = async (req, res, next) => {
	try {
		const { body } = req
		const application = await addNewApplication(body)

		successResponse(res, 'Application created successfully', application, 201)
	} catch (err) {
		next(err)
	}
}

/**
 * @description: Make application by users
 * @param {type} req - request object
 * @param {type} res - response object
 * @returns {object} - response object
 */
const makeApplication = async (req, res, next) => {
	try {
		const { body, query: { batchId }, user: { id } } = req
		await updateUser(body, id)
		const [application] = await makeNewApplication(id, batchId)

		successResponse(res, 'Application was successful', application, 200)
	} catch (err) {
		next(err)
	}
}

/**
 * @description: Get ongoing application and is_applicant status
 * @param {type} req - request object
 * @param {type} res - response object
 * @returns {object} - response object
 */
const getApplication = async (req, res, next) => {
	try {
		const { batchId, isApplicant, applicant } = req
		const details = await getBatchDetails(batchId)
		const { instructions, start_date } = details

		successResponse(res, `Application ${batchId} is ongoing`, {
			batchId,
			isApplicant,
			applicant,
			academy: {
				academy_instruction: instructions, assessment_start_date: start_date,
			},
		}, 200)
	} catch (err) {
		next(err)
	}
}

/**
 * @description: Get all applicants by batchId
 * @param {type} req - request object
 * @param {type} res - response object
 * @returns {object} - response object
 */
const getApplicantsByBatchId = async (req, res, next) => {
	try {
		const { batchId } = req.params
		const applicants = await getApplicantsInBatch(batchId)

		successResponse(res, `Applicants in batch ${batchId} fetched successfully`, applicants, 200)
	} catch (err) {
		next(err)
	}
}

/**
 * @description: Update applicant status by admin to approved or declined
 * @param {type} req - request object
 * @param {type} res - response object
 * @returns {object} - response object
 */
const updateApplicantsStatus = async (req, res, next) => {
	try {
		const { params: { applicantId }, body: { status } } = req
		const applicant = await updateApplicantStatus(applicantId, status)

		successResponse(res, 'Applicant status update was successful', applicant, 200)
	} catch (err) {
		next(err)
	}
}

/**
 * @description: Get applicant stats
 * @param {type} req - request object
 * @param {type} res - response object
 * @param {type} next - next function
 * @returns {object} - response object
 */
const getApplicantStats = async (req, res, next) => {
	try {
		const { batchId } = req
		const stats = await getApplicantsStats(batchId)

		successResponse(res, 'Applicant stats fetched successfully', stats, 200)
	} catch (err) {
		next(err)
	}
}

module.exports = {
	createApplication,
	makeApplication,
	getApplication,
	getApplicantsByBatchId,
	updateApplicantsStatus,
	getApplicantStats,
}
