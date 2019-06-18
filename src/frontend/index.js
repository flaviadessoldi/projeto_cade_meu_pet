// // const container = document.querySelector('#encontrei')

// fetch(`http://localhost:3000/cademeupet`)
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     data.forEach(pet => {
//       console.log(pet)

//     })
//   })
//   .catch((erro) => {
//     console.log(erro)
//   })


// const botao = document.querySelector('#botaoPerdi')
// botao.addEventListener("click", criarPet)

// function criarPet() {
//   const nome = document.querySelector("#nomePet").value
//   const especie = document.querySelector("#especiePet").value
//   const raca = document.querySelector("#racaPet").value
//   const genero = document.querySelector("#generoPet").value
//   const idade = document.querySelector("#idadePet").value
//   const cor = document.querySelector("#corPet").value
//   const outrasCaracteristicas = document.querySelector("#caracteristicasPet").value
//   const foto = document.querySelector("#fotoPet").value
//   const dataPerdeu = document.querySelector("#calendario2").value
//   const localPerdeu = document.querySelector("#map").value
//   const petPerdido = {
//     nome, especie, raca, genero, idade, cor, outrasCaracteristicas, foto, dataPerdeu, localPerdeu
//   }
//   fetch(
//     'http://localhost:3000/cademeupet',
//     {
//       method: 'POST',
//       body: JSON.stringify(petPerdido),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     }
//   ).then(response => console.log("criou!"))
// }

// const botao2 = document.querySelector('#botaoEncontrei')
// botao2.addEventListener("click", criarPetEncontrado)

// function criarPetEncontrado() {
//   const especie = document.querySelector("#especiePetEncontrado").value
//   const raca = document.querySelector("#racaPetEncontrado").value
//   const genero = document.querySelector("#generoPetEncontrado").value
//   const idade = document.querySelector("#idadePetEncontrado").value
//   const cor = document.querySelector("#corPetEncontrado").value
//   const outrasCaracteristicas = document.querySelector("#caracteristicasPetEncontrado").value
//   const foto = document.querySelector("#fotoPetEncontrado").value
//   const dataEncontrou = document.querySelector("#calendario").value
//   const localEncontrou = document.querySelector("#map").value
//   const petEncontrado = {
//     nome, especie, raca, genero, idade, cor, outrasCaracteristicas, foto, dataEncontrou, localEncontrou
//   }
//   fetch(
//     'http://localhost:3000/cademeupet',
//     {
//       method: 'POST',
//       body: JSON.stringify(petEncontrado),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     }
//   ).then(response => console.log("criou!"))
// }

