const {MongoClient} = require("mongodb")
let _db
let client 



module.exports = {
    async connectToServer(){
        client = await MongoClient.connect("mongodb://localhost:27017/hapicrud");
        _db = client.db("hapicrud");
    },
    async closeConnection(){
        client.close()
    },
    get(){
        return _db
    }   
}
