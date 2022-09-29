import React, { createContext } from "react";
const CartContext = createContext({
  shoppingCart: null,
  setShoppingCart: () => {},
  checkoutPrice: 0,
  setCheckoutPrice: () => {},
  currentRestaurant: null,
  setCurrentRestaurant: () => {},
  showCart: null,
  setShowCart: () => {},
  currentUser: null,
  setCurrentUser: () => {},
  loginOverlay: null,
  setLoginOverlay: () => {},
  signupOverlay: null,
  setSignupOverlay: () => {},
});
export default CartContext;
