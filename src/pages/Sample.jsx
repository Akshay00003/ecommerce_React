import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Sample = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [catId, setCatId] = useState("");
  const [products, setProducts] = useState([]);
  const generateToken = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5555/cart/set-device-token",
        { withCredentials: true }
      );
      console.log("generate token response", response);
      console.log("generate token response data", response.data);
      setCart(response.data);
    } catch (error) {
      console.error("error generating device token : ", error);
    } finally {
      setLoading(false);
    }
  };
  const checkToken = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5555/cart/verify",
        {},
        { withCredentials: true }
      );
      console.log("check token data", data);
      if (!data.status) {
        generateToken();
      } else {
        setCart(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const findCart = () => {
    const Id = cart.map((item) => {
      return setCatId(item._id);
    });
    console.log("cart id is", Id);
  };
  const AddToCart = async () => {
    try {
      const cartId=cart._id
      // const product="65ecd4a0142eadd36a9d0537"
      const response = await axios.put(
        `http://localhost:5555/cart/update/${cartId}`,
        { product: id }
      );
      console.log("after update data", response.data);
      setCart(response.data);
      // checkToken()
    } catch (err) {
      console.log(err);
    }
  };
  console.log('cart is ',cart);
  return (
    <div>
      <button
        className="bg-yellow-300"
        type="button"
        onClick={generateToken}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Device Token"}
      </button>
      <button className="bg-red-300 ml-6" onClick={checkToken}>
        checkToken
      </button>
      <button onClick={findCart}>cart id</button>
      {cart.length > 0 &&
        cart.map((item) => (
          <div key={item._id}>
            {" "}
            <p>Cart Id : {item._id}</p>
            <p>Device token : {item.device}</p>
            {item.products.map((content) => (
              <p key={content._id}> products Id : {content.name}</p>
            ))}
          </div>
        ))}
      <button onClick={AddToCart}>add to cart</button>
    </div>
  );
};

export default Sample;
