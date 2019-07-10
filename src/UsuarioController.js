require('dotenv-safe').load()
const { connect } = require('./Repository')
const usuariosModel = require('./UsuarioSchema')
const { petModel } = require('./PetSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

connect()

const getAll = () => {
  return usuariosModel.find((error, usuarios) => {
    return usuarios
  })
}

const getAllPets = () => {
  return usuariosModel.find((error, pets) => {
    return pets
  })
}

const getById = (id) => {
  return usuariosModel.findById(id)
}

const add = async (usuario) => {
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
  usuario.pets.push(novoPet)

  return usuario.save()
}



// PARA BUSCAR SE EXISTE ALGUM PET CADATSRADO COM AS MESMAS CARACTERISTICAS

const findPet = async (usuarios) => { 
  const usuariosPets = await getAllPets(usuarios)
  
  if (usuariosPets){
  const petEncontrado = petModel.find({ especie: pet.especie, genero: pet.genero, porte: pet.porte, cor: pet.cor }) //usa o seu Model pra fazer o find
    return petEncontrado
} else{
  console.log('não foram encontrados pets com essas caracteristicas')
}
  }

// const petFinder = async (pet) => {
//   const petCadastrado = await petModel.find(
//     {especie: pet.especie, genero: pet.genero, porte: pet.porte, cor: pet.cor }
//   )

//   if (petCadastrado) {
//     return petCadastrado
//     } else {
//       console.log('Não há animais cadastrados com essa caracteristica')
//     }
//   }
  


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

module.exports = { getAll,getAllPets, getById, add, remove, update, addPet, updatePet, getPets, getByPetId,findPet, login }