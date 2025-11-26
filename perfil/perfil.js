  import { onAuthStateChanged, signOut } 
    from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
  import { doc, setDoc, getDoc }
    from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

  const auth = window.auth;
  const db = window.db;

  let user;

  onAuthStateChanged(auth, async (u) => {
    if (!u) {
      window.location.href = "login.html";
      return;
    }

    user = u;
    document.getElementById("userEmail").innerText = "Email: " + u.email;

    const docRef = doc(db, "usuarios", user.uid);
    const dados = await getDoc(docRef);

    if (dados.exists()) {
      document.getElementById("nome").value = dados.data().nome;
      if (dados.data().foto) {
        document.getElementById("fotoPreview").src = dados.data().foto;
      }
    }
  });



  // CLOUDINARY UPLOAD
  
  window.salvarPerfil = async function () {
    const nome = document.getElementById("nome").value;
    const foto = document.getElementById("foto").files[0];

    let urlFoto = null;

    if (foto) {
      const cloudName = "dahpo4gdd";
      const uploadPreset = "perfil";

      const formData = new FormData();
      formData.append("file", foto);
      formData.append("upload_preset", uploadPreset);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      urlFoto = data.secure_url;
    }

    const dadosParaSalvar = { nome };

    if (urlFoto) {
      dadosParaSalvar.foto = urlFoto;
    }

    await setDoc(doc(db, "usuarios", user.uid), dadosParaSalvar, { merge: true });

    alert("Perfil salvo!");
  }


  window.logout = function () {
    signOut(auth).then(() => {
      window.location.href = "/login/login.html";
    });
  }