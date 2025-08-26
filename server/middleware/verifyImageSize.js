import { upload } from "../utils/multer.config.js";



const mb = Number(process.env.IMAGE_MB) || 10

export const verifyImageSize = (req, res, next) => {
  upload.array("images", 20)(req, res, function (err) {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({ message: `Each uploading image must be less than ${mb} MB.`});
      }
      return res.status(400).json({ message: err.message || "Image upload failed." });
    }
    next()
  })
}