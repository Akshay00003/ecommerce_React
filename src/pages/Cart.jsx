import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";
import TopBar from "../components/HomeComponents/TopBar";
// import {Cookies} from 'react-cookie'
const Cart = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cookies, removeCookies] = useCookies([]);
  const [username, setUsername] = useState("");
  const [currentProducts, setCurrentProducts] = useState({});
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("login");
      }
      const { data } = await axios.post(
        "http://localhost:5555",
        {},
        {
          withCredentials: true,
        }
      );
      const { status, user ,userId } = data;
      setUsername(user);
console.log('user id is :',userId);
      console.log(status);
      if (!status) {
        removeCookies("token");
        navigate("/login");
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookies]);
  const Logout = () => {
    removeCookies("token");
    navigate("/signup");
  };
  console.log(document.cookie);
  return (
    <div className="flex h-screen flex-col bg-gray-200">
      <TopBar />
      <div className="mt-20">
        <h1 className="">
          Welcome <span>{username}</span>
        </h1>
        <button onClick={Logout}>Logout</button>
      </div>
      <div className="w-full h-full flex p-3 mt-20">
        <div className="w-3/5 h-96 flex flex-col gap-2">
          <div className="flex justify-between bg-white items-center p-3 border-2">
            <div>From saved address</div>
            <div className="w-44 h-10 flex justify-center items-center border-2">
              enter delivery{" "}
            </div>
          </div>
          <div className="bg-white flex justify-center items-center">
            <div>
              <img src="" alt="no img" />
            </div>
            <div className="flex flex-col">
              <h1>name</h1>
              <p>price</p>
              <p>decs</p>
              <p>remove</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
