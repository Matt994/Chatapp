import './App.css';
import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";


firebase.initializeApp({
  apiKey: "AIzaSyDYzzumQxvJV2EMQznQOeiSOY01bgoDwsk",
  authDomain: "chatapp-10e6a.firebaseapp.com",
  projectId: "chatapp-10e6a",
  storageBucket: "chatapp-10e6a.appspot.com",
  messagingSenderId: "99154268285",
  appId: "1:99154268285:web:299b71c30554c9c6cca114",
  measurementId: "G-8R86NXJY0H"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {


  const [user] = useAuthState(auth);

  return (
    <div className="App">
     <header>

     </header>

     <section>
      {user ? <ChatRoom /> : <SignIn />}
     </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <button onClick={useSignInWithGoogle}>Sign In</button>
  )
}

function ChatRoom() {

}

export default App;
