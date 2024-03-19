import axios from "axios";
import { useEffect, useState } from "react";
import { FaWindowClose } from "react-icons/fa";

const ProductCreate = ({ setChild, currentId }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [logo, setLogo] = useState("");
  const [newBrand, setNewBrand] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [brand, setBrand] = useState([]);
  const [category, setCategory] = useState([]);
  const [btn, setBtn] = useState("CREATE");
  const [head, setHead] = useState("CREATE PRODUCT");
  const [errors, setErrors] = useState({});
  useEffect(() => {
    const getBrand = async () => {
      const Data = await axios.get("http://localhost:5555/brands");
      setBrand(Data.data);
    };
    const getCategory = async () => {
      const Data = await axios.get("http://localhost:5555/category");
      setCategory(Data.data);
    };
    getBrand();
    getCategory();
  }, []);
  useEffect(() => {
    if (currentId) {
      setBtn("UPDATE");
      setHead("UPDATE PRODUCT");
      const getSingleProduct = async () => {
        const response = await axios
          .get("http://localhost:5555/products/" + currentId)
          .then((res) => {
            setName(res.data.name);
            setPrice(res.data.price);
            setDesc(res.data.description);
          });
        return response;
      };
      getSingleProduct();
    }
  }, [currentId]);

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", desc);
    formData.append("logo", logo);
    formData.append("brand", newBrand);
    formData.append("category", newCategory);
    const errors = {};
    if (!name.trim()) {
      errors.name = "Name is Required !";
    }
    if (!price.trim()) {
      errors.price = "Price is Required !";
    }
    if (!desc.trim()) {
      errors.desc = "Description is Required !";
    }
    if (!newBrand) {
      errors.brand = "Brand is Required !";
    }
    if (!newCategory) {
      errors.category = "Required Category !";
    }
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      axios
        .put("http://localhost:5555/products/" + currentId, formData)
        .then(window.location.reload())
        .finally(() => {
          setName("");
          setPrice("");
          setDesc("");
          setNewBrand("");
          setNewCategory("");
        });
    }
  };

  const handleCreate = () => {
    console.log("fgh",name,price,desc,brand,category,logo);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", desc);
    formData.append("logo", logo);
    formData.append("brand", newBrand);
    formData.append("category", newCategory);
    const errors = {};
    if (!name.trim()) {
      errors.name = "Name is Required !";
    }
    if (!price.trim()) {
      errors.price = "Price is Required !";
    }
    if (!desc.trim()) {
      errors.desc = "Description is Required !";
    }
    if (!newBrand) {
      errors.brand = "Brand is Required !";
    }
    if (!newCategory) {
      errors.category = "Required Category !";
    }
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      axios
        .post("http://localhost:5555/products/create", formData)
        .then(window.location.reload())
        .catch((err) => console.log(err))
        .finally(() => {
          setName("");
          setPrice("");
          setDesc("");
          setNewBrand("");
          setNewCategory("");
        });
    }
    console.log("e", errors);
  };
  return (
    <div className="h-screen w-full bg-black absolute bg-opacity-80 justify-center items-center flex">
      <div className="w-3/5 h-66 mt-6 p-2 flex flex-col text-white gap-2 p- justify-start items-center bg-gradient-to-b from-black to-blue-950 border-2 border-blue-900">
        <div className="flex justify-end gap-5 items-center w-full">
          <h1 className="sm:mr-72 text-2xl font-bold underline">{head}</h1>
          <FaWindowClose
            className="cursor-pointer"
            onClick={() => setChild(null)}
            size={25}
          />
        </div>

        <div className="flex mt-4 w-full flex-col gap-1 justify-center items-center">
          <label htmlFor="name" className="text-lg">
            Product Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            value={name}
            className="rounded-lg w-4/5 h-10 text-black"
            name="name"
            id="name"
          />
          {errors.name && <p className="text-red-300">{errors.name}</p>}
        </div>
        <div className="flex flex-col gap-1 w-full justify-center items-center">
          <label htmlFor="price" className="text-lg">
            Price
          </label>
          <input
            onChange={(e) => setPrice(e.target.value)}
            type="text"
            className="w-4/5 rounded-lg h-10 text-black"
            value={price}
            name="price"
            id="price"
          />
          {errors.price && <p className="text-red-300">{errors.price}</p>}
        </div>
        <div className="flex gap-1 flex-col w-full justify-center items-center">
          <label htmlFor="desc" className="text-lg">
            Product Description
          </label>
          <input
            onChange={(e) => setDesc(e.target.value)}
            className="w-4/5 rounded-lg h-14 text-black"
            type="text"
            value={desc}
            name="desc"
            id="desc"
          />
          {errors.desc && <p className="text-red-300">{errors.desc}</p>}
        </div>
        <div className="flex gap-1 w-full mt-4 justify-center items-center">
          <label htmlFor="logo" className="text-lg">
            Image
          </label>
          <input
            type="file"
           
            onChange={(e) => setLogo(e.target.files[0])}
          />
          <label className="text-lg" htmlFor="currentLogo">
            Current Image
          </label>
          <input
            type="text"
            value={logo}
            className="w-1/4 text-black h-8 rounded-lg"
          />
        </div>
        <div className="flex gap-1 w-full flex-col justify-center items-center">
          <label htmlFor="brand" className="text-lg">
            Brand
          </label>
          <select
            name="brand"
            id="brand"
            className="w-4/5 h-8 rounded-lg text-black"
            onChange={(e) => setNewBrand(e.target.value)}
          >
            {brand.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
          {errors.brand && <p className="text-red-300">{errors.brand}</p>}
        </div>
        <div className="flex gap-1 flex-col w-full justify-center items-center">
          <label htmlFor="logo" className="text-lg">
            Category
          </label>
          <select
            className="w-4/5 h-8 rounded-lg text-black"
            name="category"
            id="category"
            onChange={(e) => setNewCategory(e.target.value)}
          >
            {category.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-300">{errors.category}</p>}
        </div>
        <button
          onClick={currentId ? handleUpdate : handleCreate}
          className="bg-blue-400 w-4/5 mb-6 rounded-lg mt-2 h-8 text-black font-bold"
        >
          {btn}
        </button>
      </div>
    </div>
  );
};

export default ProductCreate;
