const Joi = require("joi");
const movieData = require("../controllers/movies.controller");
const authUser = require("../controllers/auth")
module.exports = [
    {
        method:"POST",
        path:"/register",
        options: {
            handler:authUser.registerUser,
            description: 'CREATE A NEW USER',
            tags: ['api', 'user'], // ADD THIS TAG
            validate: {
                payload: Joi.object({
                    firstName: Joi.string().required().min(5).max(20),
                    lastName: Joi.string().required().min(5).max(20),
                    email: Joi.string().required().email().lowercase(),
                    password:Joi.string().required().min(1).max(30),
                })
            }

        }
    },
    {
        method:"POST",
        path:"/login",
        options: {
            handler:authUser.loginUser,
            description: 'LOGIN A  USER',
            tags: ['api', 'user'], // ADD THIS TAG
            auth: false,
            validate: {
                payload: Joi.object({
                    email: Joi.string().required().email().lowercase(),
                    password:Joi.string().required(),
                })
            }

        }
    },
    {
        method:"GET",
        path:"/searchuser",
        options: {
            handler:authUser.searchUsers,
            description: 'SEARCH USERS',
            tags: ['api', 'user'], // ADD THIS TAG
            auth: false,
            validate: {
                query: Joi.object({
                  firstName: Joi.string().required().description(`firstname of the user`),
                })
              }
        }
    },
    {
        method:"GET",
        path:"/users",
        options: {
            handler:authUser.getUsers,
            description: 'GET ALL USERS',
            tags: ['api', 'user'], // ADD THIS TAG
            auth: false,
        }
    },
    {
        method:"GET",
        path:"/user/{id}",
        options: {
            handler:authUser.getUser,
            description: 'GET ONE USER',
            tags: ['api', 'user'], // ADD THIS TAG
            auth: false,
            validate: {
                params: Joi.object({
                  id: Joi.string().required().description(`id of the USER`),
                })
              }
            
        },

    },
    {
        method:"PATCH",
        path:"/user/{id}",
        options: {
            handler:authUser.updateUser,
            description: 'UPDATE USER DETAILS',
            tags: ['api', 'user'], // ADD THIS TAG
            auth: false,
            validate: {
                params: Joi.object({
                  id: Joi.string().required().description(`id of the Movies`),
                })
              }
            
        },

    },
    {
        method:"DELETE",
        path:"/user/{id}",
        options: {
            handler:authUser.deleteUser,
            description: 'DELETE USER ',
            tags: ['api', 'user'], // ADD THIS TAG
            auth: false,
            validate: {
                params: Joi.object({
                  id: Joi.string().required().description(`id of the Movies`),
                })
              }
            
        },

    },
    {
        method: "GET",
        path: "/movies",
        options: {
            handler: movieData.getAllMovies,
            description: 'GET ALL MOVIES',
            tags: ['api', 'movies'], // ADD THIS TAG
            auth: false,
        }
    },
    // Search for a movie
    {
        method: 'GET',
        path: '/searchmovie',
        options: {
            handler: movieData.aggregateOne,
            description: 'SEARCH MOVIES',
            tags: ['api', 'movies'], // ADD THIS TAG
            auth: false,
            validate: {
                query: Joi.object({
                  title: Joi.string().required().description(`Title of the Movie`),
                })
              }
        }
    },
    {
        method: "POST",
        path: "/movies",
        options: {
            handler: movieData.createMovie,
            description: 'CREATE A NEW MOVIE',
            tags: ['api', 'movies'], // ADD THIS TAG
            auth: false,
            validate: {
                payload: Joi.object({
                    name: Joi.string().required().min(1).max(30),
                    title: Joi.string().required().min(1).max(200),
                    type: Joi.array().items(Joi.string().required()),
                })
            }

        }

    }
    , {
        method: "GET",
        path: "/movies/{id}",
        options: {
            handler: movieData.getOneMovie,
            description: 'GET ONE MOVIE',
            tags: ['api', 'movies'], // ADD THIS TAG
            auth: false,
            validate: {
                params: Joi.object({
                  id: Joi.string().required().description(`id of the Movies`),
                })
              }
            
        },

    }, {
        method: "PATCH",
        path: "/movies/{id}",
        options: {
            handler: movieData.updateOne,
            description: 'UPDATE A  MOVIE',
            tags: ['api', 'movies'], // ADD THIS TAG
            auth: false,
            validate: {
                params: Joi.object({
                  id: Joi.string().required().description(`id of the Movies`),
                })
              }
        }
    }, {
        method: "DELETE",
        path: "/movies/{id}",
        options: {
            handler: movieData.deleteOne,
            description: 'DELETE A  MOVIE',
            tags: ['api', 'movies'], // ADD THIS TAG
            auth: false,
            validate: {
                params: Joi.object({
                  id: Joi.string().required().description(`id of the Movies`),
                })
              }
        }
    }, {
        method: '*',
        path: '/{any*}',
        handler: function (request, h) {
            return '<h1>404 Error! Page Not Found!</h1>';
        }
    }
]