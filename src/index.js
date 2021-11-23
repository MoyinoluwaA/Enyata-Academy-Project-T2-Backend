const express = require("express");
const { db } = require("./db");
const { createUserTable } = require("./db/queries/user");
const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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
