const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const adminSchema = new Schema({
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
       required: true,
       unique: true


    },
    password: {
        type: String,
        req: true

    },

})


module.exports = mongoose.model('admins', adminSchema);
