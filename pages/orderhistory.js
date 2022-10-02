const OrderHistory = ({ allOrders }) => {
  console.log(allOrders);
  return <div></div>;
};

export async function getServerSideProps() {
  let response = await fetch("api/order/order-history");
  let data = await response.json();
  return { props: { allOrders: data } };
}
export default OrderHistory;
