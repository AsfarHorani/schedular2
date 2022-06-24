const Student = require('../models/student');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const parse = require('csv-parse').parse
const fs = require('fs');
const { validationResult } = require("express-validator/check");

exports.signup = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error(errors.array()[0].msg || 'Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    const rollNo = req.body.rollNo;
    const depart = req.body.depart;
    var userId = Math.floor(10000 + Math.random() * 90000);

    bcrypt.hash(password, 12)
        .then(hashedPassword => {
            const student = new Student({
                name: name,
                email: email,
                password: hashedPassword,
                rollNo: rollNo,
                depart: depart,
                userId: userId
            })
            return student.save()
        }).then(result => {

            res.status(200).json({
                message: 'Sign up successful',
                student: result
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })


}

exports.signin = (req, res, next) => {


    const email = req.body.email;
    const password = req.body.password;
    let loadedstudent;
    Student.findOne({ email: email })
        .then(student => {

            if (!student) {

                const error = new Error("student doesn't exist");
                error.statusCode = 401;
                throw error;
            }

            loadedstudent = student;

            return bcrypt.compare(password, student.password)
        })
        .then(doMatch => {
            if (!doMatch) {
                const error = new Error("Password is incorrect");
                error.statusCode = 403;
                throw error;
            }
            const token = jwt.sign({
                email: loadedstudent.email,
                studentId: loadedstudent._id.toString()
            }, process.env.STUDENT_AUTH_SIGNATURE, { expiresIn: '1h' })

            res.status(200).json({
                token: token,
                studentInfo: loadedstudent,
                message: "Login succesfull"
            })
        })

        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })


}


exports.uploadTimeTable = async (req, res, next) => {

    try {

        console.log(req.file)
        console.log(req.fileValidationError)
        if (req.fileValidationError) {
            const error = new Error(req.fileValidationError || 'Validation failed.');
            error.statusCode = 422;
    
            throw error;
        }

        let data = []
        let time = ["8:45-09:00",
            "09:00-09:15",
            "09:15-09:30",
            "09:30-09:45",
            "09:45-10:00",
            "10:00-10:15",
            "10:15-10:30",
            "10:30-10:45",
            "10:45-11:00",
            "11:00-11:15",
            "11:15-11:30",
            "11:30-11:45",
            "11:45-12:00",
            "12:00-12:15",
            "12:15-12:30",
            "12:30-12:45",
            "12:45-12:00",
            "01:00-1:15",
            "01:15-01:30",
            "01:30-01:45",
            "01:45-02:00",
            "02:00-02:15",
            "02:15-02:30",
            "02:30-02:45",
            "02:45-02:00",
            "03:00-03:15",
            "03:15-03:30",
            "03:30-03:45",
            "03:45-4:00",
            "04:00-04:15",
            "04:15-04:30",
            "04:30-04:45",]
        let table = [];
        let i = 0;
        fs.createReadStream(req.file.path)
            .pipe(parse({ delimiter: ",", from_line: 1 }))
            .on("data", function (row) {
                table.push(row)

            })
            .on("end", async function () {

                let tableObj;
                tableObj = {
                    monday: [],
                    tuesday: [],
                    wednesday: [],
                    thursday: [],
                    friday: []
                };
                let userId = table[0][0];

                for (let x = 1; x < table.length; x++) {

                    let yCount = table[x].length;
                    let day = table[x][0];
                    for (let y = 1; y < yCount; y++) {

                        if (table[x][y] !== "NA") {
                            tableObj[day].push([time[y - 1], table[x][y]])
                        }

                    }


                }



                try {
                    console.log(tableObj)

                    const filter = { userId: userId };
                    const update = { timetable: tableObj };
                    const docs = await Student.findOneAndUpdate(filter, update)
                    if (!docs) {
                        if (!docs) {

                            const error = new Error("Roll no is incorrect");
                            error.statusCode = 401;
                            throw error;
                        }
                    }
                    res.status(200).json({
                        data: docs
                    })

                } catch (err) {
                    if (!err.statusCode) {
                        err.statusCode = 500;
                    }
                    next(err);
                }



            }).on("error", function (error) {

                if (!error.statusCode) {
                    error.statusCode = 500;
                }
                next(err);



            });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);

    }






}

exports.getAllStudents = async (req, res, next) => {

    try {
        const allStudent = await Student.find()
        console.log(allStudent)
        res.status(200).json({
            message: "Fetch students successful!",
            students: allStudent
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}



exports.deleteStudent = async (req, res, next) => {
    try {
        const studentid = req.params.sid;
        if (!studentid) {
            const error = new Error("studentid is undefined, make sure to add a studentid in the params");
            error.statusCode = 401;
            throw error;

        }
        const resp = await Student.deleteOne({ _id: studentid })
        console.log(resp)

    } catch (err) {
        console.log(err)
    }
}


exports.editStudent = async (req, res, next) => {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    const rollNo = req.body.rollNo;
    const depart = req.body.depart;
    var userId = Math.floor(10000 + Math.random() * 90000);
    const id = req.params.id
    try {
        let student = await Student.findOne({ _id: id })


        student.name = name;
        student.email = email;
        student.depart = depart;
        student.userId = userId;
        student.rollNo = rollNo
        let editedStd = await student.save()
        res.status(200).json({
            message: "Success",
            editedStudent: editedStd
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}

exports.getStudent = async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    try {

        const student = await Student.findById(id);


        if (!student) {

            const error = new Error("staff doesn't exist");
            error.statusCode = 401;
            throw error;
        }

        res.status(200).json({
            message: "fetch staff success!",
            student: student
        })


    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }


}