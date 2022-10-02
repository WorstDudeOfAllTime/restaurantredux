const OrderHistory = ({allOrders}) => {
  console.log(allOrders)
  return(
    <div></div>
  )
}

export async function getServerSideProps(){
  let response = await fetch('http://localhost:5000/orderHistory');
  let data = await response.json();
  console.log(data);
  return {props: {allOrders: data}}
}
export default OrderHistory;