import BrandComponent from "../components/HomeComponents/BrandComponent";
import CategoryComponent from "../components/HomeComponents/CategoryComponent";

import TopBar from "../components/HomeComponents/TopBar";

const Home = () => {
  return (
    <div>
      <TopBar />
      <CategoryComponent />
      <div className="flex justify-between gap-72 flex-col">
        <BrandComponent />
        {/* {product? <ProductComponent filterAmount={filterAmount} catName={catName} brandId={brandId} catId={catId} /> :null} */}
      </div>
    </div>
  );
};

export default Home;
