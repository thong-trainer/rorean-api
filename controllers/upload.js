const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// set the storage engine
const storage = multer.diskStorage({
  destination: function(req, file, next) {
    // get a current datetime
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    var folder = './public/uploads/' + year;
    // if the folder not exist yet, then create
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }
    // upload folder
    folder += '/' + month;
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
    }
    next(null, folder)
  },
  filename: function(req, file, next) {
    next(null, Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100000000
  },
  fileFilter: function(req, file, next) {
    checkFileType(file, next);
  }
}).single('image');

// check file type
function checkFileType(file, next) {
  // allowed extension
  const filetypes = /jpeg|jpg|png|gif/;
  // check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return next(null, true);
  } else {
    next('Error: Alowed Images Only!');
  }
}

module.exports = {

  // upload a image
  uploadImage: async (req, res, next) => {
    upload(req, res, function(err) {
      console.log(req.file);
      if (err) {
        console.log("Photo API ERROR: " + err);

        res.status(500).json({
          message: "Error uploading file.",
          success: false
        });
      } else {
        if (req.file == undefined) {
          // the image not found
          res.status(500).json({
            message: "Error: No File Selected!",
            success: false
          });
        } else {
          // uploaded successful
          res.send(req.file);
        }
      }
    });
  },

};
