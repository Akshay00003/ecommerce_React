import { useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";

const FilterComponent = ({ setFilterAmount,filterAmount }) => {
  const [state, setState] = useState(false);
  const handleClear=()=>{
    setState(false)
    setFilterAmount("")
  }
  return (
    <div
      onMouseEnter={() => setState(true)}
      className={`lg:flex flex-col top-[35%] fixed ${state? "w-40":"w-7"} left-0 py-2 h-60 rounded-tr-lg rounded-br-lg text-black bg-gradient-to-t from-blue-800 to-black`}
    >
      <p
        className={`-rotate-90 mt-36 text-white flex gap-3 font-bold ${state && "hidden"}`}
      >
        <span>Filter</span>
        <span>Products</span>
      </p>
      <ul
        className={`${!state && "hidden"} px-2 gap-3 justify-center items-center`}
      >
        <div className="flex flex-col gap-4 p-2 border-2 border-black h-56 w-full rounded-tr-lg rounded-br-lg">
          <FaRegWindowClose
            size={18}
            onClick={handleClear}
            className="ml-28 cursor-pointer text-red-200"
          />
          <div className="flex flex-col justify-center items-center mt-8 gap-3">
            {" "}
            <li className="text-xl font-semibold text-white">Filter by Price</li>
            <input
              onChange={(e) => setFilterAmount(e.target.value)}
              className="w-28 rounded-lg"
              value={filterAmount}
              type="text"
              name="price"
              id="price"
            />
          </div>
        </div>
      </ul>
    </div>
  );
};

export default FilterComponent;
