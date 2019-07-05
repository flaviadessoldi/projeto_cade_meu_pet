const container = document.querySelector('#cadastroPet')

const botao = document.querySelector('#botaoPet')

botao.addEventListener("click", (criarPet) =>{
  criarPet.preventDefault()

  const nome = document.querySelector("#nomePet").value
  const especie = document.querySelector("#especiePet").value
  const raca = document.querySelector("#racaPet").value
  const genero = document.querySelector("#generoPet").value
  const porte = document.querySelector("#portePet").value
  const cor = document.querySelector("#corPet").value
  const outrasCaracteristicas = document.querySelector("#caracteristicasPet").value
  const foto = document.querySelector("#fotoPet").value
  const dataPerdeu = document.querySelector("#calendario2").value
  const localPerdeu = document.querySelector("#mapa").value
  const petCadastrado = {
    nome, especie, raca, genero, idade, cor, outrasCaracteristicas, foto, dataPerdeu, localPerdeu, porte
  }

fetch('http://localhost:3000/usuarios/adicionar-pet/:usuarioId',
{
  method: 'POST',
  body: JSON.stringify(petCadastrado),
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach(pet => {
      console.log(pet)

      const cardBody = document.createElement('div');
      cardBody.setAttribute('class', 'card-body');
      container.appendChild('cardBody')

      const coluna = document.createElement('div')
      coluna.setAttribute('class', 'col s12 m8 offset-m2 l6 offset-l3');
      cardBody.appendChild('coluna')

      const row = document.createElement('div')
      row.setAttribute('class', 'row valign-wrapper');
      coluna.appendChild('row')

      const banner = document.createElement('div')
      banner.setAttribute('class', 'col s2');
      row.appendChild('banner')

      const imagem = document.createElement('img')
      imagem.setAttribute('src', 'img/Prancheta 1 cópia 6.jpg')
      banner.appendChild('imagem')

      const texto = document.createElement('h4')
      texto.setAttribute('class', 'card-text center')
      texto.innerHTML = ('O Pet foi cadastrado em nosso banco de dados!')
      row.appendChild(texto)

    })
  })
  .catch((erro) => {
    console.log(erro)
  })

})



