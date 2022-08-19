import './App.css';
import React, { useState, useRef } from "react";
import firebase from "firebase/compat/app";
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from './components/SignIn';
import ChatRoom from './components/ChatRoom/index';
import SignOut from './components/SignOut/index';


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
      <h1>ChatApp</h1>
      <SignOut />
     </header>

     <section>
      {user ? <ChatRoom /> : <SignIn />}
     </section>
    </div>
  );
}



export default App;
