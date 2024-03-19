import { useEffect, useState } from "react";
import axios from "axios";
import { FaWindowClose } from "react-icons/fa";

const OrderProductsDetails = ({ cartId, setCartId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const handleProductDetails = () => {
      axios.get("http://localhost:5555/cart/" + cartId).then((res) => {
        setProducts(res.data);
        console.log(res.data);
      });
    };
    handleProductDetails();
  }, [cartId]);
  return (
    <div className="min-h-96 w-3/5 flex flex-col gap-12 absolute bg-gradient-to-b from-black to-blue-950  bg-opacity-80 text-white p-3">
      <div className="flex justify-center">
        <h1 className="ml-80 text-xl font-bold underline">PRODUCT DETAILS</h1>
        <FaWindowClose
          className="cursor-pointer ml-80"
          onClick={() => setCartId("")}
          size={25}
        />
      </div>

      <div className="flex flex-col justify-center mr-24 items-center">
        {products.length > 0
          ? products.map((item) => (
              <div className="flex flex-col justify-between gap-8" key={item._id}>
                {item.products.length > 0
                  ? item.products.map((content) => (
                      <div className="flex flex-col gap-1" key={content._id}>
                        <p>Product Name : {content.name}</p>
                        <p>Price : {content.price}</p>
                        <p>Description : {content.description}</p>
                      </div>
                    ))
                  : null}
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default OrderProductsDetails;
