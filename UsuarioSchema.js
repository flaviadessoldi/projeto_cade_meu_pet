const mongoose = require("mongoose");
const { PetsSchema } = require('./PetSchema')
const Schema = mongoose.Schema;
const UsuariosSchema = new Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  nome: { type: String, required: true },
  telefone: { type: Number, required: true },
  email: { type: String, required: true },
  senha:{ type: String, required: true },
  pets: [PetsSchema]
})

const usuariosModel = mongoose.model("usuarios", UsuariosSchema);

module.exports = usuariosModel;