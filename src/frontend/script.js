// //Post Cadastro


// const btnCadastro = document.querySelector('#btnCadastro')

// btnCadastro.addEventListener("click", (fazerCadastro) =>{
//   fazerCadastro.preventDefault()
  

//   const nome = document.querySelector("#nomeCadastro").value
//   const telefone = document.querySelector("#telefoneCadastro").value
//   const email = document.querySelector("#emailCadastro").value
//   const senha = document.querySelector("#senhaCadastro").value
//   const usuario= {nome, telefone, email, senha}
 
// fetch('http://localhost:3000/usuarios',
// {
//   method: 'POST',
//   body: JSON.stringify(usuario),
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })
// .then((response) => {
//   return response.json();
// })
// .then((cadastro) => {
//     console.log(cadastro)
    
//Post login

const btnLogin = document.querySelector('#btn-login')

btnLogin.addEventListener("click", (fazerLogin) =>{
  fazerLogin.preventDefault()

  const email = document.querySelector("#emailUsuario").value
  const senha = document.querySelector("#senhaUsuario").value
  const login= {email, senha}

 
fetch('http://localhost:3000/usuarios/login',
{
  method: 'POST',
  body: JSON.stringify(login),
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then((response) => {
    return response.json();
  })
  .then((usuarioLogin) => {
      console.log(usuarioLogin)
      usuarioLogin.forEach(logar=>{
      
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
  const data = document.querySelector("#calendario2").value
  const local = document.querySelector("#mapa").value
  const petCadastrado = {
    nome, especie, raca, genero, porte, cor, outrasCaracteristicas, foto, data, local, porte
  }

fetch('http://localhost:3000/usuarios/adicionar-pet/',
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
      console.log(data)

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
      texto.innerHTML = ('O Pet foi cadastrado com sucesso em nosso banco de dados!')
      row.appendChild(texto)

      const cardPet = document.createElement('div');
      cardPet.setAttribute('class', 'col s12 m7');
      row.appendChild('cardBody')

      const card = document.createElement('div')
      card.setAttribute('class', 'card horizontal')
      card.innerHTML= `
      <div class="card-image">
       
      </div>
      <div class="card-stacked">
        <div class="card-content">
          <p>Nome: ${pet.nome} 
          Especie: ${pet.espécie},
    Gênero: ${pet.genero},
    Porte:${pet.porte}
    Cor do pêlo: ${pet.pelo},
    Outras Caracteristicas: ${pet.outrasCaracteristicas},
    Visto por último na data: ${pet.data},
    Visto por último no local:${pet.local}
  </p>
        </div>`

        cardPet.appendChild('card')
    })
  })
  .catch((erro) => {
    console.log(erro)
  })

})


    })
    .catch((erro) => {
      console.log(erro)
    })
 


// POST

})


})


