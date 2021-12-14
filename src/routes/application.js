const express = require('express')
const {
	createApplication, makeApplication, getApplication, getApplicantsByBatchId,
	updateApplicantsStatus, getApplicantStats,
} = require('../controller/application')
const validateInput = require('../middleware/validation')
const {
	applicationSchema, makeApplicationSchema, batchIdSchema, applicantStatusSchema, applicantIdSchema,
} = require('../models/application')
const { getAuthToken, verifyAuthToken } = require('../middleware/validateToken')
const checkUserRole = require('../middleware/checkUserRole')
const checkApplicationExists = require('../middleware/checkApplicationExists')
const checkIfApplicant = require('../middleware/checkIfApplicant')
const getCurrentApplication = require('../middleware/getCurrentApplication')
const checkCurrentApplicationEndDate = require('../middleware/checkCurrentApplicationEndDate')

const router = express.Router()

router
	.post(
		'/create',
		getAuthToken,
		verifyAuthToken,
		checkUserRole('admin'),
		validateInput(applicationSchema, 'body'),
		checkApplicationExists(),
		checkCurrentApplicationEndDate,
		createApplication,
	)

	.put(
		'/apply',
		getAuthToken,
		verifyAuthToken,
		checkUserRole('user'),
		validateInput(batchIdSchema, 'query'),
		checkIfApplicant(),
		validateInput(makeApplicationSchema, 'body'),
		makeApplication,
	)

	.get(
		'/status',
		getAuthToken,
		verifyAuthToken,
		checkUserRole('user'),
		getCurrentApplication('user'),
		checkIfApplicant('status'),
		getApplication,
	)

	.get(
		'/applicants/:batchId',
		getAuthToken,
		verifyAuthToken,
		checkUserRole('admin'),
		validateInput(batchIdSchema, 'params'),
		checkApplicationExists('getApplicants'),
		getApplicantsByBatchId,
	)

	.put(
		'/applicants/:applicantId',
		getAuthToken,
		verifyAuthToken,
		checkUserRole('admin'),
		validateInput(applicantIdSchema, 'params'),
		checkIfApplicant('updateApplicantStatus'),
		validateInput(applicantStatusSchema, 'body'),
		updateApplicantsStatus,
	)

	.get(
		'/stats',
		getAuthToken,
		verifyAuthToken,
		checkUserRole('admin'),
		getCurrentApplication('admin'),
		getApplicantStats,
	)
	.get(
		'/status/applications',
		getCurrentApplication('user'),
		getApplication,
	)

module.exports = router
