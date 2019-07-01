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

// const compararPets = async (id1,id2)=>{


//   const especie = await petModel.find(especie)
//   const genero = await petModel.find(genero)
//   const cor = await petModel.find(cor)
//   const local = await petModel.find(local)
//   if(especie.id1 === especie.id2 || genero.id1 ===genero.id2){
//   if(cor.id1=== cor.id2 || local.id1===local.id2){
    
//     return id1,id2
//   }
//  }
// }

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
    let porte=()=> {pet.porte =alteracao.porte}
    let cor= ()=> {pet.cor= alteracao.cor}
    let outrasCaracteristicas= ()=> { pet.outrasCaracteristicas= alteracao.outrasCaracteristicas}
    let foto=()=> {pet.foto= alteracao.foto}
    let data =()=> { pet.data=alteracao.data}
    let local=()=> {pet.local=alteracao.local}

            return nome(), especie(), genero(), idade(), cor(), outrasCaracteristicas(), foto(),data(),local()
        }
    })
}

module.exports = {getAll, remove, change, update, getById }


