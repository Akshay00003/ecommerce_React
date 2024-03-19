import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Product = ({ setChild, setCurrentId }) => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const response = async () => {
      const Data = await axios.get("http://localhost:5555/products");
      setData(Data.data);
    };
    const categoryResponse = async () => {
      const Data = await axios.get("http://localhost:5555/category");
      setCategory(Data.data);
    };
    const brandResponse = async () => {
      const Data = await axios.get("http://localhost:5555/brands");
      setBrands(Data.data);
    };
    response();
    brandResponse();
    categoryResponse();
  }, []);
  const handleDelete = (id) => {
    axios
      .delete("http://localhost:5555/products/" + id)
      .then(window.location.reload());
  };
  const handleUpdate = (id) => {
    setCurrentId(id);
    setChild("productEdit");
  };
  const handleCatId = (id) => {
    const filterData = category.filter((item) => item._id === id);
    if (filterData.length > 0) {
      const value = filterData[0].name;

      console.log("name is", value);
      return value;
    }
  };
  const handleBrandId = (id) => {
    const filterData = brands.filter((item) => item._id === id);
    console.log("f is", id);
    if (filterData.length > 0) {
      const value = filterData[0].name;
      console.log("b is", value);
      return value;
    }
  };
  console.log("pis", category);
  console.log("pis", brands);
  return (
    <div className="w-full h-full">
      {data.map((item) => (
        <div
          key={item._id}
          className="flex justify-between mb-3 items-center bg-blue-200 rounded-2xl h-20 p-8"
        >
         <img
                src={`http://localhost:5555/Images/` + item.logo}
                className="w-14 rounded-full h-16"
                alt={item.logo}
              />
          <p className="max-w-4">{item.name}</p>
          <p>{item.description}</p>
          <p>{item.price}</p>
          <div>
            

            <p>{handleBrandId(item.brand)}</p>
          </div>

          <div>
            <p>{handleCatId(item.category)}</p>
          </div>

          <p>
            <span>
              <FaEdit onClick={() => handleUpdate(item._id)} />
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

export default Product;
