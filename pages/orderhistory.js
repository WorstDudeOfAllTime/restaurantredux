import OrderBox from "../components/OrderBox";
import styles from "./../styles/OrderHistory.module.css";
const OrderHistory = () => {
  return (
    <div className={`${styles.orderHistoryContainer} flexCent`}>
      <OrderBox />
    </div>
  );
};

export default OrderHistory;
