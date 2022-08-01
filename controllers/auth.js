const jwt = require("jsonwebtoken");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const db = require("../configs/db");
const ObjectId = require("mongodb").ObjectId;
const Boom = require('@hapi/boom');
const userModal = require("../model/auth");
require("dotenv").config()

// ADD A NEW USER TO DATABASE
const registerUser = async (req, h) => {
    console.log("satyam--------------")
    try {
        const userFound = await userModal.getUser({ email: req.payload.email });
        if (userFound) {
            return Boom.conflict("User with email already exists")
        } else {
            req.payload.password = bcrypt.hashSync(req.payload.password,8)
            const newUser = await userModal.createUser(req.payload);
            console.log(newUser)
            return h.response(newUser).code(200)
        }
    } catch (err) {
        console.log(err)
        return h.response(err).code(400)
    }
}

// USER LOGIN 
const loginUser = async (req, h) => {
    let token;
    try {
        const user = await userModal.getUser({email:req.payload.email});
        if(!user){
            return h.response("User not found with the given email id")
        }else{
            const correctPwd = bcrypt.compareSync(req.payload.password,user.password);
            if(correctPwd){
                let userData = _.pick(user,['email', 'firstName', 'lastName'])
                token = jwt.sign(userData,process.env.JWT,{expiresIn:process.env.EXPIRES_TOKEN});
                return { success: true, message: 'Login Successful', data: token, statusCode: 200 };
            }else{
                return Boom.unauthorized("Invalid Password")
            }
        }
    } catch (err) {
        return h.response(err).code(400)
    }
}

// GET ONE USER 
const getUser = async (req, h) => {
    const _id = new ObjectId(req.params.id)
    try {
        const user = await userModal.getUser({ _id })
        return h.response(user).code(200)
    } catch (err) {
        console.log(err)
        return h.response(err).code(400)
    }
}

// GET USERS
const getUsers = async (req, h) => {
    try {
        const user = await userModal.getUsers()
        return h.response(user).code(200)
    } catch (err) {
        console.log(err)
        return h.response(err).code(400)
    }
}

// UPDATE USER 
const updateUser = async (req, h) => {
    const _id = new ObjectId(req.params.id)
    try {
        const user = await userModal.updateUser({ _id }, req.payload);
        return h.response(user).code(200)
    } catch (err) {
        console.log(err)
        h.response(err).code(400)
    }
}

// DELETE USER
const deleteUser = async (req, h) => {
    const _id = new ObjectId(req.params.id)
    try {
        const user = await userModal.deleteUser({ _id })
        return h.response(user).code(200)
    } catch (err) {
        return h.response(err).code(400)
    }
}

// SEARCH USER
const searchUsers = async (req, h) => {
    try {
        const users = await userModal.searchUser([{ $match: { fistName: req.query.fistName } }]);
        return h.response(users).code(200)
    } catch (err) {
        return h.response(err).code(400)
    }
}



module.exports = {
    registerUser,
    loginUser,
    getUser,
    getUsers,
    updateUser,
    deleteUser,
    searchUsers
}


