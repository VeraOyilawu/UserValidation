const userModel = require("../models/userModel")
const cloudinary = require("../utils/cloudinary")
const Validator = require("fastest-validator")
const fs = require("fs")


const createUser =async( req, res) => {
    try {
        const {name, number, email} = req.body

        // const result = await cloudinary.uploader.upload(req.file.filename)
        const result = await cloudinary.uploader.upload(req.file.path)
        const newUser = {
            name,
            number,
            email,
            profile:result.secure_url,
        }

        const savedUser = await userModel.create(newUser)

        if(savedUser) {
            res.status(201).json({
                message: "profile created sucessfully",
                data: savedUser
            })
        } else {
            res.status(400).json({
                message: "unable to create profile",
                error: validate[0].message
            })
        }


        const validateSchema = {
            name:{
                type:"string",
                optional:false
            },
            number:{
                type:"number",
                optional:false,
                max:11,
                min:11
            },
           email:{
                type:"string",
                optional:false
            },
          
            profile:{
                   type:"string",
                   optional:false
                }
        }

        const V = new Validator()
        const validate = V.validate(studentModel,validateSchema)


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getUsers = async(req, res) => {
    try {
        const users = await userModel.find()
        if (!users) {
            res.status(400).json({
                message: "users not found"
            })
        } else {
            res.status(200).json({
                message: "users found are "+ users.length,
                data: users
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const oneUser = async(req, res) => {
    try {
        const {id} = req.params
        const user = await userModel.findById(id)

        res.status(200).json({
            message: "the user ",
            data: user
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const updateUser = async(req, res) => {
    try {
        const {id} = req.params
        const user = await userModel.findById(id)
        const {name, number, email } = req.body

        if(user) {
            if(user.profile) {
                const public_id = user.profile.split("/").pop().split(".")[0]
                await cloudinary.uploader.destroy(public_id)
            }

            const result = cloudinary.uploader.upload(req.file.path)
            user.name = name
            user.number = number
            user.email = email
            user.profile = result.secure_url

            res.status(200).json({
                message: "updated sucessfully",
                data: result
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        }) 
    }
}

const deleteUser = async(req, res) => {
    try {
        const {id} = req.params
        const user = await userModel.findById(id)
        const {name,number, email, } = req.body

        if(user) {
            if(user.profile) {
                const public_id = user.profile.split("/").pop().split(".")[0]
                await cloudinary.uploader.destroy(public_id)
            }

            res.status(200).json({
                message: "deleted sucessfully",
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        }) 
    }
}

module.exports = {
    createUser,
    getUsers,
    oneUser,
    updateUser,
    deleteUser
    
}