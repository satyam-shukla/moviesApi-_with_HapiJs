const movieData = require("../controllers/movies.controller")
module.exports = [
    {
        method: "GET",
        path: "/movies",
        handler: movieData.getAllMovies
    },{
        method: "POST",
        path: "/movies",
        handler: movieData.createMovie
    },{
        method: "GET",
        path: "/movies/{id}",
        handler: movieData.getOneMovie
    },{
        method: "PATCH",
        path: "/movies/{id}",
        handler: movieData.updateOne
    },{
        method: "DELETE",
        path: "/movies/{id}",
        handler: movieData.deleteOne
    },{
        method: "GET",
        path: "/",
        handler: (req, h) => {
            return "RETURN SERACH RESULT FORM SPECIFIED TERM"
        }
    }
]