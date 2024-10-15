import React, { useContext } from "react";
import { ShopContext } from "../context/shopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilters, setShowFilters] = React.useState(false);
  const [filteredProducts, setFilteredProducts] = React.useState([]);
  const [category, setCategory] = React.useState([]);
  const [subCategory, setSubCategory] = React.useState([]);
  const [sortType, setSortType] = React.useState("relevant");

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubcategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilters = () => {
    let productsCopy = products.slice();
    if (search.length > 0 && showSearch) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }
    setFilteredProducts(productsCopy);
  };

  const sortProducts = () => {
    let productsCopy = filteredProducts.slice();
    switch (sortType) {
      case "low-high":
        // setSortType("low-high");
        setFilteredProducts(productsCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        // setSortType("high-low");
        setFilteredProducts(productsCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilters();
        break;
    }
  };

  // React.useEffect(() => {
  //   setFilteredProducts(products);
  // }, []);

  React.useEffect(() => {
    applyFilters();
  }, [category, subCategory,search,showSearch,products]);

  React.useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 pt-10 border-t">
      {/* filter options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilters(!showFilters)}
          className="text-xl my-2 flex items-center cursor-pointer gap-2"
        >
          Filters
          <img
            src={assets.dropdown_icon}
            alt=""
            className={`h-3 sm:hidden ${showFilters ? "rotate-90" : ""}`}
          />
        </p>
        {/* Category Section */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilters ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-2 text-sm font-medium">Categories</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap2">
              <input
                type="checkbox"
                className="w-3"
                value={"Men"}
                onChange={toggleCategory}
              />
              <span>&nbsp; Men</span>
            </p>
            <p className="flex gap2">
              <input
                type="checkbox"
                className="w-3"
                value={"Women"}
                onChange={toggleCategory}
              />
              <span>&nbsp; Women</span>
            </p>
            <p className="flex gap2">
              <input
                type="checkbox"
                className="w-3"
                value={"Kids"}
                onChange={toggleCategory}
              />
              <span>&nbsp; Kids</span>
            </p>
          </div>
        </div>

        {/* Subcategory Section */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilters ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-2 text-sm font-medium">Subcategories</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap2">
              <input
                type="checkbox"
                className="w-3"
                value={"Topwear"}
                onChange={toggleSubcategory}
              />
              <span>&nbsp; Topwear</span>
            </p>
            <p className="flex gap2">
              <input
                type="checkbox"
                className="w-3"
                value={"Bottomwear"}
                onChange={toggleSubcategory}
              />
              <span>&nbsp; Bottomwear</span>
            </p>
            <p className="flex gap2">
              <input
                type="checkbox"
                className="w-3"
                value={"Winterwear"}
                onChange={toggleSubcategory}
              />
              <span>&nbsp; Winterwear</span>
            </p>
          </div>
        </div>
      </div>
      {/* right side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm px-2"
          >
            <option value="relevant">Relevant</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>

        {/* map products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filteredProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
