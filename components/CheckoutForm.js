import styles from "./../styles/CheckoutForm.module.css";
import { useContext, useState } from "react";
import CartContext from "./CartContext";
const CheckoutForm = () => {
  const submitPayment = async () => {
    try {
      fetch("http://localhost:5000/sendPayment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: cardName,
          address,
          city,
          state,
          zipcode,
          restaurant: currentRestaurant,
        }),
      });
    } catch (err) {}
  };

  return (
    <div className={`${styles.checkoutFormContainer} flexCentCol`}>
      <form
        style={{
          color: "black",
          height: "60%",
          width: "60%",
          borderLeft: "3px solid black",
          borderRight: "3px solid black",
        }}
        onSubmit={(e) => {
          e.preventDefault();
          submitPayment();
        }}
        className={`flexCentCol`}
      >
        <h4 style={{ fontSize: "45px", margin: "15px" }}>Checkout.</h4>
        <div
          className={`${styles.flexInputs} flexCentCol`}
          style={{ height: "70%", width: "100%" }}
        >
          <input
            className={styles.paymentInput}
            id="cardName"
            type="text"
            placeholder="Name on Card"
          ></input>
          <input
            className={styles.paymentInput}
            id="address"
            type="text"
            placeholder="Address"
          ></input>
          <input
            className={styles.paymentInput}
            id="city"
            type="text"
            placeholder="City"
          ></input>
          <input
            className={styles.paymentInput}
            id="state"
            type="text"
            placeholder="State"
          ></input>
          <input
            className={styles.paymentInput}
            id="zipcode"
            type="text"
            placeholder="Zipcode"
          ></input>
          <input
            className={styles.paymentInput}
            id="cardNumber"
            type="text"
            placeholder="Card Number"
          ></input>
          <input
            className={styles.paymentInput}
            id="CVV"
            type="text"
            placeholder="CVV"
          ></input>
        </div>

        <button className={styles.submitBtn}>Submit Order.</button>
      </form>
    </div>
  );
};

export default CheckoutForm;
