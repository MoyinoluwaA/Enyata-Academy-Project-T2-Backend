const { makeNewApplication, getApplicantsInBatch, updateApplicantStatus } = require('../services/applicant')
const { addNewApplication } = require('../services/application')
const { updateUser } = require('../services/user')
const { successResponse } = require('../utils/successResponse')

const createApplication = async (req, res, next) => {
	try {
		const { body } = req
		const application = await addNewApplication(body)

		successResponse(res, 'Application created successfully', application, 201)
	} catch (err) {
		next(err)
	}
}

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

const getApplication = async (req, res, next) => {
	try {
		const { batchId } = req

		successResponse(res, `Application ${batchId} is ongoing`, { batchId }, 200)
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

const updateApplicantsStatus = async (req, res, next) => {
	try {
		const { params: { applicantId }, body: { status } } = req
		const applicant = await updateApplicantStatus(applicantId, status)

		successResponse(res, 'Applicant status update was successful', applicant, 200)
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
}
