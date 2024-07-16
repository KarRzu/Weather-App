import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import {
  getFirestore,
  setDoc,
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

function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(function () {
    messageDiv.style.opacity = 0;
  }, 5000);
}

const signIn = document.getElementById("submitSignIn");

signIn.addEventListener("click", (event) => {
  event.preventDefault();
  const email = document.getElementById("signInEmail").value;
  const password = document.getElementById("signInPassword").value;

  const auth = getAuth();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      showMessage("Login in successfully", "signInMessage");
      const user = userCredential.user;
      localStorage.setItem("loggedInUserId", user.uid);
      window.location.href = "../index.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      if (
        errorCode == "auth/wrong-password" ||
        errorCode == "auth/user-not-found"
      ) {
        showMessage("Incorrect Email or Password", "signInMessage");
      } else {
        showMessage("Unable to login", "signInMessage");
      }
    });
});

const logOut = document.getElementById("logOut");

logOut.addEventListener("click", (event) => {
  event.preventDefault();

  const auth = getAuth();

  signOut(auth)
    .then(() => {
      showMessage("Logged out successfully", "signInMessage");
      localStorage.removeItem("loggedInUserId");
      window.location.href = "../sign-in/signIn.html";
    })
    .catch((error) => {
      showMessage("Unable to logout", "signInMessage");
    });
});
