import { diskStorage } from "multer";
import * as path from "path";
import * as fs from "fs"

fs.mkdirSync('images/', {recursive: true})

const storageLocal = diskStorage({
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

export default storageLocal;
