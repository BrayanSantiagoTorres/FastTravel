import firebase from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyC7x2hvd7zN-rBeybW86JKLaPj78RTerD0",
    authDomain: "fasttrav-9223e.firebaseapp.com",
    projectId: "fasttrav-9223e",
    storageBucket: "fasttrav-9223e.appspot.com",
    messagingSenderId: "1022649307866",
    appId: "1:1022649307866:web:9dc1cfe8d53cd8c84b8be3"
  }

export const firebaseApp = firebase.initializeApp(firebaseConfig)