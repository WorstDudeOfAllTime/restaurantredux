import styles from "./../styles/OrderItem.module.css";
const OrderItem = ({ order }) => {
  let time = {
    seconds: order.date.seconds,
    nanoseconds: order.date.nanoseconds,
  };

  let newTime = new Date(time.seconds * 1000 + time.nanoseconds / 1000000);
  const theDate = newTime.toDateString();
  const theTime = newTime.toLocaleTimeString();
  if (!order) return null;
  return (
    <div className={`${styles.orderItemContainer} flexCent`}>
      <div className={`${styles.dateBox} flexCentCol`}>
        <h4>{theTime}</h4>
        <h4>{theDate}</h4>
      </div>
      <div className={`${styles.restaurantBox} flexCentCol`}>
        <h2>Restaurant: {order.restaurant.name}</h2>
        <div className={`${styles.orderItems} flexCentCol`}>
          <div>
            {order.dishes.map((item) => {
              <h5>{item.name}</h5>;
            })}
          </div>
        </div>
      </div>

      <h3>Amount: {order.amount}</h3>
    </div>
  );
};

export default OrderItem;
