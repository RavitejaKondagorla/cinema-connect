import multer from "multer";
import multerS3 from "multer-s3";
import s3 from "../config/s3.js";

console.log("AWS_BUCKET_NAME:", process.env.AWS_BUCKET_NAME);

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET_NAME, // S3 bucket name
    acl: "public-read",
    key: (req, file, cb) => {
      // Safe filename (NO req.user here)
      const fileName = `uploads/${Date.now()}-${file.originalname}`;
      cb(null, fileName);
    },
  }),
});

export default upload;