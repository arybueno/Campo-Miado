  import { signInWithEmailAndPassword }
    from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

  window.login = function () {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    signInWithEmailAndPassword(window.auth, email, senha)
      .then(() => {
        alert("Logado!");
        window.location.href = "/perfil/perfil.html";
      })
      .catch(e => alert(e.message));
  }