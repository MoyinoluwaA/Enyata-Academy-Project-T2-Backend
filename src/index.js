const express = require("express");
const db = require("./db");
const router = require("./routes/user");
const { createUserTable } = require("./db/queries/user");
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', () => {
	res.status(200).json({
		code: 200,
		status: 'success',
		message: 'Welcome to Enyata Academy API'
	})
})

app.use('/api/users', router)

app.use((req, res) => {
	res.status(404).json({
		code: 404,
		status: 'failed',
		message: 'Page not found'
	})
})

app.use((err, req, res, next) => {
	res.status(500).json({
		code: 500,
		status: 'failed',
		message: 'Internal Server Error',
		error: err.message
	})
})

db.connect()
.then((obj) => {
    console.log("Connected to database");
    app.listen(port, () => {
		db.any(createUserTable);
		console.log(`Server started on port ${port}`);
		obj.done();
    });
})
.catch((err) => {
	console.log("Error connecting to database", err);
});

module.exports = app;