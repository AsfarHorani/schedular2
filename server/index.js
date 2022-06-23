const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require("cors");
const studentRoutes = require('./routes/student')
const adminRoutes = require('./routes/admin')
const teacherRoutes = require('./routes/staff')
const meetingRoutes = require('./routes/meeting')

var bodyParser = require('body-parser');
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));


app.use(meetingRoutes)
app.use(adminRoutes)
app.use(studentRoutes)
app.use(teacherRoutes)





app.use((error, req, res, next) => {

  const status = error.statusCode || 500;
  const message = error.message || "Something went wrong";
  console.log(error)
  res.status(status).json({
    message: message,
    statusCode: status
  })
})

mongoose.connect(process.env.DB_URL)
  .then(result => {

    app.listen(process.env.PORT || 5000);

    console.log("connected")
  }).catch(err => console.log(err))