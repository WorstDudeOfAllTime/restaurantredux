import "../styles/globals.css";
import Layout from "./../components/Layout";
import CartContext from "../components/CartContext";
import React, { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [checkoutPrice, setCheckoutPrice] = useState(0);
  const [currentRestaurant, setCurrentRestaurant] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loginOverlay, setLoginOverlay] = useState(false);
  const [signupOverlay, setSignupOverlay] = useState(false);

  return (
    <CartContext.Provider
      value={{
        shoppingCart,
        setShoppingCart,
        setCheckoutPrice,
        checkoutPrice,
        currentRestaurant,
        setCurrentRestaurant,
        showCart,
        setShowCart,
        currentUser,
        setCurrentUser,
        loginOverlay,
        setLoginOverlay,
        signupOverlay,
        setSignupOverlay,
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CartContext.Provider>
  );
}

export default MyApp;
