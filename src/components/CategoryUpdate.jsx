import axios from "axios";
import { useEffect, useState } from "react";

const CategoryUpdate = ({ flag, setFlag }) => {
  const [name, setName] = useState();
  const [status, setStatus] = useState(false);
  const [logo, setLogo] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:5555/category/" + flag)
      .then((result) => {
        setName(result.data.name);
        setStatus(result.data.active);
        setLogo(result.data.logo);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("active", status);
    formData.append("logo", logo);
    console.log("cat form", formData);
    axios.put("http://localhost:5555/category/" + flag, formData);
    setName("");
    setLogo("");
    setStatus(false);
    setFlag(null);
  };
  return (
    <div className="h-screen w-full bg-black absolute bg-opacity-80 justify-center items-center flex">
      <div className="flex gap-2 justify-center items-center">
        <label htmlFor="name">Category Name</label>
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="rounded-lg w-50 h-10"
          value={name}
          name="name"
          id="name"
        />
      </div>
      <div className="flex gap-2 justify-center items-center">
        <label htmlFor="status">Status</label>
        <input
          onChange={() => setStatus(!status)}
          type="checkbox"
          name="status"
          id="status"
        />
      </div>
      <div className="flex gap-2 justify-center ml-24 items-center">
        <label htmlFor="logo">Category Logo</label>
        <input
          onChange={(e) => setLogo(e.target.files[0])}
          className=""
          type="file"
          name="logo"
          id="logo"
        />
      </div>
      <button
        onClick={handleUpdate}
        className="bg-blue-900 w-24 h-8 text-white font-bold"
      >
        Update
      </button>
      <button onClick={() => setFlag(null)}>close</button>
    </div>
  );
};

export default CategoryUpdate;
