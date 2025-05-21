const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
     destination: (req, file, cb) => {
          cb(null, 'mediaUploads');  // your upload folder
     },
     filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + file.originalname;
          cb(null, uniqueSuffix);
     }
});

const upload = multer({ storage });

module.exports = upload;  // export the multer instance
