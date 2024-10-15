import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const deliveryPrice = 20;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem(token);
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select a size");
      return;
    }

    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);

    if (token) {
      try {
        const response = await axios.post(
          backendUrl + "/api/cart/add",
          {
            itemId,
            size,
          },
          { headers: { token } }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    } else {
      toast.error("Please login to add items to cart");
    }
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          {
            itemId,
            size,
            quantity,
          },
          {
            headers: { token },
          }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let count = 0;
    for (const item in cartItems) {
      for (const size in cartItems[item]) {
        try {
          if (cartItems[item][size] > 0) {
            count += cartItems[item][size];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return count;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const size in cartItems[items]) {
        try {
          if (cartItems[items][size] > 0) {
            totalAmount += itemInfo.price * cartItems[items][size];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      console.log(response.data.products);
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if(response.data.success){
        setCartItems(response.data.cartData);
      }else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getUserCart(localStorage.getItem("token"));
    }
  }, []);

  const value = {
    products,
    currency,
    deliveryPrice,
    search,
    navigate,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    backendUrl,
    token,
    setToken,
    setCartItems,
  };
  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
