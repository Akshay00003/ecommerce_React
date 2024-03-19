import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BrandComponent = ({ setBrandId }) => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const getAllBrands = async () => {
      const Brand = await axios.get("http://localhost:5555/brands");
      setBrands(Brand.data);
    };
    getAllBrands();
  }, []);

  return (
    <div className="w-full h-48 py-3 px-2">
      <div className="w-full h-full">
        <h1 className="ml-5 font-semibold text-2xl">Top Brands</h1>

        <div className="w-full h-full mt-5 grid grid-cols-6 justify-center items-center gap-3">
          {brands.map((item) => (
            <Link key={item._id} to={`/products/brand/${item._id}`}>
              <div
                onClick={() => setBrandId(item._id)}
                className="w-full h-46 border-2 flex p-6 flex-col gap-2 justify-center cursor-pointer items-center"
              >
                <img
                  src={`http://localhost:5555/Images/` + item.logo}
                  className="w-24 h-24"
                  alt="no img"
                />
                <p className="mt-1 font-bold text-xl">{item.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandComponent;
