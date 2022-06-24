const Admin = require('../models/admin');
const Staff = require('../models/staff')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const parse = require('csv-parse').parse
const fs = require('fs')
const { validationResult } = require("express-validator/check");

exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error(errors.array()[0].msg || 'Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    console.log(req.body)
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    const username = req.body.username;
    const id = req.body.staffid;
    console.log(req.body)
    bcrypt.hash(password, 12)
        .then(hashedPassword => {
            const admin = new Admin({
                name: name,
                email: email,
                password: hashedPassword,
                username: username,
                userid: id
            })
            return admin.save()
        }).then(result => {

            res.status(200).json({
                message: 'Sign up successful',
                admin: result
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
    let loadedadmin;
    Admin.findOne({ email: email })
        .then(admin => {

            if (!admin) {

                const error = new Error("admin doesn't exist");
                error.statusCode = 401;
                throw error;
            }

            loadedadmin = admin;

            return bcrypt.compare(password, admin.password)
        })
        .then(doMatch => {
            if (!doMatch) {
                const error = new Error("Password is incorrect");
                error.statusCode = 403;
                throw error;
            }
            const token = jwt.sign({
                email: loadedadmin.email,
                adminId: loadedadmin._id.toString()
            }, process.env.ADMIN_AUTH_SIGNATURE, { expiresIn: '1h' })

            console.log("login sucess")
            const loadedadmin2 = {
                _id: loadedadmin._id,
                email: loadedadmin.email,
                name: loadedadmin.name,
                username: loadedadmin.username
            }
            res.status(200).json({
                token: token,
                userInfo: loadedadmin2,
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
        table.push([]);
        let i = 0;
        let userIds = []
    

        fs.createReadStream(req.file.path)
            .pipe(parse({ delimiter: ",", from_line: 1 }))
            .on("data", function (row) {
                try {
                    if (row[i] === "") {
                        //just skip
                    }

                    else if (!isNaN(row[0])) { //has aa rollnumber field
                        table.push([]);
                        i++;
                        table[i].push(row);

                    } else {


                        table[i].push(row);

                    }
                } catch (err) {
                    if (!err.statusCode) {
                        err.statusCode = 500;
                    }
                    next(err);
                }
            })
            .on("end", async function () {
                try {
                    table.shift()
                    let tableObj;
                    for (let x = 0; x < table.length; x++) {
                        tableObj = {
                            monday: [],
                            tuesday: [],
                            wednesday: [],
                            thursday: [],
                            friday: []
                        };
                        let userId = table[x][0][0];
                        let weekdaysCount = table[x].length;
                        for (let y = 1; y < weekdaysCount; y++) {
                            let day = table[x][y][0];
                            day = day.toLowerCase();

                            for (let z = 1; z < table[x][y].length; z++) {
                                if (table[x][y][z] !== "NA") {

                                    tableObj[day].push([time[z - 1], table[x][y][z]])
                                }

                            }
                        }


                        data = [...data, { id: userId, doc: tableObj }]

                    }

                    try {
                        const docs = await Promise.all(
                            data.map((e, i) => {
                                const filter = { userId: e.id };
                                const update = { timetable: e.doc };

                                return Staff.findOneAndUpdate(filter, update)
                            })
                        )

                        res.status(200).json({
                            data: docs
                        })

                    } catch (err) {
                        if (!err.statusCode) {
                            err.statusCode = 500;
                        }
                        next(err);
                    }
                } catch (err) {
                    if (!err.statusCode) {
                        err.statusCode = 500;
                    }
                    next(err);
                }


            }).on("error", function (err) {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }







}

exports.getAllAdmins = async (req, res, next) => {

    try {
        const allAdmins = await Admin.find()
        console.log(allAdmins)
        res.status(200).json({
            message: "Fetch admins successful!",
            admins: allAdmins
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}

exports.deleteAdmin = async (req, res, next) => {
    try {
        const adminid = req.params.aid;
        if (!adminid) {
            const error = new Error("adminid is undefined, make sure to add a adminid in the params");
            error.statusCode = 401;
            throw error;

        }
        const resp = await Admin.deleteOne({ _id: adminid })
        console.log(resp)

    } catch (err) {
        console.log(err)
    }
}
