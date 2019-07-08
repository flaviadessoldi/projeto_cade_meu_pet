const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const servidor = express()
const usuariosController = require('./UsuarioController')
const PORT = process.env.PORT || 3000
const jwt = require('jsonwebtoken')
const logger = (request, response, next) => {
  console.log(`${new Date().toISOString()} Request type: ${request.method} to ${request.originalUrl}`)

  response.on('finish', () => {
    console.log(`${response.statusCode} ${response.statusMessage};`)
  })

  next()
}

servidor.use(cors())
servidor.use(bodyParser.json())
servidor.use(logger)



servidor.get('/usuarios', async (request, response) => {
  const authHeader = request.get('authorization')
  let auth = false

  if (authHeader) {
    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.PRIVATE_KEY, function(error, decoded) {
      if (error) {
        response.sendStatus(403)
      } else {
        auth = true
      }
    })
  } else {
    response.send(401)
  }

  if (auth) {
    usuariosController.getAll()
    .then(usuarios => response.send(usuarios))
  }
})


servidor.get('/usuarios/:usuarioId', (request, response) => {
  const usuarioId = request.params.usuarioId
  usuariosController.getById(usuarioId)
    .then(usuario => {
      if(!usuario){
        response.sendStatus(404)
      } else {
        response.send(usuario)
      }
    })

       .catch(error => {
      if(error.name === "CastError"){
        response.sendStatus(400)
      } else {
        response.sendStatus(500)
      }
    })
})

servidor.patch('/usuarios/:id', (request, response) => {
  const id = request.params.id
  usuariosController.update(id, request.body)
    .then(usuario => {
      if(!usuario) { response.sendStatus(404) }
      else { response.send(usuario) }
    })
    .catch(error => {
      if(error.name === "MongoError" || error.name === "CastError"){
        response.sendStatus(400)
      } else {
        response.sendStatus(500)
      }
    })
})

servidor.post('/usuarios', (request, response) => {
  usuariosController.add(request.body)
    .then(usuario=> {
      const _id = usuario._id
      response.send(_id)
    })
    .catch(error => {
      if(error.name === "ValidationError"){
        response.sendStatus(400)
      } else {
        console.log(error)
        response.sendStatus(500)
      }
    })
})

servidor.post('/usuarios/adicionar-pet/:usuarioId', (request, response) => {
  const usuarioId = request.params.usuarioId
  usuariosController.addPet(usuarioId, request.body)
    .then(usuario => {
      const _id = usuario._id
      response.send(_id)
    })
    .catch(error => {
      if(error.name === "ValidationError"){
        response.sendStatus(400)
      } else {
        console.log(error)
        response.sendStatus(500)
      }
    })
  })

servidor.get('/usuarios/:usuarioId/pets', async (request, response) => {
  const usuarioId = request.params.usuarioId
  usuariosController.getPets(usuarioId)
    .then(pets => response.send(pets))
})

servidor.patch('/usuarios/:usuarioId/pet/:petId', (request, response) => {
  const usuarioId = request.params.usuarioId
  const petId = request.params.petId
  usuariosController.updatePet(usuarioId, petId, request.body)
    .then(pet => {
      if(!pet) { response.sendStatus(404) }
      else { response.send(pet) }
    })
    .catch(error => {
      if(error.name === "MongoError" || error.name === "CastError"){
        response.sendStatus(400)
      } else {
        response.sendStatus(500)
      }
    })
})

servidor.get('/usuarios/:usuarioId/pets/:petId', (request, response) => {
  const usuarioId = request.params.usuarioId
  const petId = request.params.petId
  usuariosController.getByPetId(usuarioId, petId)
    .then(pet => {
      if(!pet){
        response.sendStatus(404)
      } else {
        pet = response.send(pet)
        pet.findPet(petId)
      }
    })
    .catch(error => {
      if(error.name === "CastError"){
        response.sendStatus(400)
      } else {
        response.sendStatus(500)
      }
    })
})

servidor.post('/usuarios/login', (request, response) => {
  usuariosController.login(request.body)
    .then(respostaDoLogin => {
      response.send(respostaDoLogin)
    })
    .catch(error => {
      if(error.name === "ValidationError"){
        console.log(error)
        response.sendStatus(400)
      } else {
        console.log(error)
        response.sendStatus(500)
      }
    })
})

// ROTA PARA ENCONTRAR O PET

servidor.get('usuarios/encontrar-pet/:usuarioId/pet/:petId', async (request, response)=>{
  const usuarioId = request.params.usuarioId
const petId = request.params.petId
usuariosController.getByPetId(usuarioId, petId)
  .then(pet => {
    if(!pet){
      response.sendStatus(404)
    } else {
      const petEncontrado = pet.findPet(petId)
      response.send(petEncontrado)
     
    }
  })
  .catch(error => {
    if(error.name === "CastError"){
      response.sendStatus(400)
    } else {
      response.sendStatus(500)
    }
  })
})

//opção de rota para encontrar o pet

// servidor.get('/usuarios/usuarioId/encontrar-pet', (request, response) => {
//   const usuarioId = request.params.usuarioId
//   const buscaPet = usuariosController.getByPetId(usuarioId.request.body)
//   buscaPet.petFinder(petCadastrado)
//     .then(usuarioCadastrado => {
//       if(petCadastrado){
//         return (usuarioCadastrado)
//       }else{
//         return console.log('Nenhum pet cadastrado com essas caracteristicas')
//       }
//     })
//     .catch(error => {
//       if(error.name === "ValidationError"){
//         console.log(error)
//         response.sendStatus(400)
//       } else {
//         console.log(error)
//         response.sendStatus(500)
//       }
//     })
// })
  
  servidor.listen(PORT)
    
  console.log(`Servidor rodando na porta ${PORT}`)
  
  




