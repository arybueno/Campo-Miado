import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBY4R3JVtk6BfHpmfVDVos_zA2WuGfYVIo",
  authDomain: "projeto-behringh.firebaseapp.com",
  projectId: "projeto-behringh",
  storageBucket: "projeto-behringh.appspot.com",
  messagingSenderId: "367934272522",
  appId: "1:367934272522:web:ab95d0670c205fa5671bf3"
};

const app = initializeApp(firebaseConfig);
window.auth = getAuth(app);
window.db = getFirestore(app);
window.storage = getStorage(app);
