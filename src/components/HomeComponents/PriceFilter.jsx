import axios from "axios";
import { useEffect, useState } from "react";

const PriceFilter = ({ amount, setAmount, categoryId, setCategoryId }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cateResponse = await axios.get("http://localhost:5555/category");
        setData(cateResponse.data);
        console.log(cateResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  console.log(categoryId);
  return (
    <div className="w-2/12 border-2 mt-12">
      <div className="p-3 h-12 border-b-2">
        <h1 className="font-bold text-xl">Filter</h1>
      </div>
      <div className="flex flex-col gap-3">
        {data &&
          data.map((item) => (
            <div
              key={item._id}
              className="flex justify-start items-center gap-4"
            >
              <input
                id="link-checkbox"
                type="checkbox"
                onClick={() => setCategoryId(item._id)}
                value={categoryId}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="link-checkbox"
                className="text-blue-600 dark:text-blue-500"
              >
                {item.name}
              </label>
            </div>
          ))}
      </div>
      <div className="p-4">
        <h1>PRICE</h1>

        <input
          type="range"
          className="transparent h-1.5 w-full cursor-pointer appearance-none rounded-lg border-transparent bg-neutral-200"
          min="0"
          max="100000"
          step="500"
          id="customRange3"
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className="flex justify-between mt-2 items-center">
          {" "}
          <p className="text-xl font-bold">{amount}</p>
          <p
            className="text-blue-500 font-semibold underline cursor-pointer"
            onClick={() => setAmount("")}
          >
            Clear
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
