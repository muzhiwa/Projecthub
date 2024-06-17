import React from "react";
import { Input } from "@nextui-org/react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { majors } from "../data/majors";
import { futureGoals } from "../data/futureGoals";
import Button from "./Button";
import { Link } from "react-router-dom"; 
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA4VG8k0mCLH_QfvXh-VgpG99cvQ9OxC3U",
  authDomain: "project-connect-fd448.firebaseapp.com",
  projectId: "project-connect-fd448",
  storageBucket: "project-connect-fd448.appspot.com",
  messagingSenderId: "17840502960",
  appId: "1:17840502960:web:d879c7173bbc7475cae375",
  measurementId: "G-4K72Q8CJMJ"
};

// Initialize Firebase


export default function SignUp() {
  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <Input
        isRequired
        type="email"
        label="Email"
        defaultValue=""
        className="input-field"
      />
      <Input
        isRequired
        type="password"
        label="Password"
        defaultValue=""
        className="input-field"
      />

      
      <Button text="Complete Log In" path="/ProjectHub"/>
     

    </div>
  );
}
