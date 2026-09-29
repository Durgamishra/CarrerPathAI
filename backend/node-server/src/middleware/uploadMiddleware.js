const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),

  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"), false);
    }
  },

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = upload;