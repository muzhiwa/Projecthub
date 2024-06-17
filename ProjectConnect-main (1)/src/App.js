import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import NewButton from "./components/Button"; 
import SignUp from "./components/SignUp";
import ProjectHub from "./components/ProjectHub"; 
import ProjCard from "./components/ProjCard";
import AdvicePage from "./components/AdvicePg";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createContext, useEffect, useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Image } from "@nextui-org/react";
import projhome from "./images/projhome.png";


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
const app = initializeApp(firebaseConfig);
console.log(app);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();

export default function App() {
  const AuthContext = createContext();
  const [currentUser, setUser] = useState()
  useEffect(() => {
    console.log(currentUser)
    if(!localStorage.getItem("user"))
    {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        setUser(result.user)
        console.log(result.user)
        localStorage.setItem("user", result.user.email);

        // IdP data available using getAdditionalUserInfo(result)
       
        
      }).catch((error) => {
        // Handle Errors here. 
        console.log(error)
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
    }
  }, [])

  return (
    <Router>
      <NextUIProvider>
        <AuthContext.Provider value={currentUser}>
          <Routes>
            <Route path="/login" element={<SignUp />} />
            <Route path="/ProjectHub" element={<ProjectHub />} />
            <Route path="/AdvicePage" element={<AdvicePage />} />
            <Route
              path="/"
              element={
                <div className="background-container">
                  <div className="content">
                    <NewButton text="Go to Project Hub" path="/ProjectHub" />
                   
                  </div>
                </div>
              }
            />
          </Routes>
        </AuthContext.Provider>
      </NextUIProvider>
    </Router>
  );
}
