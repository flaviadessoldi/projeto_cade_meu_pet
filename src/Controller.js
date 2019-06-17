const {connect} = require('./Repository')
const petModel = require('./PetSchema')
connect()

const getAll = async ()=>{
    return petModel.find((error, pets)=>{
        if(error){
            console.error(error)
        }
        return pets
    })
}

const getById = (id) => {
  return petModel.findById(id) 
}


 const add = (pet) => {
  const novoPet = new petModel({
    nome:pet.nome,
    especie: pet.especie,
    genero: pet.genero,
    idade:pet.idade,
    cor: pet.cor,
    outrasCaracteristicas: pet.outrasCaracteristicas,
    foto:pet.foto,
    data: pet.data,
    local:pet.local
  
  })
  
  novoPet.save()
}

const remove = (id)=>{
  return petModel.findByIdAndDelete(id)
}

const update = (id, pet) => {
  return petModel.findByIdAndUpdate(
    id,
    { $set: pet },
    { new: true }, 
  )
}


const change = (id, alteracao)=>{
    let petExistente = getAll().comidas

    petExistente.filter((pet)=>{
        if (pet.id === id){
            let nome = () => {pet.nome = alteracao.nome}
            let especie = ()=> {pet.especie = alteracao.especie}
           let genero= ()=> {pet.genero = alteracao.genero}
    let idade=()=> {pet.idade =alteracao.idade}
    let cor= ()=> {pet.cor= alteracao.cor}
    let outrasCaracteristicas= ()=> { pet.outrasCaracteristicas= alteracao.outrasCaracteristicas}
    let foto=()=> {pet.foto= alteracao.foto}
    let data =()=> { pet.data=alteracao.data}
    let local=()=> {pet.local=alteracao.local}

            return nome(), especie(), genero(), idade(), cor(), outrasCaracteristicas(), foto(),data(),local()
        }
    })
}

module.exports = {getAll, add, remove, change, update, getById}


