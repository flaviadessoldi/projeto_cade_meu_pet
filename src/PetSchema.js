const mongoose = require("mongoose")
//casa Schema equivale a uma collection
const Schema = mongoose.Schema
const PetSchema = new Schema ({
    _id:{type: mongoose.Schema.Types.ObjectId, auto: true},
    nome:{type: String},
    especie: {type: String, required: true},
    genero: {type: String, required: true},
    idade:{type: String},//opcional
    cor: {type:String},
    outrasCaracteristicas: {type:String},
    foto:{type:String, required:true},
    data: {type: Date, required: true},
    local:{type: String, required: true}
})

const petModel = mongoose.model("pet", PetSchema)

module.exports = petModel