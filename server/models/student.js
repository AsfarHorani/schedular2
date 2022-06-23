const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const studentSchema = new Schema({
    name: {
        type: String
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    depart: {
        type: String,

    },
    userId: {
        type: Number,
        unique: true

    },
    rollNo: {
        type: Number,
        unique: true,
        required: true

    },
    password: {
        type: String,
        req: true

    },

    timetable: {
        monday: [
            [{ type: String },
            { type: String }]],
        tuesday: [
            [{ type: String },
            { type: String }]],
        wednesday: [
            [{ type: String },
            { type: String }]],
        thursday: [
            [{ type: String },
            { type: String }]],
        friday: [
            [{ type: String },
            { type: String }]],
    }

})


module.exports = mongoose.model('students', studentSchema);
