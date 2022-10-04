import { useState, useEffect, useContext } from "react";
import CartContext from "./CartContext";
import styles from "./../styles/OrderBox.module.css";
import OrderItem from "./OrderItem";
const OrderBox = () => {
  const { currentUser } = useContext(CartContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const pullOrders = async () => {
      const response = await fetch("/api/order/get-order-history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: currentUser.name,
        }),
      });
      const data = await response.json();
      setOrders(data);
    };
    pullOrders();
  }, []);
  if (!currentUser || !orders) {
    return null;
  }
  return (
    <div className={`${styles.orderContainer} flexCentCol`}>
      {orders.map((item, index) => {
        return (
          <OrderItem key={`${item.restaurant.name}-${index}`} order={item} />
        );
      })}
    </div>
  );
};

export default OrderBox;
