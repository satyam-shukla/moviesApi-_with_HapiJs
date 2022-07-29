const moviesModal = require("../model/Movies");
const ObjectId = require("mongodb").ObjectId;



const getAllMovies = async(req, h) =>{
    try {
        const movies =await moviesModal.getAll();  
         
        return h.response(movies).code(200)
    } catch (err) {
        return h.response(err).code(400)
    }
}

const getOneMovie = async(req,h)=>{
    const _id = new ObjectId(req.params.id)
    try {
        const movie = await moviesModal.getOne({_id}, {projection:{title:1,name:1,type:1}})
        return h.response(movie).code(200)
    } catch (err) {
        return h.response(err).code(400)
    }
}

const createMovie = async(req,h)=>{
    try {
        const movie = await moviesModal.createMovie(req.payload)
        return h.response(movie).code(200)
    } catch (err) {
        return h.response(err).code(400)
    }
}


const deleteOne = async(req , h) => {
    const _id = new ObjectId(req.params.id)
    // const id = req.params.id

    try {
        const movie = await moviesModal.DeleteOne({_id})
        return h.response(movie).code(200)
    } catch (err) {
        console.log(err)
        return h.response(err).code(400)
    }
}


const updateOne = async(req,h)=>{
    const _id = new ObjectId(req.params.id)
    try {
        const movie = await moviesModal.updateOne({_id},req.payload);
        return h.response(movie).code(200)
    } catch (err) {
        return h.response(err).code(400)
    }
}

const aggregateOne = async(req ,h)=>{
    console.log(req.query.title)
    try {
        const movie = await moviesModal.aggregateOne([
            { $match: { title: req.query.title } }
          ])
        return h.response(movie).code(200)
    } catch (err) {
        return h.response(err).code(400)
    }
}

module.exports = {
    getAllMovies,
    getOneMovie,
    createMovie,
    deleteOne,
    updateOne,
    aggregateOne
}


