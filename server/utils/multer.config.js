import multer from 'multer'

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '_' +file.originalname)
//   }
// })

const mb = Number(process.env.IMAGE_MB) || 10
const maxSize = mb * 1024 * 1024

const storage = multer.memoryStorage()
export const upload = multer({ storage, limits: { fileSize: maxSize } })