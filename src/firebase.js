import firebase from 'firebase'
import 'firebase/firestore'
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDjm5TXB1YhpiUqEkXcdQCiCSdTc8rK8EA",
    authDomain: "reptracker-7c1cd.firebaseapp.com",
    databaseURL: "https://reptracker-7c1cd.firebaseio.com",
    projectId: "reptracker-7c1cd",
    storageBucket: "reptracker-7c1cd.appspot.com",
    messagingSenderId: "92508785638",
    appId: "1:92508785638:web:4b013dc95b1050c54ba427",
    measurementId: "G-KH49HW7NNP"
  };

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore()
export const storage = firebase.storage()
export const auth = firebase.auth()

export const login = (email, password, history) => {
    auth
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(function() {
      return auth.signInWithEmailAndPassword(email.value, password.value)
      .then(() => {
        history.push("/admin/visit");
      })
      .catch((error) => {
        console.log(error);
      })
    });
}

// export default {
//   firebase, firestore, auth, login
// }