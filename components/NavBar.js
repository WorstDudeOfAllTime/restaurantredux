import styles from "./../styles/NavBar.module.css";
import { useRouter } from "next/router";
import CartContext from "./CartContext";
import React, { useContext, useState } from "react";
import OverlayForm from "./OverlayForm";
import Image from "next/image";
import shoppingCart from "./img/shopping-cart.png";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { database, firebaseApp } from "./../utils/firebase";
const NavBar = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const provider = new GoogleAuthProvider();
  const {
    currentUser,
    setCurrentUser,
    showCart,
    setShowCart,
    setLoginOverlay,
    setSignupOverlay,
    loginOverlay,
    signupOverlay,
  } = useContext(CartContext);
  const router = useRouter();

  const createUser = async (email, password) => {
    try {
      fetch("/api/user/create-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const googleLogin = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log(credential);
        const token = credential.accessToken;
        const user = result.user;
        setCurrentUser({ name: user.email });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const loginUser = async (email, password) => {
    try {
      const thisResponse = await fetch("/api/user/login-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });
      const ressy = await thisResponse.json();
      setCurrentUser({ name: email });
    } catch (err) {
      console.log(err);
      console.log("The username or password were incorrect");
    }
  };
  const handleLogin = (e) => {
    e.preventDefault();
    loginUser(email, password);
  };
  const handleCreate = (e) => {
    e.preventDefault();
    createUser(email, password);
  };
  return (
    <div className={`${styles.navBox} flexCent`}>
      <div className={`${styles.logoSide} flexCent`}>
        <div
          className={`${styles.loginOverlay} flexCentCol fadeIn`}
          style={{ display: loginOverlay ? "flex" : "none" }}
        >
          <OverlayForm closeBoxFunction={setLoginOverlay}>
            <h3
              style={{
                textAlign: "center",
                color: "black",
                margin: "0",
                fontSize: "1.3vw",
              }}
            >
              Login to<br></br>your Account
            </h3>
            <form
              onSubmit={(e) => {
                handleLogin(e);
              }}
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
            <button
              id={styles.google}
              style={{
                border: "none",
                borderRadius: "3px",
              }}
              className={styles.submitBtn}
              onClick={(e) => {
                e.preventDefault();
                googleLogin();
              }}
            >
              {" "}
              Login with Google.
            </button>
          </OverlayForm>
        </div>
        <div
          className={`${styles.loginOverlay} flexCentCol fadeIn`}
          style={{ display: signupOverlay ? "flex" : "none" }}
        >
          <OverlayForm closeBoxFunction={setSignupOverlay}>
            <h3
              style={{
                textAlign: "center",
                color: "black",
                margin: "0",
                fontSize: "1.3vw",
              }}
            >
              Create an Account
            </h3>
            <form
              className={`${styles.formIn} flexCentCol`}
              onSubmit={(e) => {
                handleCreate(e);
              }}
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
        <h1 className={styles.logo} onClick={() => router.push("/")}>
          Worst Restaurant
        </h1>
        {currentUser ? (
          <h2 className={styles.userDisplay}>Hello, {currentUser.name}!</h2>
        ) : (
          <div>
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
        )}
      </div>
      <div className={styles.navSide}>
        <nav className="flexCent" style={{ width: "100%" }}>
          <ul
            id="navList"
            className="flexCent"
            style={{
              width: "100%",
              listStyle: "none",
              justifyContent: "space-around",
            }}
          >
            <li
              className={styles.navItem}
              onClick={() => router.push("/restaurants")}
            >
              Restaurants.
            </li>
            <li
              style={{ display: currentUser ? "flex" : "none" }}
              className={styles.navItem}
              onClick={() => router.push("/orderhistory")}
            >
              Order History
            </li>
          </ul>
          <Image
            className={styles.shoppingCart}
            src={shoppingCart}
            height={40}
            width={40}
            onClick={() => {
              setShowCart(!showCart);
            }}
          />
        </nav>
      </div>
    </div>
  );
};
export default NavBar;
