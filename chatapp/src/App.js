import './App.css';
import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
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


  function SignIn() {
    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    }
  
    return (
      <button onClick={signInWithGoogle}>Sign In</button>
    )
  }
  
  function SignOut() {
    return auth.currentUser && (
  
      <button onClick={() => auth.signOut()}>Sign out</button>
    )
  }


  function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'recieved';
    
    return (
      <div className={`message ${messageClass}`}>
        <img sec={photoURL} />
        <p>{text}</p>
      </div>
    )
  }
  
  function ChatRoom() {
  
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(25);
  
    const [messages] = useCollectionData(query, {idField: 'id'});

    const [formValue, setFormValue] = useState('');

    const sendMessage = async(e) => {
      e.preventDefault();

      const { uid, photoURL } = auth.currentUser;

      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL
      });
      setFormValue('');
    }

    return (
      <>
        <div>
          {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        </div>

        <form onSubmit={sendMessage}>

          <input value={formValue} onChange={(e) => setFormValue(e.target.value)}/>

          <button type='submit'>Send</button>
        </form>
      </>
    )
  }
  
  



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



export default App;
