// const container = document.querySelector('#encontrei')

fetch(`http://localhost:3000/cademeupet`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach(pet => {
      console.log(pet)

      //     const mediaItem = document.createElement('div');
      //     mediaItem.setAttribute('class', 'media mb-4');
      //     mediaItem.innerHTML = `
      //     <img src="${prato.imagem}" alt="${prato.nome}" class="mr-3 img-thumbnail" width="200px">
      //     <div class="media-body>
      //         <h5 class="mt-0"><strong>${prato.nome}</strong></h5>
      //         ${prato.descricao}
      //       </div>`
      //       container.appendChild(mediaItem);
      //       const buttonDelete = document.createElement("button")
      //       buttonDelete.textContent = "Remover"
      //       buttonDelete.setAttribute("class", "btn btn-info")
      //       buttonDelete.setAttribute("data-id", prato._id)
      //       mediaItem.appendChild(buttonDelete)

      //       buttonDelete.addEventListener("click", () =>{
      //         fetch(
      //           `http://localhost:3000/comidas/${prato._id}`,
      //           {
      //             method: 'DELETE',
      //             headers: {
      //               'Content-Type': 'application/json'
      //             }
      //           }
      //         ).then((response) => {
      //           console.log(response)
      //           if(response.status === 204) {
      //             window.location.reload()
      //           } else {
      //             window.alert("Deu erro ao deletar, sorry")
      //           }
      //         })
      //       })
    })
  })
  .catch((erro) => {
    console.log(erro)
  })


const botao = document.querySelector('#botaoPerdi')
botao.addEventListener("click", criarPet)

function criarPet() {
  const nome = document.querySelector("#nomePet").value
  const especie = document.querySelector("#especiePet").value
  const raca = document.querySelector("#racaPet").value
  const genero = document.querySelector("#generoPet").value
  const idade = document.querySelector("#idadePet").value
  const cor = document.querySelector("#corPet").value
  const outrasCaracteristicas = document.querySelector("#caracteristicasPet").value
  const foto = document.querySelector("#fotoPet").value
  const dataPerdeu = document.querySelector("#calendario2").value
  const localPerdeu = document.querySelector("#map").value
  const petPerdido = {
    nome, especie, raca, genero, idade, cor, outrasCaracteristicas, foto, dataPerdeu, localPerdeu
  }
  fetch(
    'http://localhost:3000/cademeupet',
    {
      method: 'POST',
      body: JSON.stringify(petPerdido),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ).then(response => console.log("criou!"))
}

const botao2 = document.querySelector('#botaoEncontrei')
botao2.addEventListener("click", criarPetEncontrado)

function criarPetEncontrado() {
  const especie = document.querySelector("#especiePetEncontrado").value
  const raca = document.querySelector("#racaPetEncontrado").value
  const genero = document.querySelector("#generoPetEncontrado").value
  const idade = document.querySelector("#idadePetEncontrado").value
  const cor = document.querySelector("#corPetEncontrado").value
  const outrasCaracteristicas = document.querySelector("#caracteristicasPetEncontrado").value
  const foto = document.querySelector("#fotoPetEncontrado").value
  const dataEncontrou = document.querySelector("#calendario").value
  const localEncontrou = document.querySelector("#map").value
  const petEncontrado = {
    nome, especie, raca, genero, idade, cor, outrasCaracteristicas, foto, dataEncontrou, localEncontrou
  }
  fetch(
    'http://localhost:3000/cademeupet',
    {
      method: 'POST',
      body: JSON.stringify(petEncontrado),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  ).then(response => console.log("criou!"))
}

