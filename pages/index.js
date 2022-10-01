import styles from "./../styles/HomePage.module.css";
import Image from "next/image";
import React, { useContext, useState } from "react";
import OverlayForm from "./../components/OverlayForm";
import CartContext from "./../components/CartContext";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyCI4QNqoU5I_D8iBl43b-F3DXLeL1yw_D4",
  authDomain: "restauranti-30e36.firebaseapp.com",
  projectId: "restauranti-30e36",
  storageBucket: "restauranti-30e36.appspot.com",
  messagingSenderId: "986340391104",
  appId: "1:986340391104:web:29f171d3ad12f50c8fd525",
};
const firebaseApp = initializeApp(firebaseConfig);
const imageSrc =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80";

const HomePage = () => {
  const postData = async (email, password) => {
    fetch("http://localhost:5000/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
  };
  const loginUser = async (email, password) => {
    try {
      const thisResponse = await fetch("http://localhost:5000/loginUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });
      const ressy = await thisResponse.json();
      setCurrentUser({ name: email, password: password });
    } catch (err) {
      console.log("The username or password were incorrect");
    }
  };
  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(email, password);
  };
  const googleAuth = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log(user);
        setCurrentUser({ name: user.reloadUserInfo.email });
        setLoginOverlay(false);
      })
      .catch((error) => {
        console.log(error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorMessage);
        // ...
      });
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    currentUser,
    setCurrentUser,
    loginOverlay,
    setLoginOverlay,
    signupOverlay,
    setSignupOverlay,
  } = useContext(CartContext);
  return (
    <div className={`${styles.homePageContainer} flexCent fadeIn`}>
      <div className={`pageLeft half flexCent`}>
        <div className={styles.imageFrame}>
          <Image className={styles.image} src={imageSrc} layout="fill" />
        </div>
      </div>
      <div className={`pageRight half flexCentCol`}>
        <div className={`${styles.textFrame} flexCentCol`}>
          <h1 style={{ textAlign: "left" }}>You like food, We got food. </h1>
          <h3 style={{ textAlign: "center" }}>
            Well, we don't directly sell food but we got a whole list of other
            people that do sell food and you're welcome to peruse it we'll just
            take a little off the top.
          </h3>
          <div className={`${styles.btnContainer} flexCent`}>
            {" "}
            <button
              className={styles.getStarted}
              onClick={(e) => {
                e.preventDefault();
                setLoginOverlay(true);
              }}
            >
              Sign In.
            </button>
            <button
              className={`${styles.getStarted}`}
              onClick={(e) => {
                e.preventDefault();
                setSignupOverlay(true);
              }}
            >
              Sign Up.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
