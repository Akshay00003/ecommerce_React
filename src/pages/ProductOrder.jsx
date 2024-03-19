import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TopBar from "../components/HomeComponents/TopBar";
import CategoryComponent from "../components/HomeComponents/CategoryComponent";
import { FaTag } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductOrder = () => {
  const [cart, setCart] = useState([]);
  const [nerCart, setNewCart] = useState([]);
  const [cartId, setCartId] = useState([]);
  const [productData, setProductData] = useState([]);
  const { id } = useParams();
 
  // console.log(id);
  // useEffect(() => {
  //   const generateToken = async () => {
  //     try {
  //       const { data } = await axios.get(
  //         "http://localhost:5555/cart/set-device-token",
  //         { withCredentials: true }
  //       );
  //       setCart(data);
  //       console.log("generated data", data);
  //       // setCart(data);
  //     } catch (error) {
  //       console.error("Error in generating token: ", error);
  //     }
  //   };
  //   const checkToken = async () => {
  //     try {
  //       const { data } = await axios.post(
  //         "http://localhost:5555/cart/verify",
  //         {},
  //         { withCredentials: true }
  //       );
  //       const { status, message } = data;
  //       console.log("check token data is :", data,"message is: ",message);
  //       if (!status) {
  //         generateToken();
  //       } else {
  //         setCart(message);

  //         console.log("cart after checking token :", cart);
  //       }
  //     } catch (error) {
  //       console.error("Error in checking token : ", error);
  //     }
  //   };
  //   checkToken();
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await axios.get(
          `http://localhost:5555/products/${id}`
        );
        setProductData(productResponse.data);
        // console.log(productResponse.data);
        // console.log("Product data type:", typeof productData);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id, productData]);

  // const findCart = () => {
  //   console.log('c is ',cart);
  //    const Id=cart.map((item) => {
  //     return item._id;
  //   });
  //   console.log(Id);
  // };

  // const addToCart = () => {
  //   try {
  //     if (cart && cart.length > 0) {
  //       const proId = cart[0]._id;
  //       console.log("c is", cart);
  //       console.log("n is", proId);

  //       // const Id = findCart();
  //       // console.log(Id);
  //       // setCartId(Id);
  //       console.log(id);
  //       const addData = axios
  //         .put("http://localhost:5555/cart/update/" + proId, {
  //           product: id,
  //         })
  //         .then((res) => {
  //           setNewCart(res.data);
  //           console.log("ne res", res.data);
  //         });
  //       console.log("new cart is", nerCart);
  //       // .finally(console.log('add res is ',addData))
  //       // console.log(cart);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const offers = [
    {
      id: 1,
      bank: "Bank Offer",
      content:
        "10% instant discount on ICICI Bank Credit Cards, up to ₹300, on orders of ₹2,500 and above",
    },
    {
      id: 2,
      bank: "Bank Offer",
      content:
        "Get ₹25* instant discount for the 1st Flipkart Order using Flipkart UPI",
    },
    {
      id: 3,
      bank: "Bank Offer",
      content: "5% Cashback on Flipkart Axis Bank Card",
    },
    {
      id: 4,
      bank: "Bank Offer",
      content: "Get extra 47% off (price inclusive of cashback/coupon)",
    },
  ];

  return (
    <div className="h-screen w-full bg-gray-300">
      <TopBar />
      <CategoryComponent />

      {Array.isArray(productData) ? (
        productData.map((item) => (
          <div
            key={item._id}
            className="flex justify-center items-center gap-2"
          >
            <div className="flex justify-center items-center gap-2">
              <img
                src={`http://localhost:5555/Images/` + item.logo}
                alt="no img"
              />
              <div className="flex justify-between items-center gap-2">
                <button>Add to Cart</button>
                <button>Buy Now</button>
              </div>
            </div>
            <div className="grid grid-cols-1">
              <p>{item.name}</p>
              <p>{item.description}</p>
              <p>{item.price}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="px-20">
          <div
            key={productData._id}
            className="flex h-auto w-full bg-white justify-start items-center gap-2"
          >
            <div className="flex flex-col ml-20 w-1/3 h-full justify-between items-center">
              <div className="w-4/5 h-80">
                <img
                  className="h-full w-full mt-4"
                  src={`http://localhost:5555/Images/` + productData.logo}
                  alt="no img"
                />
              </div>

              <div className="mt-2 h-52">
                <div className="flex justify-between mt-28 items-center gap-2">
                  <Link to={`/sample/${id}`}>
                    {" "}
                    <button
                      className="w-64 text-lg text-white font-semibold hover:text-xl rounded-sm h-14 bg-yellow-500"
                      type="button"
                    >
                      Add to Cart
                    </button>
                  </Link>
                  <Link to={"/cart"}>
                    <button
                      className="w-64 text-lg text-white font-semibold hover:text-xl rounded-sm h-14 bg-yellow-600"
                      type="button"
                    >
                      Buy Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1 ml-10 h-96 w-full mb-32">
              <p className="text-2xl">{productData.name}</p>
              <p className="text-red-500 font-medium">Special Price</p>
              <p className="text-3xl font-bold">$ {productData.price}</p>
              <p className="text-xl">{productData.description}</p>
              <p className="font-medium">Available offers</p>
              {offers.map((item) => (
                <p className="flex gap-1 items-center mt-1" key={item.id}>
                  <span className="text-red-500">
                    <FaTag />
                  </span>
                  <span className="ml-2">{item.bank}</span>
                  <span>{item.content}</span>
                  <span className="text-blue-500 font-medium">T&C</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductOrder;
