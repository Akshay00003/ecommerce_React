import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaAngleDoubleDown } from "react-icons/fa";
import slugify from 'slugify'

const CategoryComponent = ({  setCategoryId, }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      const response = await axios.get("http://localhost:5555/category");
      setData(response.data);
    };
    getCategory();
  }, []);
  // const findCatName = (id) => {
  //   setCatId(id);
  //   const Name = data.find((item) => item._id === id);
  //   if (Name) {
  //     setCatName(Name.name);
  //   }
  // };
  const generateSlug=(name)=>{
    return slugify(name,{lower:true,remove:/[*+~.()'"!:@]/g})
  }
  return (
    <div className="w-full h-48 px-3 py-1 bg-gray-200">
      <div className="w-full px-18 h-full flex justify-center gap-8 items-center bg-white">
        <Link to={'/products'}><p
         
          className="text-blue-500 font-bold cursor-pointer"
        >
          All<span className="ml-1">Products</span>
          <span>
            <FaAngleDoubleDown className="ml-8 hover:rotate-180" />
          </span>
        </p></Link>
        
        {data.map((item) => (
          <Link key={item._id} to={`/products/category/${item._id}`}>
          {/* <Link key={item._id} to={`/products/${generateSlug(item.name)}/${item._id}`}> */}
            <div
              onClick={() => setCategoryId(item._id)}
              className="flex flex-col font-medium gap-1 justify-center cursor-pointer items-center"
            >
              <img
                className="h-20"
                src={`http://localhost:5555/Images/` + item.logo}
                alt="No img"
              />
              <p>{item.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryComponent;
