import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";

const Brand = ({ setChild, setCurrentId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [logos, setLogos] = useState({});

  useEffect(() => {
    const response = async () => {
      const Data = await axios.get("http://localhost:5555/brands");
      setData(Data.data);

      setLoading(true);
    };
    // const Images = () => {
    //   const newData = { ...logos, logo: data.map((item) => item.logo) };
    //   console.log(newData);
    // };

    response();
    // Images();
  }, []);
  console.log(data);

  // console.log(logos);

  const handleDelete = (id) => {
    try {
      axios
        .delete("http://localhost:5555/brands/" + id)
        .then(window.location.reload());
    } catch {
      (err) => console.log(err);
    }
  };
  const handleEdit = (id) => {
    setCurrentId(id);
    setChild("brandEdit");
  };
  const handleStatus = (status) => {
    if (status) {
      return "Non active";
    }
    if (!status) {
      return "Active";
    }
  };
  return (
    <div className="w-full h-full">
      {loading ? (
        <div>
          {data.map((item) => (
            <div
              key={item._id}
              className="flex justify-between font-bold mb-3 items-center bg-blue-200 rounded-2xl h-20 p-8"
            >
              <img
                src={`http://localhost:5555/Images/` + item.logo}
                className="w-14 rounded-full h-16"
                alt={item.logo}
              />
              {/* <img
                src={item.logo}
                className="w-14 rounded-full h-16"
                alt="no img"
              /> */}

              <p>{item.name}</p>
              <p>{handleStatus(item.active)}</p>
              <p>
                <span className="cursor-pointer">
                  <FaEdit onClick={() => handleEdit(item._id)} />
                </span>
              </p>
              <p>
                <span>
                  <MdDelete onClick={() => handleDelete(item._id)} size={20} />
                </span>
              </p>
              <p>{new Date(item.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <h1>LOADING...</h1>
      )}
    </div>
  );
};

export default Brand;
