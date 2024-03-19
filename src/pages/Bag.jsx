import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Bag = () => {
  const { id } = useParams();
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const generateToken = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5555/cart/set-device-token",
          { withCredentials: true }
        );
        console.log(response);
        // const data=await response.json()
        console.log(response.data);
      } catch (error) {
        console.error("error generating device token : ", error);
      }
    };
  
    const checkToken = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5555/cart/verify",
          {},
          { withCredentials: true }
        );
        console.log(response.data);
        const { status, message } = response.data;
        console.log(status);
        if (!status) {
          generateToken();
        } 

        setCart(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    checkToken()
  }, [id]);
  const AddToCart = async () => {
      try {
        // const product="65ecd4a0142eadd36a9d0537"
        const response = await axios.put(
          "http://localhost:5555/cart/update/65f3698e440e6c2f88493a8b",
          { product: id }
        );
        console.log(response.data);
    
      } catch (err) {
        console.log(err);
      }
    };
  return <div>
    <button onClick={()=>AddToCart()}>Add to cart</button>
  </div>;
};

export default Bag;
