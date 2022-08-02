const express = require("express")
const router = express.Router()
const multer = require("multer")
const clodinaryStorage = require("../cloudinary")
const upload = multer({ storage: clodinaryStorage })

router.get("/", (req, res, next) => {
  return res.status(200).json({ success: true, url: "https://cloudinary.com" })
})

router.post("/", upload.single("image"), (req, res, next) => {
  try {
    res.status(200).json({ success: true, image: req.file })
  } catch (error) {
    res.status(500).json({ success: false })
  }
})

module.exports = router
