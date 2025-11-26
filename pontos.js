import { doc, getDoc, updateDoc }
  from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const db = window.db;

// Adiciona pontos ao usuário
export async function adicionarPontos(uid, quantidade) {
  const ref = doc(db, "usuarios", uid);
  const dados = await getDoc(ref);
  
  let pontos = 0;
  if (dados.exists() && dados.data().pontos) {
    pontos = dados.data().pontos;
  }

  await updateDoc(ref, { pontos: pontos + quantidade });
}

// Remove pontos
export async function removerPontos(uid, quantidade) {
  const ref = doc(db, "usuarios", uid);
  const dados = await getDoc(ref);

  let pontos = 0;
  if (dados.exists() && dados.data().pontos) {
    pontos = dados.data().pontos;
  }

  await updateDoc(ref, { pontos: Math.max(0, pontos - quantidade) });
}

// Define valor
export async function setarPontos(uid, quantidade) {
  const ref = doc(db, "usuarios", uid);
  await updateDoc(ref, { pontos: quantidade });
}

// Pega pontos do usuário
export async function pegarPontos(uid) {
  const ref = doc(db, "usuarios", uid);
  const dados = await getDoc(ref);

  if (dados.exists()) {
    return dados.data().pontos || 0;
  }

  return 0;
}
