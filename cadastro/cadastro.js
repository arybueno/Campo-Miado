  import { createUserWithEmailAndPassword } 
    from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
  import { doc, setDoc }
    from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

  const auth = window.auth;
  const db = window.db;

  window.criarConta = async function () {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, senha);
      const user = cred.user;

      // salva nome, foto e pontos iniciais
      await setDoc(doc(db, "usuarios", user.uid), {
        nome: "/Campo-Miado/img/gato.jpg",
        foto: "",
        pontos: 0
      });

      alert("Conta criada!");
      window.location.href = "Campo-Miado/perfil/perfil.html";

    } catch (e) {
      alert(e.message);
    }

  }




