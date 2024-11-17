import multer from "multer";
import path from "path";
import fs from "fs"

fs.mkdirSync('images/', {recursive: true})

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, "images");
   },
   filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const fileExtention = path.extname(file.originalname);
      const fileName = "local" + "-" + uniqueSuffix + fileExtention;
      cb(null, fileName);
   },
});

const uploadLocal = multer({ storage: storage });

export default uploadLocal;
