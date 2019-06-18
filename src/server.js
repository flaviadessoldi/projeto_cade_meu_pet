const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const controller = require('./Controller')

const servidor = express()
servidor.use(cors())
servidor.use(bodyParser.json())


servidor.get("/cademeupet", async (request, response)=>{
    // response.send(controller.getAll())
    controller.getAll()
    .then(pet => response.send(pet))
})

servidor.get('/cademeupet/:id', (request, response) => {
  const id = request.params.id
  controller.getById(id)
    .then(pet => {
      if(!pet){ // comida === null || comida === undefined
        response.sendStatus(404) // comida nao encontrada
      } else {
        response.send(pet)
      }
    })
    .catch(error =>{
      if(error.name === "CastError"){
        response.sendStatus(400)
      }else {
        response.sendStatus(500)
      }
    })
})

servidor.post('/cademeupet', (request, response) => {
  controller.add(request.body)
  .then(pet => {
    const _id = pet._id
    response.send(_id)
  })
  .catch(error => {
    if(error.name === "ValidationError"){
      response.sendStatus(400) // bad request
    } else {
      response.sendStatus(500)
    }
  })

})


servidor.post('/cademeupet/encontrei', (request, response) => {
  controller.add(request.body)
  .then(pet => {
    const _id = pet._id
    response.send(_id)
  })
  .catch(error => {
    if(error.name === "ValidationError"){
      response.sendStatus(400) // bad request
    } else {
      response.sendStatus(500)
    }
  })

})



servidor.delete('/cademeupet/:id',  (request, response) => {
  controller.remove(request.params.id)
  .then(pet => {
  if(!pet){ 
    response.sendStatus(404) 
  } else {
    response.sendStatus(204)
  }
})
.catch(error => {
  if(error){
  response.sendStatus(500)
  }
  })

})



servidor.patch('/cademeupet/:id', (request, response) => {
  const id = request.params.id
  controller.update(id, request.body)
    .then(pet => {
      if(!pet) { response.sendStatus(404) } // nao encontrei a comida
      else { response.send(pet) } // o status default 200
    })
    .catch(error => {
      if(error.name === "MongoError" || error.name === "CastError"){
        response.sendStatus(400) // bad request
      } else {
        response.sendStatus(500)
      }
    })
})

servidor.put("/cademeupet/:id", (request, response) =>{
    controller.change(request.params.id, request.body)
    response.sendStatus(200)
})

servidor.listen(3000)
console.log('servidor rodando na porta 3000')









