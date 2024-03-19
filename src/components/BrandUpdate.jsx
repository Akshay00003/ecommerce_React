import axios from "axios";
import { useEffect, useState } from "react";

const BrandUpdate = ({ flag,setFlag }) => {
  const [name, setName] = useState(null);
  const [logo, setLogo] = useState(null);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    try {
     
      axios.get("http://localhost:5555/brands/" + flag).then((result) => {
        console.log("result is", result.data);
        setName(result.data.name);
        console.log("name is", name);
        setLogo(result.data.logo);
        // setStatus(result.data.status);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
  const handleCreate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("logo", logo);
    formData.append("status", status);
    console.log(formData);
    axios
      .put("http://localhost:5555/brands/" + flag, formData)
      .then(window.location.reload());
      setName("")
      setLogo("")
      setStatus(false)
  };
  return (
    <div className="w-full h-66 flex flex-col gap-12 p-10 justify-center items-center bg-blue-300 border-2 border-blue-800">
      <form action="" onSubmit={handleCreate}>
        <div className="flex gap-2 justify-center items-center">
          <label htmlFor="name">Brand Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="rounded-lg w-50 h-10"
            value={name}
          />
        </div>
        <div className="flex gap-2 justify-center items-center">
          <label htmlFor="status">Status</label>
          <input
            onChange={() => setStatus(!status)}
            type="checkbox"
            // value={status}
          />
        </div>
        <div className="flex gap-2 justify-center ml-24 items-center">
          <label htmlFor="logo">Brand Logo</label>
          <input
            onChange={(e) => setLogo(e.target.files[0])}
            className=""
            type="file"
            // value={logo}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-900 w-24 h-8 text-white font-bold"
        >
          Update
        </button>
        <button onClick={()=>setFlag(null)}>close</button>
      </form>
    </div>
  );
};

export default BrandUpdate;
