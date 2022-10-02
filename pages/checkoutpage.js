import styles from "./../styles/CheckoutPage.module.css";
import CheckoutForm from "../components/CheckoutForm";
import CartContext from "../components/CartContext";
import CartItem from "./../components/CartItem";
import { useContext } from "react";
const CheckoutPage = () => {
  const { shoppingCart } = useContext(CartContext);
  return (
    <div className={`${styles.checkoutPageContainer} flexCent`}>
      <div className={`${styles.checkoutLeft} half pageLeft flexCent`}>
        <CheckoutForm />
      </div>
      <div className={`${styles.checkoutRight} half pageRight flexCent`}>
        <div className={`${styles.cartEnclosure} flexCentCol`}>
          {shoppingCart.map((dish, index) => {
            return <CartItem key={`${dish.name}-${index}`} dish={dish} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
