import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TopBar from '../components/HomeComponents/TopBar'
// import CategoryComponent from '../components/HomeComponents/CategoryComponent'
// import slugify from "slugify";
import PriceFilter from "../components/HomeComponents/PriceFilter";



const AllProducts = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [brands, setBrands] = useState([]);
  const [amount, setAmount] = useState("");
  console.log(amount);
  // const [brandName, setBrandName] = useState("");

  const [product, setProduct] = useState(false);
  const { id,catId } = useParams();

  const [categoryId, setCategoryId] = useState(catId);
console.log("c is",categoryId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await axios.get(
          "http://localhost:5555/products"
        );
        const brandResponse = await axios.get("http://localhost:5555/brands");
        setData(productResponse.data);
        setBrands(brandResponse.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    let filteredProducts = data;

    if (id) {
      // const brand = brands.find((item) => item._id === id);
      // setBrandName(brand.name);
      filteredProducts = filteredProducts.filter(
        (item) => item.brand === id
      );
      console.log(' fp is ',filteredProducts);
    }
    if (catId) {
      console.log( 'cat is',catId);
      filteredProducts = filteredProducts.filter(
        (item) => item.category === catId
      );
      console.log('new cat is',filteredProducts);
    }
    if (categoryId) {
      console.log( 'cat is',catId);
      filteredProducts = filteredProducts.filter(
        (item) => item.category === categoryId
      );
      console.log('new cat is',filteredProducts);
    }
    if (amount) {
      filteredProducts = filteredProducts.filter(
        (item) => item.price <= amount
      );
    }
    if (product) {
      filteredProducts = data;
    }
 

    setFilteredData(filteredProducts);
  }, [catId, id, data,categoryId, product, brands,amount]);
  const findBrand = (id) => {
    const brand = brands.find((item) => item._id === id);
    return brand ? brand.name : "";
  };
// const generateSlug=(name)=>{
//   return slugify(name,{lower:true,remove:/[*+~.()'"!:@]/g})
// }

  return (
    <div className="w-full h-auto">
    {" "}
    <TopBar />
    {/* <CategoryComponent
      setCategoryId={setCategoryId}
     
    /> */}
    <div className="w-full flex gap-2 h-auto p-3 border-2">
      {/* <div>
        <h1>{brandName}</h1>
        <h1>{catName}</h1>
      </div> */}
<PriceFilter categoryId={categoryId} setCategoryId={setCategoryId} amount={amount} setAmount={setAmount} />
      <div className="w-full h-full grid grid-cols-3 gap-2 mt-12">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <Link key={item._id} to={`/product/${findBrand(item.brand)}/${item.name+"&"}/${item._id}`}>
              <div
                key={item._id}
                className="w-full h-64 grid grid-cols-2 p-8 bg-gradient-to-t from-green-300 to-blue-200"
              >
                <div className="flex flex-col gap-5 ">
                  <p className="text-lg font-medium">
                    {findBrand(item.brand)}
                  </p>
                  <p className="text-2xl font-semibold">{item.name}</p>
                  <div className="text-lg font-light">
                    <p>{item.description}</p>
                    <p>
                      <span className="font-semibold"></span>
                      <span className="font-bold">Just ${item.price}</span>
                    </p>
                  </div>
                </div>
                <div>
                  <img
                    className="h-48"
                    src={`http://localhost:5555/Images/` + item.logo}
                    alt="no img"
                  />
                </div>
              </div>
            </Link>
          ))
        ) : (
          <h1>No Products available</h1>
        )}
      </div>
    </div>

  </div>
  )
}

export default AllProducts
