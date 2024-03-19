import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import TopBar from "../components/HomeComponents/TopBar";

const ItemCart = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartsId, setCartsId] = useState("");

  useEffect(() => {
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
        console.log("check token data", data.message);
        console.log("check token data of data", data.status);
        if (!data.status) {
          generateToken();
        } else {
          setCart(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    checkToken();
  }, [id]);
  // const cartId = cart[0]._id;
  // console.log('c is',cartId);
  const findCartId = () => {
    let newCart = [...cart];

    let cartId = newCart[0]._id;
    // let cartId = cart[0]._id;

    // const cartId = cart.map((item) => item._id);
    console.log("cart id is", cartId);
    return cartId;
  };
  const AddToCart = async () => {
    try {
      const cartId = cart[0]._id;
      console.log(cartId);
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
  console.log("cart is", cart);
  console.log("new cart id is", cart);
  return (
    // <div>
    //   {/* <button onClick={AddToCart}>add to cart</button>
    //   {cart &&
    //     cart.map((item) => (
    //       <div key={item._id}>
    //         {" "}
    //         <p>Cart Id : {item._id}</p>
    //         <p>Device token : {item.device}</p>
    //         {item.products.length > 0
    //           ? item.products.map((content) => (
    //               <p key={content._id}> products Id : {content.name}</p>
    //             ))
    //           : null}
    //       </div>
    //     ))} */}
    //     <TopBar />
    // </div>
    <div className="flex h-screen flex-col bg-gray-200">
      <TopBar />

      <div className="w-full h-full flex p-3 mt-20">
        {cart &&
          cart.map((item) => (
            <div key={item._id} className="w-3/5 h-96 flex flex-col gap-2">
              <div className="flex justify-between bg-white items-center p-3 border-2">
                <div>From saved address</div>
                <button onClick={AddToCart}>add to cart</button>
                <Link disabled={!cart} to={`/confirm/${item._id}`}>
                  <div className="w-44 h-10 bg-orange-500 rounded-sm cursor-pointer flex justify-center items-center">
                    <p className="text-lg text-white font-semibold">
                      PLACE ORDER
                    </p>
                  </div>
                </Link>
              </div>

              <div className="flex flex-col justify-center items-center gap-2">
        

                {item.products.length > 0
                  ? item.products.map((content) => {
                      return (
                        <div
                          key={content._id}
                          className="bg-white flex justify-start gap-24 h-28 items-center w-full"
                        >
                          <div>
                            <img
                              className="h-20 w-20 ml-10"
                              src={`http://localhost:5555/Images/${content.logo}`}
                              alt="no img"
                            />
                          </div>
                          <div className="flex flex-col">
                            <h1 className="font-semibold text-lg">
                              {content.name}
                            </h1>
                            <p className="font-bold text-xl">
                              $ {content.price}
                            </p>
                            <p className="font-thin text-lg text-red-600">
                              {content.description}
                            </p>
                            <p>remove</p>
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ItemCart;
