import { IoMdAdd } from "react-icons/io";
import Brand from "./Brand";
import Category from "./Category";
import Product from "./Product";
import { useState } from "react";
import BrandCreate from "./BrandCreate";

import CategoryCreate from "./CategoryCreate";
import ProductCreate from "./ProductCreate";
import { Link } from "react-router-dom";
import OrderDetails from "./OrderDetails";
const Admin = () => {
  const [list, setList] = useState("brands");
  const [child, setChild] = useState(null);
  const [currentId, setCurrentId] = useState(null);

  return (
    <div className="min-h-screen w-full bg-gray-200">
      {child === "productCreate" ? <ProductCreate setChild={setChild} /> : null}
      {child === "productEdit" ? (
        <ProductCreate currentId={currentId} setChild={setChild} />
      ) : null}
      {child === "brandCreate" ? <BrandCreate setChild={setChild} /> : null}
      {child === "brandEdit" ? (
        <BrandCreate setChild={setChild} currentId={currentId} />
      ) : null}
      {child === "categoryCreate" ? (
        <CategoryCreate setChild={setChild} />
      ) : null}
      {child === "categoryEdit" ? (
        <CategoryCreate currentId={currentId} setChild={setChild} />
      ) : null}
     
      <div>
        <div className="w-full h-14 text-yellow-100 bg-blue-950 flex items-center p-3 justify-between">
          <p className="font-bold text-2xl">Site Administration</p>
          <p className="flex gap-2">
            Welcome, <span className="text-yellow-300 font-bold">Admin</span>
            <span className="underline">Logout</span>
          </p>
        </div>
        <div className="w-full h-8 bg-blue-900 flex p-3 items-center text-yellow-50">
          <Link to={"/"}>
            {" "}
            <p className="underline">Home</p>
          </Link>
        </div>
      </div>
      <div className="flex gap-24 p-6">
        <div className="h-80 w-64">
          <table className="w-full h-full bg-gray-300">
            <thead className="bg-blue-950 h-10">
              <p className="ml-20 mt-1 text-xl font-bold text-yellow-100">
                Models
              </p>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="flex justify-between">
                    <p
                      onClick={() => setList("brands")}
                      className={`ml-2 text-lg ${list === "brands" ? "font-extrabold underline" : "font-semibold"} cursor-pointer`}
                    >
                      Brands
                    </p>
                    <p
                      onClick={() => setChild("brandCreate")}
                      className="flex mr-2 justify-between gap-1 items-center font-semibold cursor-pointer"
                    >
                      Add
                      <span className="text-red-500 text-sm">
                        <IoMdAdd />
                      </span>
                    </p>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="flex justify-between">
                    <p
                      onClick={() => setList("category")}
                      className={`ml-2 cursor-pointer text-lg ${list === "category" ? "font-extrabold underline" : "font-semibold"}`}
                    >
                      Category
                    </p>
                    <p
                      onClick={() => setChild("categoryCreate")}
                      className="flex justify-between cursor-pointer gap-1 mr-2 items-center font-semibold"
                    >
                      Add
                      <span className="text-red-500 text-sm">
                        <IoMdAdd />
                      </span>
                    </p>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="flex justify-between">
                    <p
                      onClick={() => setList("product")}
                      className={`ml-2 text-lg cursor-pointer ${list === "product" ? "font-extrabold underline" : "font-semibold"}`}
                    >
                      Products
                    </p>
                    <p
                      onClick={() => setChild("productCreate")}
                      className="flex justify-between cursor-pointer gap-1 mr-2 items-center font-semibold"
                    >
                      Add
                      <span className="text-red-500 text-sm">
                        <IoMdAdd />
                      </span>
                    </p>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="flex justify-between">
                    <p
                      onClick={() => setList("order")}
                      className={`ml-2 text-lg cursor-pointer ${list === "product" ? "font-extrabold underline" : "font-semibold"}`}
                    >
                      Orders
                    </p>
                
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-3/4 h-auto mt-16">
          {list === "brands" ? (
            <Brand setChild={setChild} setCurrentId={setCurrentId} />
          ) : null}
          {list === "category" ? (
            <Category setCurrentId={setCurrentId} setChild={setChild} />
          ) : null}
         
          {list === "order" ? (
            <OrderDetails setCurrentId={setCurrentId} setChild={setChild} />
          ) : null}
          {list === "brandCreate" ? <BrandCreate /> : null}
        
          {list === "categoryCreate" ? <CategoryCreate /> : null}
          {list === "productCreate" ? <ProductCreate /> : null}
          {list === "product" ? (
            <Product setCurrentId={setCurrentId} setChild={setChild} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Admin;
