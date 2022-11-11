const UserModel = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const {isValid, isValidbody, nameRegex, emailRegex} = require("../validator/validator")

const createUser = async function(req, res) {
    try {
        let {name, email, password} = req.body

        if(!isValidbody(req.body)) return res.status(400).send({status: false, msg : "Please provide data"})
        if(!isValid(name)) return res.status(400).send({status: false, msg : "Please provide a name"})
        if(!isValid(email)) return res.status(400).send({status: false, msg : "Please provide a email"})
        if(!isValid(password)) return res.status(400).send({status: false, msg : "Please provide a password"})
        if(!nameRegex.test(name))  return res.status(400).send({status: false, msg : "Please provide a correct name"})
        if(!emailRegex.test(email))  return res.status(400).send({status: false, msg : "Please provide a correct email"})

        let user = await UserModel.findOne({email})
        if(user) return res.status(400).send({status: false, msg : "Email already used"})

        password = await bcrypt.hash(password, 10)

        const createdUser = await UserModel.create({name, email, password})
        return res.status(201).send({status: true, data : createdUser})
    } catch (error) {
        return res.status(500).send({status:false, msg: error.message})
    }
}

const loginUser = async function(req, res) {
    try {
        let {email, password} = req.body

        if(!isValidbody(req.body)) return res.status(400).send({status: false, msg : "Please provide data"})
        if(!isValid(email)) return res.status(400).send({status: false, msg : "Please provide a email"})
        if(!isValid(password)) return res.status(400).send({status: false, msg : "Please provide a password"})
        
        let user = await UserModel.findOne({email})
        if(!user) return res.status(401).send({status: false, msg : "Incorrect credentials"})

        const cmprPassword = await bcrypt.compare(password, user.password)
        if (!cmprPassword) return res.status(401).send({ status: false, message: "Incorrect credentials" })

        const token = jwt.sign(
            {userId : user._id}, "secret"
        )

        return res.status(200).send({status: true, data : token})
    } catch (error) {
        return res.status(500).send({status:false, msg: error.message})
    }
}

module.exports = {
    createUser, loginUser
}