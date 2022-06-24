const Staff = require('../models/staff');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
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
    const username = req.body.username;
    const depart = req.body.depart;
    let userId = req.body.userId
    const qualification = req.body.qualification;

    bcrypt.hash(password, 12)
        .then(hashedPassword => {
            const staff = new Staff({
                name: name,
                email: email,
                password: hashedPassword,
                username: username,
                depart: depart,
                userId: userId,
                qualification: qualification
            })
            return staff.save()
        }).then(result => {

            res.status(200).json({
                message: 'Sign up successful',
                staff: result
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
    let loadedstaff;
    Staff.findOne({ email: email })
        .then(staff => {

            if (!staff) {

                const error = new Error("staff doesn't exist");
                error.statusCode = 401;
                throw error;
            }

            loadedstaff = staff;

            return bcrypt.compare(password, staff.password)
        })
        .then(doMatch => {
            if (!doMatch) {
                const error = new Error("Password is incorrect");
                error.statusCode = 403;
                throw error;
            }
            const token = jwt.sign({
                email: loadedstaff.email,
                staffId: loadedstaff._id.toString()
            }, process.env.staff_AUTH_SIGNATURE, { expiresIn: '1h' })

            res.status(200).json({
                token: token,
                staffInfo: loadedstaff,
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


exports.getTimeTable = async (req, res, next) => {

    const id = req.params.id;
    try {
        const resp = await Staff.find({ _id: id }).select('timetable');
        if (!resp) {

            const error = new Error("Could not find timetable of staff with id: " + id);
            error.statusCode = 401;
            throw error;
        }

        res.status(200).json({
            message: "fetch table success!",
            data: resp[0]
        })



    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }




}




exports.getAllStaff = async (req, res, next) => {

    try {
        const allStaff = await Staff.find()
        console.log(allStaff)
        res.status(200).json({
            message: "Fetch staff successful!",
            staffData: allStaff
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}


exports.deleteStaff = async (req, res, next) => {
    try {
        const staffid = req.params.id;
        if (!staffid) {
            const error = new Error("staffid is undefined, make sure to add a staffid in the params");
            error.statusCode = 401;
            throw error;

        }
        const resp = await Staff.deleteOne({ _id: staffid })
        console.log(resp)

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}


exports.getStaff = async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    try {

        const staff = await Staff.findById(id);


        if (!staff) {

            const error = new Error("staff doesn't exist");
            error.statusCode = 401;
            throw error;
        }

        res.status(200).json({
            message: "fetch staff success!",
            staff: staff
        })


    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }


}


exports.editStaff = async (req, res, next) => {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    const username = req.body.username;
    const depart = req.body.depart;
    let userId = req.body.userId
    const id = req.params.id;
    const qualification = req.body.qualification;
    console.log(qualification);
    try {
        let staff = await Staff.findOne({ _id: id })


        staff.name = name;
        staff.email = email;
        staff.username = username;
        staff.depart = depart;
        staff.userId = userId;
        staff.qualification = qualification
        let editedStaff = await staff.save()
        res.status(200).json({
            message: "Success",
            editedStaff: editedStaff
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }

}

exports.deleteStaffRow = async (req, res, next) => {
    try {
        const day = req.body.day;
        const ind = req.body.id;
        const id = req.params.id;
        console.log(req.body, ind, day)
        const st = await Staff.findById(id);
        let table = st.timetable;
        table[day].splice(id, 1);
        st.timetable = table

        const resp = await st.save();
        res.status(200).json({
            staff: resp,
            message: "sucess"
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
}