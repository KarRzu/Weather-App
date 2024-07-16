import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import {
  getAuth,
  onAuthStatChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import {
  getFirestore,
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCnhDo67_Zp2SKj6Bt4cD5Lqent5C7a50M",
  authDomain: "weather-app-706f8.firebaseapp.com",
  projectId: "weather-app-706f8",
  storageBucket: "weather-app-706f8.appspot.com",
  messagingSenderId: "596319906783",
  appId: "1:596319906783:web:5b4f4243153c19b1acf26a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

onAuthStatChanged(auth, (user) => {
  const loggedInUserId = localStorage.getItem("loggedInUserId");
  if (loggedInUserId) {
    const docRef = doc(db, "users", loggedInUserId);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists) {
          const userData = docSnap.data();
          document.getElementById("loggedUserEmail").innerText = userData.email;
          document.getElementById("loggedUserPassword").innerText =
            userData.password;
        } else {
          console.log("no document found matching id");
        }
      })
      .catch((error) => {
        console.log("Error getting document");
      });
  } else {
    console.log("User Id not Found in Local storage");
  }
});
