import styles from "./../styles/Cart.module.css";
import CartItem from "./CartItem";
import Link from "next/link";
import React, { useContext } from "react";
import CartContext from "./CartContext";
const Cart = () => {
  const { checkoutPrice, shoppingCart, showCart, setShowCart } =
    useContext(CartContext);
  return (
    <div
      style={{ display: showCart ? "flex" : "none" }}
      className={`${styles.cartContainer} flexCentCol fadeIn`}
    >
      <div className={`${styles.cartHeader} flexCent`}>
        <h2>Cart</h2>
        <div className={`${styles.balance} flexCent`}>
          <h3>Your Total: ${Math.abs(checkoutPrice.toFixed(2))}</h3>
        </div>
      </div>
      <div className={`${styles.cart} flexCentCol`}>
        {shoppingCart
          .filter((merch) => merch.quantity != 0)
          .map((item, index) => {
            return <CartItem key={`${item.name}-${index}`} dish={item} />;
          })}
      </div>

      <div className={`${styles.checkoutBox} flexCent`}>
        <Link href="/checkoutpage">
          <button
            className={`${styles.checkoutBtn}`}
            onClick={() => {
              setShowCart(!showCart);
            }}
          >
            Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
