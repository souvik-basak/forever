import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import {  useLocation, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    }
    else{
      setVisible(false);
    }
  }, [location]);

  const handleSearchClick = () =>{
    if (location.pathname !== "/collection") {
      navigate("/collection");
      console.log("object");
    }
    setShowSearch(true);
  }

  return showSearch && visible ? (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-inherit text-sm"
        />
        <img
          src={assets.search_icon}
          className="w-4 cursor-pointer"
          alt="search"
          onClick={handleSearchClick}
        />
      </div>
      <img
        src={assets.cross_icon}
        alt=""
        className="inline w-3 cursor-pointer"
        onClick={() => setShowSearch(!showSearch)}
      />
    </div>
  ) : null;
};

export default SearchBar;
