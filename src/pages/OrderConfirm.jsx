import axios from "axios";
import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";
import TopBar from "../components/HomeComponents/TopBar";
import Login from "./Login";

const OrderConfirm = () => {
  const { id } = useParams();
  const [address, setAddress] = useState("");
  const [login, setLogin] = useState(false);
  const [name, setName] = useState("");
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  console.log("login status from topBar", login);
  console.log("id is", id);
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/cart/${id}`);
        setCart(response.data);
        console.log("cart response", response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCart();
  }, [id]);
  console.log(address);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (login) {
      console.log("submit data", id,'address', address, name);
      axios
        .post("http://localhost:5555/order/create", {
          cartId: id,
          address: address,
          username: name,
        })
        .then((res) => {
          console.log(res.data);
          navigate(`/message/${name}`);
        });
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col w-full justify-center h-screen bg-slate-200">
      <TopBar setName={setName} setLogin={setLogin} />
      {login ? (
        cart.map((item) => {
          const totalPrice = item.products.reduce(
            (acc, product) => acc + product.price,
            0
          );
          return (
            <div
              key={item._id}
              className="flex justify-center mb-24 w-full bg-slate-200"
            >
              <form
                onSubmit={handleSubmit}
                className="flex justify-center w-full bg-slate-200"
              >
                <div className="w-3/5 bg-white mt-14 flex flex-col gap-1 p-3">
                  <div className="flex justify-start items-center h-24 bg-red-200">
                    <p>Welcome {name}</p>
                  </div>
                  <div className="flex justify-between items-center h-24 bg-red-200">
                    <p>you have selected {item.products.length} items</p>
                    {item.products.map((content) => (
                      <div key={content._id}>
                        <p className="flex flex-col">{content.name}</p>
                        <p>{content.price}</p>
                        <p>{content.description}</p>
                      </div>
                    ))}
                    <p>Total amount is{totalPrice}</p>
                  </div>
                  <div className="flex justify-center flex-col h-24 bg-red-200">
                    <label htmlFor="address">Your Address</label>
                    <input
                      type="text"
                      className="w-1/4"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-start flex-col  h-24 bg-red-200">
                    <p>select payment option</p>
                    <p>cash on delivery</p>
                  </div>
                  <div className="flex justify-center items-center flex-col  h-24 bg-red-200">
                    <button type="submit">Confirm Order</button>
                  </div>
                </div>
              </form>
            </div>
          );
        })
      ) : (
        <div className="mb-8">
          <Login setLogin={setLogin} />
        </div>
      )}
    </div>
  );
};

export default OrderConfirm;
