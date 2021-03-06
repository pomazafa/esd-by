const multer = require('multer');
const path = require('path');

module.exports = {
  multerMw: (destination) => {
    return multer({
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, destination);
        },
        filename: (req, file, callback) => {
          const fileNameParsed = path.parse(file.originalname);
          const fileName = `${fileNameParsed.name}-${Math.floor(new Date() / 1000)}${fileNameParsed.ext}`;
          callback(null, fileName);
        }
      })
    })
  }
};