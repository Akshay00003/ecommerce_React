import axios from "axios";
import React, { useEffect, useState } from "react";
import OrderProductsDetails from "./OrderProductsDetails";

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [cartId, setCartId] = useState("");
  useEffect(() => {
    const getOrders = async () => {
      const response = await axios("http://localhost:5555/order");
      setOrders(response.data);
      console.log(response.data);
    };
    getOrders();
  }, []);

  return (
    <div className="w-full flex flex-col gap-2">
      {cartId && <OrderProductsDetails cartId={cartId} setCartId={setCartId} />}
      {orders.length > 0 ? (
        orders.map((item) => (
          <div key={item._id} className="w-full h-auto p-3 bg-white">
            <div>User Name :{item.username}</div>
            <div>User Address :{item.address}</div>
            <div>
              <button onClick={() => setCartId(item.cartId)}>
                view products
              </button>
            </div>
          </div>
        ))
      ) : (
        <h1>No Orders!!!</h1>
      )}
    </div>
  );
};

export default OrderDetails;
