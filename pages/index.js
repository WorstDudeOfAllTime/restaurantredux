import styles from "./../styles/HomePage.module.css";
import Image from "next/image";
import React, { useContext } from "react";
import CartContext from "./../components/CartContext";
const imageSrc =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80";

const HomePage = () => {
  const {
    setLoginOverlay,
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
            Well, we don&apos;t directly sell food but we got a whole list of
            other people that do sell food and you&apos;re welcome to peruse it
            we&apos;ll just take a little off the top.
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
