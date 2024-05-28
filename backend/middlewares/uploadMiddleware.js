const util = require("util");
const multer = require("multer");
const path = require("path");
const maxSize = 2 * 1024 * 1024;

const __basedir = path.resolve(process.cwd());

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/images");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
