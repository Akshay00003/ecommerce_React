import { useState } from "react";
import Sidebar from "../../../shared/sidebar/Sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";

const MyAddress = () => {
  const { id } = useParams();
  const [address, setAddress] = useState("");
  const handleCreate = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5555/address/create", {
        address: address,
        id: id,
      })
      .then((res) => {
        setAddress(res.data);
        console.log(res.data);
      });
  };

  return (
    <div className="flex">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="w-3/4 py-6 bg-gray-200">
        <form
          onSubmit={handleCreate}
          className="w-full h-full bg-white flex flex-col"
        >
          <div className="flex flex-col gap-12 p-6">
            <div className="flex gap-6 items-center">
              <p className="text-xl font-semibold">Address 1</p>
              <button type="submit" className="text-blue-500 font-medium">
                Create
              </button>
            </div>
            <input
              className="w-1/4 h-12 border-2"
              type="text"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              name="name"
              id="name"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyAddress;
