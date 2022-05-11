import multer, { diskStorage } from "multer";
import { dirname, join } from "path";
import { unlink } from 'fs';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const storage = diskStorage({
    destination: function (req, file, cb) {
        const rootDir = dirname(__filename) + "/../..";
        cb(null, rootDir);
    },
    filename: function (req, file, cb) {
        const extension = file.mimetype.split("/")[1];
        if (req.body["change" + file.fieldname]) {
            unlink(join(dirname(__filename) + "/../..", req.body["change" + file.fieldname]), (err) => { console.log(err) });
        }
        
        req.body[file.fieldname] = "/public/images/" + "image_" + Date.now() + '_' + Math.round(Math.random() * 1E9) + "." + extension;
        cb(null, req.body[file.fieldname]);
    }
})

const fileFilter = (req, file, cb) => {
   
    const allowedTypes = ["image/jpg", "image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error("Hatalı dosya tipi"), false);
    }
    return cb(null, true);
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

export { upload }