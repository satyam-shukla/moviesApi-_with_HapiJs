const db = require("../configs/db");

const tableName = "Movies"
// GET ALL
const getAll = async()=>{
    return db.get().collection(tableName).find().toArray()
}

// GET ONE
const getOne = async(data,query) =>{
    return db.get().collection(tableName).findOne(data,query)
}

// ADD ONE MOVIE TO DATABASE  

const createMovie = async(data) =>{
     return db.get().collection(tableName).insertOne(data)
}

//  DELETE ONE MOVIE TO A DATABASE 

const DeleteOne = (data) =>{
    return db.get().collection(tableName).deleteOne(data)
}


//  UPDATE A MOVIE FROM DATABASE


const updateOne = (data,query) =>{
    return db.get().collection(tableName).updateOne(data,{$set:query})
}

// SEARCH A SINGLE MOVIE


const aggregateOne = (data)=>{
    return db.get().collection(tableName).aggregate(data).toArray()
}

module.exports={
    getAll,
    getOne,
    createMovie,
    DeleteOne,
    updateOne,
    aggregateOne
}

