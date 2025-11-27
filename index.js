import { onAuthStateChanged } 
  from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { doc, getDoc }
  from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const auth = window.auth;
const db = window.db;

const botao = document.getElementById("botaoPerfil");
const nomeEl = document.getElementById("nomePerfil");
const fotoEl = document.getElementById("fotoPerfil");
const pontosEl = document.getElementById("pontosUsuario");


onAuthStateChanged(auth, async (user) => {
  if (user) {
    // Pega o documento do Firestore
    const docRef = doc(db, "usuarios", user.uid);
    const dados = await getDoc(docRef);

    let nome = "Perfil";
    let foto = "https://i.imgur.com/8QfH0kR.png"; // Ícone padrão

    if (dados.exists()) {
      if (dados.data().nome) nome = dados.data().nome;
      if (dados.data().foto) foto = dados.data().foto;
        if (dados.data().pontos !== undefined) {
    pontosEl.innerText = `Pontuação: ${dados.data().pontos}`;
  }
    }

    nomeEl.textContent = nome;
    fotoEl.src = foto;

    botao.onclick = () => window.location.href = "./perfil/perfil.html";

  } else {
    // Usuário NÃO logado 
    nomeEl.textContent = "Entrar";
    fotoEl.src = "/Campo-Miado/img/gato.jpg"; // ícone padrão
    botao.onclick = () => window.location.href = "./login/login.html";
    pontosEl.innerText = "Pontuação: 0";

  }
});




