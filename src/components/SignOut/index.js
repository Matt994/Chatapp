import React from "react";
import firebase from "firebase/compat/app";


function SignOut() {

    const auth = firebase.auth();

    return auth.currentUser && (
  
      <button onClick={() => auth.signOut()}>Sign out</button>
    )
  }

  export default SignOut;