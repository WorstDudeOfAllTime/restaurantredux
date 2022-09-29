import styles from "./../styles/HomePage.module.css";
import Image from "next/image";
import React, { useContext, useState } from "react";
import OverlayForm from "./../components/OverlayForm";
import CartContext from "./../components/CartContext";
const imageSrc =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80";
const HomePage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createUser = async (email, password) => {
    console.log("Hello");
    fetch("http://localhost:5000/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
  };
  const handleCreate = (e) => {
    e.preventDefault();
    console.log("Got me");
    createUser(email, password);
  };

  const loginUser = async (email, password) => {
    fetch("http://localhost:5000/loginUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Fired");
    loginUser(email, password);
  };

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
      <div
        className={`${styles.loginOverlay} flexCentCol`}
        style={{ display: loginOverlay ? "flex" : "none" }}
      >
        <OverlayForm closeBoxFunction={setLoginOverlay}>
          <h3 style={{ textAlign: "center", color: "black", margin: "0" }}>
            Login to<br></br>your Account
          </h3>
          <form
            onSubmit={handleLogin(e)}
            className={`${styles.formIn} flexCentCol`}
          >
            <input
              value={email}
              className={styles.loginInput}
              type="email"
              placeholder="Enter Your Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
            <input
              value={password}
              className={styles.loginInput}
              type="password"
              placeholder="Enter Your Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
            <button className={styles.submitBtn}>Submit</button>
          </form>
        </OverlayForm>
      </div>
      <div
        className={`${styles.loginOverlay} flexCentCol`}
        style={{ display: signupOverlay ? "flex" : "none" }}
      >
        <OverlayForm closeBoxFunction={setSignupOverlay}>
          <h3 style={{ textAlign: "center", color: "black", margin: "0" }}>
            Create an Account
          </h3>
          <form className={`${styles.formIn} flexCentCol`}>
            <input
              className={styles.loginInput}
              type="text"
              placeholder="Enter Your Name"
            ></input>
            <input
              className={styles.loginInput}
              type="email"
              placeholder="Enter Your Email"
            ></input>
            <input
              className={styles.loginInput}
              type="password"
              placeholder="Enter Your Password"
            ></input>
            <button className={styles.submitBtn}>Submit</button>
          </form>
        </OverlayForm>
      </div>
      <div className={`pageLeft half flexCent`}>
        <div className={styles.imageFrame}>
          <Image className={styles.image} src={imageSrc} layout="fill" />
        </div>
      </div>
      <div className={`pageRight half flexCentCol`}>
        <div className="signInBox">
          <a
            style={{ margin: "0px 10px" }}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setLoginOverlay(true);
            }}
          >
            Sign In.
          </a>
          <a
            style={{ margin: "0px 10px" }}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setSignupOverlay(true);
            }}
          >
            Sign Up.
          </a>
        </div>
        <div className={`${styles.textFrame} flexCentCol`}>
          <h1 style={{ textAlign: "left" }}>You like food, We got food. </h1>
          <h3 style={{ textAlign: "center" }}>
            Well, we don't directly sell food but we got a whole list of other
            people that do sell food and you're welcome to peruse it we'll just
            take a little off the top.
          </h3>
          <button className={styles.getStarted}>Get Started.</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
