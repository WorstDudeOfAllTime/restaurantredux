import styles from "./../styles/NavBar.module.css";
import { useRouter } from "next/router";
import CartContext from "./CartContext";
import React, { useContext, useState } from "react";
import OverlayForm from "./OverlayForm";
import Image from "next/image";
import shoppingCart from "./img/shopping-cart.png";
const NavBar = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {
    currentUser,
    showCart,
    setShowCart,
    setLoginOverlay,
    setSignupOverlay,
    loginOverlay,
    signupOverlay,
  } = useContext(CartContext);
  const router = useRouter();
  return (
    <div className={`${styles.navBox} flexCent`}>
      <div className={`${styles.logoSide} flexCent`}>
        <div
          className={`${styles.loginOverlay} flexCentCol`}
          style={{ display: loginOverlay ? "flex" : "none" }}
        >
          <OverlayForm closeBoxFunction={setLoginOverlay}>
            <h3 style={{ textAlign: "center", color: "black", margin: "0" }}>
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
              onClick={() => {
                googleAuth();
              }}
            >
              {" "}
              Login with Google.
            </button>
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
        <h1 className={styles.logo} onClick={() => router.push("/")}>
          Worst Restaurant
        </h1>
        {currentUser ? (
          <h2>Hello, {currentUser.name}</h2>
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
              onClick={() => router.push("/orderHistory")}
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
