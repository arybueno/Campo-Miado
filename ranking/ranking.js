import { collection, getDocs, query, orderBy }
  from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const db = window.db;
const lista = document.getElementById("listaRanking");

async function carregarRanking() {
  const q = query(collection(db, "usuarios"), orderBy("pontos", "desc"));
  const snap = await getDocs(q);

  snap.forEach(doc => {
    const dados = doc.data();

    const nome = dados.nome || "Sem nome";
    const foto = dados.foto || "https://i.imgur.com/8QfH0kR.png";
    const pontos = dados.pontos || 0;

    const div = document.createElement("div");
    div.classList.add("usuario");

    div.innerHTML = `
      <img src="${foto}">
      <span>${nome}</span>
      <span class="pontos">${pontos} pts</span>
    `;

    lista.appendChild(div);
  });
}

carregarRanking();
