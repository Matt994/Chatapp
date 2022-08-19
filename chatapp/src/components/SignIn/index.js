import React from "react";
import firebase from "firebase/compat/app";


function SignIn() {
    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    }
  
    return (
      <button onClick={signInWithGoogle}>Sign In</button>
    )
  }

  export default SignIn;