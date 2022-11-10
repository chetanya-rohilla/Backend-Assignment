const StudentModel = require("../models/studentModel")

const addStudent = async function(req, res) {
    try {
        let {name, subject, marks} = req.body
        let student = await StudentModel.findOne({name, subject, userId : req.userId, isDeleted : false})

        if(student) {
            student.marks += marks
            student.save()
            return res.status(201).send({status: true, data : student})
        } else {
            let createdStudent = await StudentModel.create({name, subject, marks, userId: req.userId})
            return res.status(201).send({status: true, data : createdStudent})
        }
    } catch (error) {
        return res.status(500).send({status:false, msg: error.message})
    }
}

const viewStudent = async function(req, res) {
    try {
        let {name, subject} = req.query, query = {}
        if(name) query.name = name
        if(subject) query.subject = subject
        let students = await StudentModel.find({...query, userId : req.userId, isDeleted : false})
        if(students.length == 0) return res.status(404).send({status:false, msg: "No students found"})

        return res.status(201).send({status: true, data : students})
    } catch (error) {
        return res.status(500).send({status:false, msg: error.message})
    }
}

const updateStudent = async function(req, res) {
    try {
        let {name, subject, marks} = req.body
        let student = await StudentModel.findOne({name, subject, userId : req.userId, isDeleted : false})
        if(!student) return res.status(404).send({status:false, msg: "Student not found"})

        student.marks = marks
        student.save()

        return res.status(200).send({status: true, data : student})
    } catch (error) {
        return res.status(500).send({status:false, msg: error.message})
    }
}

const deleteStudent = async function(req, res) {
    try {
        let {name, subject} = req.body
        let student = await StudentModel.findOne({name, subject, userId : req.userId, isDeleted : false})

        if(student) {
            student.isDeleted = true
            student.save()
            return res.status(200).send({status: true, msg: "Student deleted"})
        } else {
            return res.status(404).send({status:false, msg: "Student not found"})
        }
    } catch (error) {
        return res.status(500).send({status:false, msg: error.message})
    }
}

module.exports = {
    addStudent, deleteStudent, viewStudent, updateStudent
}