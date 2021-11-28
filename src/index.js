/* eslint-disable no-console */
const express = require('express')
const cors = require('cors')
const db = require('./db')
const userRouter = require('./routes/user')
const applicationRouter = require('./routes/application')
const assessmentRouter = require('./routes/assessment')
const { createUserTable } = require('./db/queries/user')
const { createApplicationTable } = require('./db/queries/application')
const { createApplicantTable } = require('./db/queries/applicant')
const { createAssessmentTable } = require('./db/queries/assessment')

const port = process.env.PORT || 5000

const app = express()

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
	res.status(200).json({
		code: 200,
		status: 'success',
		message: 'Welcome to Enyata Academy API',
	})
})

app.use('/api/users', userRouter)
app.use('/api/applications', applicationRouter)
app.use('/api/assessment', assessmentRouter)

app.use((req, res) => {
	res.status(404).json({
		code: 404,
		status: 'failed',
		message: 'Page not found',
	})
})

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	res.status(500).json({
		code: 500,
		status: 'failed',
		message: 'Internal Server Error',
		error: err.message,
	})
})

db.connect()
	.then((obj) => {
		console.log('Connected to database')
		app.listen(port, () => {
			db.any(createUserTable)
			db.any(createApplicationTable)
			db.any(createApplicantTable)
			db.any(createAssessmentTable)
			console.log(`Server started on port ${port}`)
			obj.done()
		})
	})
	.catch((err) => {
		console.log('Error connecting to database', err)
	})

module.exports = app
