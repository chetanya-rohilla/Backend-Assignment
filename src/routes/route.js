const express = require("express")
const UserController = require("../controllers/userController")
const StudentController = require("../controllers/studentController")
const {auth} = require("../middlewares/auth")

const router = express.Router()

router.post("/user", UserController.createUser)
router.post("/login", UserController.loginUser)

router.post("/student/add", auth, StudentController.addStudent)
router.get("/student/view", auth, StudentController.viewStudent)
router.post("/student/edit", auth, StudentController.updateStudent)
router.delete("/student/delete", auth, StudentController.deleteStudent)

module.exports = router