const db = require("../configs/db");
const tableName = "Users"

// GET USER
const getUser = async(data) => {
    return db.get().collection(tableName).findOne(data);
};
// GET USERS 
const getUsers = async() => {
    return db.get().collection(tableName).find().toArray();
};

// CREATE USER
const createUser = async(data) => {
    return db.get().collection(tableName).insertOne(data);
};

// UPDATE USER
const updateUser = async(id,query) => {
    return db.get().collection(tableName).updateOne(id,{$set:query});
};

// DELETE USER 
const deleteUser = async(id) => {
    return db.get().collection(tableName).deleteOne(id);
};

// SEARCH USER

const searchUser = async(data) => {
    return db.get().collection(tableName).aggregate(data).toArray();
};

module.exports = {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    searchUser
}