require('dotenv-safe').load()
const { connect } = require('./Repository')
const usuariosModel = require('./UsuariosSchema')
const { petModel } = require('./PetSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

connect()

const getAll = () => {
    return usuariosModel.find((error, usuarios) => {
      return usuarios
    })
  }
  
  const getById = (id) => {
    return usuariosModel.findById(id)
  }
  
  const add = (usuario) => {
    const usuarioCadastrado = await usuariosModel.findOne({ email: usuario.email })

    if (usuarioCadastrado) {
    throw new Error('Email já cadastrado')
  }
    const salt = bcrypt.genSaltSync(10)
    const senhaCriptografada = bcrypt.hashSync(usuario.senha, salt)
    usuario.senha = senhaCriptografada

    const novoUsuario = new usuariosModel(usuario)
    return novoUsuario.save()
  }
  
  const remove = (id) => {
    return usuariosModel.findByIdAndDelete(id)
  }
  
  const update = (id, usuario) => {
    return usuariosModel.findByIdAndUpdate(
      id,
      { $set: usuario },
      { new: true },
    )
  }

  const getPets = async usuarioId => {
    const usuario = await getById(usuarioId)
    return usuario.pets
  }

  const getByPetId = async (usuarioId, petId) => {
    const usuario = await getById(usuarioId)
    return usuario.pet.find(pet => {
      return pet._id == petId
    })
  }

  const updatePet = (usuarioId, petId, pet) => {
    return usuariosModel.findOneAndUpdate(
      { _id: usuarioId, "pets._id": petId },
      { $set: { "pets.$": { ...pet, _id: petId } } }, 
      { new: true } 
    )
  }

const addPet = async (usuarioId, pet) => {
    const usuario = await getById(usuarioId)
    const novoPet = new petModel(pet)
    const buscaPet = await novoPet.findOne({especie: pet.especie, genero:pet.genero, porte:pet.porte, cor: pet.cor })

  if (buscaPet) {
    return console.log(buscaPet)
  }   
    usuario.pets.push(novoPet)

    return usuario.save()
  }

  const login = async (dadosDoLogin) => {
    const usuarioCadastrado = await usuariosModel.findOne(
      { email: dadosDoLogin.email }
    )
  
    if (usuarioCadastrado) {
      const senhaCorreta = bcrypt.compareSync(
        dadosDoLogin.senha, usuarioCadastrado.senha
      )
  
      if (senhaCorreta) {
        const token = jwt.sign(
          {
            email: usuarioCadastrado.email,
            id: usuarioCadastrado._id
          },
          process.env.PRIVATE_KEY,
          { expiresIn: 60 }
        )
        return { auth: true, token };
      } else {
        throw new Error('Sua senha está incorreta.')
      }
    } else {
      throw new Error('Este email não está cadastrado.')
    }
  }

  module.exports = {getAll, getById, add, remove, update, addPet, updatePet, getPets, getByPetId, login}