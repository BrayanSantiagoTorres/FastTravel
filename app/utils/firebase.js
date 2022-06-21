import firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyAGhs8A-Ok1dHAIY3ctalg3oMkdCtUcjhk",
  authDomain: "proyecto-fasttravel.firebaseapp.com",
  projectId: "proyecto-fasttravel",
  storageBucket: "proyecto-fasttravel.appspot.com",
  messagingSenderId: "812437809906",
  appId: "1:812437809906:web:d82588717eafc5746ebe6b"
}

export const firebaseApp = firebase.initializeApp(firebaseConfig)