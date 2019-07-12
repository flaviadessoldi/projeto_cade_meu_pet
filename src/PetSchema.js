const mongoose = require("mongoose")
const Schema = mongoose.Schema
const PetSchema = new Schema ({
    _id:{type: mongoose.Schema.Types.ObjectId, auto: true},
    nome:{type: String},
    especie: {type: String},
    genero: {type: String},
    porte:{type: String},
    cor: {type:String},
    outrasCaracteristicas: {type:String},
    foto:{type:String},
    data: {type: String},
    local:{type: String}
})

const petModel = mongoose.model("pet", PetSchema)

module.exports = {petModel, PetSchema}