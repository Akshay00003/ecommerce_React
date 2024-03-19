import mainLogo from "../../assets/Logo/pngegg.png";
import { FaRegUserCircle, FaBoxOpen } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

const TopBar = ({setLogin,setName}) => {
  const navigate = useNavigate();
  const [cookies, removeCookies] = useCookies([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const verifyCookie = async () => {
      // if (!cookies.token) {
      //   navigate("/");
      // }
      const { data } = await axios.post(
        "http://localhost:5555",
        {},
        {
          withCredentials: true,
        }
      );
      const { status, user } = data;
      setUsername(user);
      setName(user)
      // if (!status) {
      //   navigate("/");
      // }
      setLogin(status)
      console.log(status);
    };
    verifyCookie();
  }, [cookies, navigate, removeCookies,setLogin,setName]);
  const Logout = () => {
    removeCookies("token");
    window.location.reload();
  };
  return (
    <div className="w-full h-14 p-4 bg-white sticky">
      <div className="h-full w-full justify-center gap-2 flex items-center">
        <div className="flex w-3/5 gap-4 px-4 items-center ml-20">
          <img src={mainLogo} className="h-16" alt="No Logo" />
          <input
            type="text"
            className="border-2 w-full rounded-lg h-9 bg-gray-200"
            placeholder=" Search here..."
          />
        </div>
        <div className="flex justify-center mr-12 px-2 items-center gap-12 text-lg">
          <div className="flex justify-center gap-2 items-center hover:text-white hover:bg-blue-600 w-32 h-10 rounded-lg">
            <FaRegUserCircle />
            {username ? (
              <p>
                {username}
                <span
                  className="ml-1 cursor-pointer text-blue-500 font-medium hover:text-white hover:font-bold"
                  onClick={Logout}
                >
                  Logout
                </span>
              </p>
            ) : (
              <Link to={"/login"}>
                <p>Log In</p>
              </Link>
            )}

            <IoIosArrowDown />
          </div>
          <div className="flex justify-between items-center gap-2">
            <Link
              className="flex justify-between items-center gap-2"
              to={"/cart"}
            >
              {" "}
              <LuShoppingCart />
              <p>Cart</p>
            </Link>
          </div>
          <div className="flex justify-between items-center gap-2">
            <FaBoxOpen />
            <p>Become a Seller</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
