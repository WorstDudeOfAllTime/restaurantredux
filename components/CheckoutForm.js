import styles from "./../styles/CheckoutForm.module.css";
import { useContext, useState } from "react";
import CartContext from "./CartContext";
const CheckoutForm = () => {
  const {
    currentUser,
    currentRestaurant,
    checkoutPrice,
    shoppingCart,
    setShoppingCart,
  } = useContext(CartContext);
  const [cardName, setCardName] = useState("");
  const [theCardNumber, setTheCardNumber] = useState("");
  const [theState, setTheState] = useState("");
  const [theCity, setTheCity] = useState("");
  const [theAddress, setTheAddress] = useState("");
  const [theZipcode, setTheZipcode] = useState("");
  const [theCVC, setTheCVC] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const submitPayment = async () => {
    try {
      setShoppingCart(shoppingCart.filter((item) => item.quantity != 0));
      fetch("/api/order/submit-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: cardName,
          email: currentUser.name,
          dishes: shoppingCart,
          theAddress,
          theCity,
          theState,
          theZipcode,
          restaurant: currentRestaurant,
          theCVC,
          amount: checkoutPrice,
        }),
      });
      setSuccessMessage("Your order will be ready shortly!");
      setCardName("");
      setTheCardNumber("");
      setTheState("");
      setTheCity("");
      setTheAddress("");
      setTheZipcode("");
      setTheCVC("");
      setShoppingCart([]);
    } catch (err) {
      console.log(err);
    }
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
            value={cardName}
            id="cardName"
            type="text"
            placeholder="Name on Card"
            onChange={(e) => {
              setCardName(e.target.value);
            }}
          ></input>
          <input
            className={styles.paymentInput}
            value={theAddress}
            id="address"
            type="text"
            placeholder="Address"
            onChange={(e) => {
              setTheAddress(e.target.value);
            }}
          ></input>
          <input
            className={styles.paymentInput}
            value={theCity}
            id="city"
            type="text"
            placeholder="City"
            onChange={(e) => {
              setTheCity(e.target.value);
            }}
          ></input>
          <input
            className={styles.paymentInput}
            value={theState}
            id="state"
            type="text"
            placeholder="State"
            onChange={(e) => {
              setTheState(e.target.value);
            }}
          ></input>
          <input
            className={styles.paymentInput}
            value={theZipcode}
            id="zipcode"
            type="text"
            placeholder="Zipcode"
            onChange={(e) => {
              setTheZipcode(e.target.value);
            }}
            maxLength="5"
          ></input>
          <input
            className={styles.paymentInput}
            value={theCardNumber}
            id="cardNumber"
            type="text"
            placeholder="Card Number"
            onChange={(e) => {
              setTheCardNumber(e.target.value);
            }}
          ></input>
          <input
            className={styles.paymentInput}
            value={theCVC}
            id="CVC"
            type="text"
            placeholder="CVC"
            onChange={(e) => {
              setTheCVC(e.target.value);
            }}
            maxLength="4"
          ></input>
        </div>
        {currentUser ? (
          <button className={styles.submitBtn}>Submit Order.</button>
        ) : (
          <button className={styles.submitBtn} disabled>
            Submit Order.
          </button>
        )}
      </form>
      <div>
        {successMessage ? (
          <h1 style={{ color: "black" }}>{successMessage}</h1>
        ) : null}
      </div>
    </div>
  );
};

export default CheckoutForm;
