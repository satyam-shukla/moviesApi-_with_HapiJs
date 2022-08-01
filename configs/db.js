const {MongoClient} = require("mongodb")
require("dotenv").config()
let _db
let client 



module.exports = {
    async connectToServer(){
        client = await MongoClient.connect(process.env.DATABASE_URL)
        _db = client.db(process.env.DB_NAME)
    },
    async closeConnection(){
        client.close()
    },
    get(){
        return _db
    }   
}
