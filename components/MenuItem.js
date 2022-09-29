import styles from "./../styles/MenuItem.module.css";
import React, { useEffect, useContext } from "react";
import CartContext from "./CartContext";
const MenuItem = ({ dish }) => {
  const { shoppingCart, setShoppingCart, checkoutPrice, setCheckoutPrice } =
    useContext(CartContext);
  return (
    <div
      className={`${styles.menuItemContainer} flexCent`}
      onClick={() => {
        setCheckoutPrice(checkoutPrice + parseFloat(dish.price));
        if (
          shoppingCart.length === 0 ||
          !shoppingCart.some((item) => item.name === dish.name)
        ) {
          setShoppingCart([...shoppingCart, { ...dish, quantity: 1 }]);
        } else {
          let newCart = shoppingCart;
          newCart.map((item, index) => {
            if (item.name === dish.name) {
              newCart[index] = { ...item, quantity: item.quantity + 1 };
            }
            console.log(shoppingCart);
            return setShoppingCart(newCart);
          });
        }
        console.log(shoppingCart);
      }}
    >
      <div className={`${styles.menuItemLeft} half flexCentCol`}>
        <h3 style={{ marginLeft: "10px" }}>{dish.name}</h3>
        <p style={{ marginLeft: "10px" }}>{dish.description}</p>
      </div>
      <div className={`${styles.menuItemRight} half flexCent`}>
        <div
          className={`${styles.foodImage} flexCent`}
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1299&q=80)`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "100%",
            width: "150px",
          }}
        >
          <div className={`${styles.priceBox} flexCent`}>
            ${parseFloat(dish.price).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
