const Meeting = require('../models/meeting');
const Student = require('../models/student');
const Staff = require('../models/staff');
const staff = require('../models/staff');

//util function to look if slot is empty or not in table
function ifSlotExist(day, timeSlot) {
    

    for(let i=0; i<day.length; i++){
        if (day[i][0] === timeSlot) {
            console.log(day[i][0],timeSlot)
            return true;
        }
    }
     
    day.forEach((e, i) => {
        
    })

    return false;

}

exports.requestMeeting = async (req, res, next) => {

    const userId = req.body.userId;
    const staffId = req.body.staffId;
    const timeSlot = req.body.timeSlot;
    const day = req.body.day;

    try {
        let studDoc = await Student.findById(userId)
        if (!studDoc) {

            console.log("Student  doesnt exist")
            const error = new Error("Could not find student ");
            error.statusCode = 401;
            throw error;


        }

        let staffDoc = await Staff.findById(staffId);
        if (!staffDoc) {


            console.log("Student  doesnt exist")
            const error = new Error("Could not find staff");
            error.statusCode = 401;
            throw error;

        }

        //Checking wheather slot if already occupied
        let daySchedule = staffDoc.timetable[day]
        let exists = ifSlotExist(daySchedule,timeSlot)
        if(exists){
            console.log("Student  doesnt exist")
            const error = new Error("Slot is not free please choose another");
            error.statusCode = 401;
            throw error;

        }

        //Checking of student is free?
        let ds= studDoc.timetable[day]
        exists = ifSlotExist(ds,timeSlot)
        if(exists){
            console.log("Student  doesnt exist")
            const error = new Error("you are not free, please choose another time slot");
            error.statusCode = 401;
            throw error;

        }

        const newMeeting = new Meeting()
        const meetDoc = await newMeeting.save();
        //Use an update query to update the time table and insert [time, id of meeting] i am using a manal approach cause a litle weak in querying mongoose
        //updating staff table
      
      
        daySchedule.push([timeSlot, meetDoc._id])
        daySchedule.sort((a, b) => {
            if (a[0] === b[0]) {
                return 0;
            }
            else {
                return (a[0] < b[0]) ? -1 : 1;
            }
        })
        staffDoc.timetable[day] = daySchedule;
        let editedDoc = await staffDoc.save();

        //updating student table student
        let daySchedule2 = studDoc.timetable[day]
        daySchedule2.push([timeSlot, meetDoc._id])
        daySchedule2.sort((a, b) => {
            if (a[0] === b[0]) {
                return 0;
            }
            else {
                return (a[0] < b[0]) ? -1 : 1;
            }
        })
        studDoc.timetable[day] = daySchedule2;
        editedDoc = await studDoc.save();








    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }


}


