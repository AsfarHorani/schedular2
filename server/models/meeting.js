const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const meetingSchema = new Schema({
  status:{
    type: String,
    default:"pending"
  },
  roomId:{
    type: Number,
  },
  description:{
    type: String
  },
  visiblity:{
    type : Boolean
  }
})


module.exports = mongoose.model('meetings', meetingSchema);
