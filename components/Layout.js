import NavBar from "./NavBar";
import styles from "./../styles/Layout.module.css";
import { useContext } from "react";
import CartContext from "./CartContext";
import Cart from "./Cart";
const Layout = ({ children }) => {
  const { showCart } = useContext(CartContext);
  return (
    <div className={`${styles.layoutContainer} ${styles.flexCentCol}`}>
      <NavBar />
      <div
        className="fadeIn"
        style={{
          position: "absolute",
          right: "50px",
          top: "100px",
          height: "auto",
          minHeight: "400px",
          width: "auto",
          minWidth: "300px",
          display: showCart ? "flex" : "none",
        }}
      >
        <Cart />
      </div>
      <div className={`${styles.contentContainer} ${styles.flexCent}`}>
        {children}
      </div>
    </div>
  );
};
export default Layout;
