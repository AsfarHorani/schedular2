const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const staffSchema = new Schema({
    name: {
        type: String
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: Number,
        unique: true

    },
    password: {
        type: String,
        req: true

    },
    depart: {
        type: String,

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


module.exports = mongoose.model('staffs', staffSchema);
