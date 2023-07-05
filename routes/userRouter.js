const express = require("express")
const router= express.Router()

const {createUser, getUsers, oneUser, updateUser, deleteUser} = require("../controller/userController")

const upload = require("../utils/multer")


router.post("/create",  upload.fields( [ { name: "profile", maxCount: 1 } ] ),  createUser)
router.get("/profile", getUsers)
router.get("/profile/:id", oneUser)
router.put("/profile/:id", upload.single("profile"), updateUser)
router.delete("/profile/:id", deleteUser)

module.exports = router
