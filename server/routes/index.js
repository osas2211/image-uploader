const express = require("express")
const router = express.Router()

router.get("/", (req, res, next) => {
  return res.status(200).json({ success: true, url: "https://cloudinary.com" })
})

module.exports = router
