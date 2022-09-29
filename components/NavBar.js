import styles from "./../styles/NavBar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import CartContext from "./CartContext";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import shoppingCart from "./shopping-cart.png";
const NavBar = () => {
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
  return (
    <div className={`${styles.navBox} flexCent`}>
      <div className={`${styles.logoSide} flexCent`}>
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
              className={styles.navItem}
              onClick={() => router.push("/about")}
            >
              About.
            </li>
            <li
              className={styles.navItem}
              onClick={() => router.push("/Contact.")}
            >
              Contact.
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
