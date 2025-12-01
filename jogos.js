const jogos = [
  {
    nome: "Kitties Wepper",
    capa: "Campo-Miado/img/gatinho.jfif",
    link: "Campo-Miado/kittieswepper/wepper.html"
  }
];

const lista = document.getElementById("listaJogos");

jogos.forEach(jogo => {
  const card = document.createElement("a");
  card.classList.add("card-jogo");
  card.href = jogo.link;

  card.innerHTML = `
    <img src="${jogo.capa}">
    <h3>${jogo.nome}</h3>
  `;

  lista.appendChild(card);
});






