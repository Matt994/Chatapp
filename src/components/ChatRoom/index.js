import React, { useState, useRef } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import ChatMessage from "../ChatMessage";



function ChatRoom() {

    const auth = firebase.auth();
    const firestore = firebase.firestore();

    const dummy = useRef();
  
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(50);
  
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

      dummy.current.scrollIntoView({ behavior: 'smooth' });
    }

    return (
      <>
        <main>
          {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

          <div ref={dummy}></div>

        </main>

        <form onSubmit={sendMessage}>

          <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type here"></input>

          <button type='submit'><i class="fas fa-paper-plane"/></button>
        </form>
      </>
    )
  }

  export default ChatRoom;