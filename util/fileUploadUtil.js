const multer = require('multer');
const path = require('path');

module.exports = {
  multerMw: multer(
    {
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, "./public/images/uploads");
        },
        filename: (req, file, callback) => {
          const fileNameParsed = path.parse(file.originalname);
          const fileName = `${fileNameParsed.name}-${Math.floor(new Date() / 1000)}${fileNameParsed.ext}`;
          file.savedName = fileName;
          callback(null, fileName);
        }
      })
    }
  )
};
