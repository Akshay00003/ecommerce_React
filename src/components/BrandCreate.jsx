import axios from "axios";
import { useEffect, useState } from "react";
import { FaWindowClose } from "react-icons/fa";

const BrandCreate = ({ setChild, currentId }) => {
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [status, setStatus] = useState(false);
  const [btn, setBtn] = useState("CREATE");
  const [head, setHead] = useState("CREATE BRAND");
  const [errors, setErrors] = useState({});
  const handleCreate = () => {
    const errors = {};
    if (!name.trim()) {
      errors.name = "Name is Required !";
    }
    if (!logo) {
      errors.logo = "Logo Required !";
    }

    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("logo", logo);
      formData.append("status", status);

      axios
        .post("http://localhost:5555/brands/create", formData)
        .then((res) => {
          console.log("res", res);
          window.location.reload();
        })
        .catch((err) => console.log(err));
      setName("");
      setStatus(false);
      setLogo("");
    }
  };
  useEffect(() => {
    if (currentId) {
      setBtn("UPDATE");
      setHead("UPDATE BRAND");
      const getSingleBrand = async () => {
        const response = await axios
          .get("http://localhost:5555/brands/" + currentId)
          .then((res) => {
            setName(res.data.name);
            setLogo(res.data.logo)
          });
        return response;
      };
      getSingleBrand();
    }
  }, []);
  const handleUpdate = () => {
    const errors = {};
    if (!name.trim()) {
      errors.name = "Name is Required !";
    }
    if (!logo) {
      errors.logo = "Logo is Required !";
    }
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("logo", logo);
      formData.append("status", status);
      axios
        .put("http://localhost:5555/brands/" + currentId, formData)
        .then(window.location.reload())
        .catch((err) => console.log(err));
    }
    setName("");
    setLogo("");
    setStatus("");
  };
  return (
    <div className="h-screen w-full bg-black absolute bg-opacity-80 justify-center items-center flex">
      <div className="w-3/5 h-66 mt-6 flex flex-col text-white gap-2 p-6 justify-start items-center bg-gradient-to-b from-black to-blue-950 border-2 border-blue-900">
        <div className="flex justify-end gap-8 items-center w-full">
          <h1 className="mr-72 text-2xl font-bold underline">{head}</h1>
          <FaWindowClose
            className="cursor-pointer"
            onClick={() => setChild(null)}
            size={25}
          />
        </div>
        <div className="flex flex-col mt-6 w-full gap-2 justify-center items-center">
          <label className="text-lg" htmlFor="name">
            Brand Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            value={name}
            className="rounded-lg w-4/5 h-8 text-black"
            name="name"
            id="name"
          />
          {errors.name && <p className="text-red-300">{errors.name}</p>}
        </div>
        <div className="flex gap-2 mt-3 justify-center items-center">
          <label className="text-lg" htmlFor="status">
            Status
          </label>
          <input
            onChange={() => setStatus(!status)}
            type="checkbox"
            name="status"
            id="status"
          />
        </div>
        <div className="flex w-full mt-3 justify-center ml-24 items-center">
          <div className="flex justify-between gap-1 mr-24">
            <label className="text-lg" htmlFor="logo">
              Brand Logo
            </label>

            <input
              onChange={(e) => setLogo(e.target.files[0])}
              className=""
              type="file"
              name="logo"
              id="logo"
            />

            <label className="text-lg" htmlFor="currentLogo">
              Current Logo
            </label>
            <input
              type="text"
              value={logo}
              className="w-1/4 text-black h-8 rounded-lg"
            />
          </div>
        </div>
        {errors.logo && <p className="text-red-300">{errors.logo}</p>}
        <button
          onClick={currentId ? handleUpdate : handleCreate}
          className=" bg-blue-400 w-4/5 mt-5 mb-3 rounded-lg h-8 text-black font-bold"
        >
          {btn}
        </button>
      </div>
    </div>
  );
};

export default BrandCreate;
