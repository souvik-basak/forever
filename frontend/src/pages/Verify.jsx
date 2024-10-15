import { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import { backendUrl } from "../../../admin/src/App";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
  const { navigate, token, setCartItems } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      if (!token) {
        return null;
      } else {
        const response = await axios.post(
          backendUrl + "/api/order/verifyStripe",
          { orderId, success},
          { headers: { token } }
        );
        if (response.data.success) {
          setCartItems({});
          navigate("/orders");
        } else {
          navigate("/cart");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (success) {
      verifyPayment();
    }
  }, [token]);
  return <div></div>;
};

export default Verify;
