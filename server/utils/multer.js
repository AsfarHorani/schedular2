
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


var upload = multer({
    dest: 'uploads/', fileFilter: function (req, file, cb) {
        if (file.mimetype === 'text/csv') { cb(null, true) } else {
            req.fileValidationError = "Forbidden extension, only .csv files are allowed!";
            return cb(null, false, req.fileValidationError);

        }
    }
})



module.exports = upload;