import firebase from 'firebase'

var config = {
  apiKey: "AIzaSyDGUCyVFuRbte0vEInzCvo2QSgYv0wiqHo",
  authDomain: "diary-716c4.firebaseapp.com",
  databaseURL: "https://diary-716c4.firebaseio.com",
  projectId: "diary-716c4",
  storageBucket: "diary-716c4.appspot.com",
  messagingSenderId: "862157704419"
};
firebase.initializeApp(config);

const db = firebase.firestore()

export default db