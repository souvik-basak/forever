import { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);
  
  useEffect(() => {
    // console.log("Image for product:", id, image);
  }, [id, image]);

  return (
    <div>
      <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer">
        <div className="overflow-hidden">
          {image && image.length > 0 ? (
            <img
              src={image[0]} // Only access image[0] if it exists
              alt={name}
              className="hover:scale-110 transition ease-in-out"
            />
          ) : (
            <p>No Image Available</p> // Fallback message if no image
          )}
        </div>
        <p className="pt-3 pb-1 text-sm">{name}</p>
        <p className="text-sm font-medium">
          {currency}
          {price}
        </p>
      </Link>
    </div>
  );
};

export default ProductItem;
