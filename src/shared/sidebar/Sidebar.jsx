import { CgProfile } from "react-icons/cg";
import { IoMdNotifications } from "react-icons/io";
import { FaAddressCard, FaCartArrowDown } from "react-icons/fa";
import { TbJewishStarFilled } from "react-icons/tb";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { MdDoubleArrow } from "react-icons/md";
import { Link } from "react-router-dom";
import proImg from "../../assets/Images/proImg.png";
import { useEffect, useState } from "react";
import axios from "axios";
const Sidebar = ({ id }) => {
  const [userId,setUserId]=useState("")
  const [userName,setUserName]=useState("")
  useEffect(() => {
    const verifyCookie = async () => {
      const { data } = await axios.post(
        "http://localhost:5555",
        {},
        {
          withCredentials: true,
        }
      );
      const { status, user,userId } = data;
      setUserId(userId);
      setUserName(user)
      // setLogin(status)
      console.log(status);
    };
    verifyCookie();
  }, []);
  // const Logout = () => {
  //   removeCookies("token");
  //   window.location.reload();
  // };
  console.log('user id from sidebar',id);
  return (
    <div className="w-full h-screen justify-center items-center gap-2 flex flex-col py-5 bg-gray-200">
      <div className="flex w-4/5 justify-start gap-2 bg-white p-3 mb-4">
        <div className="ml-6">
          <img className="w-14 h-14" src={proImg} alt="no img" />
        </div>
        <div className="flex flex-col">
          <p>Hello,</p>
          <p>{userName}</p>
        </div>
      </div>
      <div className="flex flex-col gap-16 w-4/5 border-2 p-3 bg-white">
        <Link to={`/my-profile/${userId}`}>
          <div className="flex justify-start items-center gap-3 ml-6">
            <span className="text-blue-600">
              <CgProfile size={25} />
            </span>
            <p className="text-lg font-semibold text-green-400 hover:text-blue-600 cursor-pointer">
              PROFILE
            </p>
            <span className="text-blue-300">
              <MdDoubleArrow size={20} />
            </span>
          </div>
        </Link>

        <Link to={"/notifications"}>
          <div className="flex justify-start items-center gap-3 ml-6">
            <span className="text-blue-600">
              {" "}
              <IoMdNotifications size={25} />
            </span>

            <p className="text-lg font-semibold text-green-400 hover:text-blue-600 cursor-pointer">
              NOTIFICATIONS
            </p>
            <span className="text-blue-300">
              <MdDoubleArrow size={20} />
            </span>
          </div>
        </Link>
        <Link to={`/address/${userId}`}>
          <div className="flex justify-start items-center gap-3 ml-6">
            <span className="text-blue-600">
              {" "}
              <FaAddressCard size={25} />
            </span>

            <p className="text-lg font-semibold text-green-400 hover:text-blue-600 cursor-pointer">
              ADDRESS
            </p>
            <span className="text-blue-300">
              <MdDoubleArrow size={20} />
            </span>
          </div>
        </Link>

        <div className="flex justify-start items-center gap-3 ml-6">
          <span className="text-blue-600">
            {" "}
            <FaCartArrowDown size={25} />
          </span>

          <p className="text-lg font-semibold text-green-400 hover:text-blue-600 cursor-pointer">
            ORDERS
          </p>
          <span className="text-blue-300">
            <MdDoubleArrow size={20} />
          </span>
        </div>
        <div className="flex justify-start items-center gap-3 ml-6">
          <span className="text-blue-600">
            {" "}
            <TbJewishStarFilled size={25} />
          </span>

          <p className="text-lg font-semibold text-green-400 hover:text-blue-600 cursor-pointer">
            WISHLIST
          </p>
          <span className="text-blue-300">
            <MdDoubleArrow size={20} />
          </span>
        </div>
        <div className="flex justify-start items-center gap-3 ml-6">
          <span className="text-blue-600">
            {" "}
            <RiLogoutBoxRFill size={25} />
          </span>

          <p className="text-lg font-semibold text-red-400 hover:text-blue-600 cursor-pointer underline">
            Log Out
          </p>
          <span className="text-blue-300">
            <MdDoubleArrow size={20} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
