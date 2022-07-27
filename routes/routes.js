const Joi = require("joi");
const movieData = require("../controllers/movies.controller");

module.exports = [
    {
        method: "GET",
        path: "/movies",
        options:{
            handler: movieData.getAllMovies,
            description: 'GET ALL MOVIES',
            tags: ['api','movies'], // ADD THIS TAG
        }
    },
    {
        method: "POST",
        path: "/movies",
        options:{
            handler: movieData.createMovie,
            description: 'CREATE A NEW MOVIE',
            tags: ['api','movies'], // ADD THIS TAG
            validate: {
                payload: Joi.object({
                    name:Joi.string().required().min(1).max(30),
                    title:Joi.string().required().min(1).max(200),
                    type:Joi.array().items(Joi.string().required()),
                })
            }
            
        }
        
    }
    ,{
        method: "GET",
        path: "/movies/{id}",
        options:{
            handler: movieData.getOneMovie,
            description: 'GET ONE MOVIE',
            tags: ['api','movies'], // ADD THIS TAG
        }

    },{
        method: "PATCH",
        path: "/movies/{id}",
        options:{
            handler: movieData.updateOne,
            description: 'UPDATE A  MOVIE',
            tags: ['api','movies'], // ADD THIS TAG
        }
    },{
        method: "DELETE",
        path: "/movies/{id}",
        options:{
            handler: movieData.deleteOne,
            description: 'DELETE A  MOVIE',
            tags: ['api','movies'], // ADD THIS TAG
        }
    },{
        method: '*',
        path: '/{any*}',
        handler: function (request, h) {
            return '<h1>404 Error! Page Not Found!</h1>';
        }
    }
]