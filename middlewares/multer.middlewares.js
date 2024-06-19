import multer from "multer";
import path from "path"
import crypto from "crypto";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/images/user-images/")
    },
    filename: function (req, file, cb) {
        crypto.randomBytes(5, function (err, bytes) {
            const fn = bytes.toString("hex") + Date.now() + path.extname(file.originalname);
            cb(null, fn)
        })
    }
})

const upload = multer({ storage: storage })

export default upload