import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Category = ({ setChild, setCurrentId }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const response = async () => {
      const Data = await axios.get("http://localhost:5555/category");
      setData(Data.data);
    };
    response();
  }, []);
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:5555/category/" + id)
      .then(window.location.reload())
      .catch((err) => console.log(err));
  };
  const handleEdit = (id) => {
    setChild("categoryEdit");
    setCurrentId(id);
  };
  return (
    <div className="w-full h-auto">
      {data.map((item) => (
        <div
          key={item._id}
          className="flex justify-between mb-3 items-center bg-blue-200 rounded-2xl h-20 p-8"
        >
        <img
                src={`http://localhost:5555/Images/` + item.logo}
                className="w-14 rounded-full h-16"
                alt="no img"
              />
          <p className="max-w-4">{item.name}</p>
          <p>Status</p>
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
  );
};

export default Category;
