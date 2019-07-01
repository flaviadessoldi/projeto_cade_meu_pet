require('dotenv-safe').load()
const mongoose = require("mongoose")
const MONGO_URL = process.env.MONGODB_URI


function connect(){
    mongoose.connect(MONGO_URL, 
        {useNewUrlParser: true},
     function(error){
        if(error){
        console.log("Deu erro.", error)
    }   else{
        console.log("Deu certo! Conectado no mongo!")
    }
    } 
  )
}

module.exports={connect}