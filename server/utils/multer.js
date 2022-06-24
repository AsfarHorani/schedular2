
const multer = require("multer");


// onst fileFilter = (req, file, cb) => {
//     const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
//     if(allowedFileTypes.includes(file.mimetype)) {
//         cb(null, true);
//     } else {
//         cb(null, false);
//         return cb(new Error("Only .png, .jpg and ,jpeg formats are allowed!!"))
//     }
//   }


// const fileStorageEngine = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './images')
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + "-" + file.originalname)
//     },
//     fileFilter: fileFilter
// });

//".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"



var upload = multer({
    dest: 'uploads/', fileFilter: function (req, file, cb) {
        console.log(file)
        const allowedFileTypes = ['text/csv','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
      
        if(allowedFileTypes.includes(file.mimetype) && file) {
             
            cb(null, true) }
         else {
            req.fileValidationError = "Forbidden extension, only .csv files are allowed!";
            return cb(null, false, req.fileValidationError);

        }
    }
})



module.exports = upload;