import styles from "./../styles/CartItem.module.css";
import trash from "./delete.png";
import plus from "./plus.png";
import minus from "./minus.png";
import Image from "next/image";
import CartContext from "./CartContext";
import React, { useContext } from "react";
const CartItem = ({ dish }) => {
  const { shoppingCart, setShoppingCart, setCheckoutPrice, checkoutPrice } =
    useContext(CartContext);
  return (
    <div className={`${styles.cartItemContainer} flexCent`}>
      <div className={`${styles.nameInfo} flexCentCol`}>
        <h3 style={{ margin: "0" }}>{dish.name}</h3>
        <h5 style={{ margin: "0" }}>${parseFloat(dish.price).toFixed(2)}</h5>
      </div>
      <div className={`${styles.quantity} flexCent`}>{dish.quantity}</div>
      <div className={`${styles.btnRow} flexCent`}>
        <Image
          className={`${styles.btnRowImage}`}
          src={minus}
          height={20}
          width={20}
          onClick={() => {
            let newCart = shoppingCart;
            newCart.map((item, index) => {
              if (item.name === dish.name && item.quantity > 0) {
                newCart[index] = { ...item, quantity: item.quantity - 1 };
                setCheckoutPrice((checkoutPrice) => {
                  return checkoutPrice - parseFloat(item.price);
                });
              }
              setShoppingCart(newCart);
              return;
            });
          }}
        />
        <Image
          className={`${styles.btnRowImage}`}
          src={plus}
          height={20}
          width={20}
          onClick={() => {
            let newCart = shoppingCart;
            newCart.map((item, index) => {
              if (item.name === dish.name) {
                newCart[index] = { ...item, quantity: item.quantity + 1 };
                setCheckoutPrice((checkoutPrice) => {
                  return checkoutPrice + parseFloat(item.price);
                });
              }
              setShoppingCart(newCart);
              return;
            });
          }}
        />
        <Image
          className={`${styles.btnRowImage}`}
          src={trash}
          height={20}
          width={20}
          onClick={() => {
            let newCart = shoppingCart.filter(
              (merch) => merch.name !== dish.name
            );
            setShoppingCart(newCart);
            setCheckoutPrice(
              checkoutPrice - parseFloat(dish.price) * dish.quantity
            );
          }}
        />
      </div>
    </div>
  );
};

export default CartItem;
