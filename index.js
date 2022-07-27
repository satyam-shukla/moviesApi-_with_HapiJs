const Hapi = require("@hapi/hapi");
const db = require("./configs/db");
const routes = require("./routes/routes");
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');



const connect = async()=>{
    try {
        await db.connectToServer()
        console.log("DATABASE IS CONNECTED");

    } catch (err) {
        console.log("DATABASE IS NOT CONNECTED");
        throw err;
    }
}


const init = async () => {
    const server = Hapi.server({
        port: 8700,
        host: "localhost"
    })
    // Get all movies
    // Add a new movie to a database
    // GET A SINGLE MOVIE
    // DELETE A SINGLE  MOVIE FROM A DATABASE
    // SEARCH A SINGLE
    const swaggerOptions = {
        info: {
                title: 'Test API Documentation',
                version: '1.0.0',
            },
        };

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);
    server.route(routes)
    await connect()
    server.start();
    console.log("Server runnning on %s ", server.info.uri)
}

init()