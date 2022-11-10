const UserModel = require("../models/userModel")
const jwt = require("jsonwebtoken")

const createUser = async function(req, res) {
    try {
        let {name, email, password} = req.body
        const createdUser = await UserModel.create({name, email, password})
        return res.status(201).send({status: true, data : createdUser})
    } catch (error) {
        return res.status(500).send({status:false, msg: error.message})
    }
}

const loginUser = async function(req, res) {
    try {
        let {email, password} = req.body
        let user = await UserModel.findOne({email, password})
        if(!user) return res.status(401).send({status: false, msg : "Incorrect credentials"})

        const token = jwt.sign(
            {userId : user._id}, "secret"
        )

        return res.status(200).send({status: true, data : token})
    } catch (error) {
        return res.status(500).send({status:false, msg: error.message})
    }
}

module.exports = {
    createUser
}