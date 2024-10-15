import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// function for add products
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      bestseller,
      sizes,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const image = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imageUrls = await Promise.all(
      image.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        console.log("Cloudinary result:", result);
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imageUrls.length ? imageUrls : [],
      date: Date.now(),
    };
    console.log(productData);

    const product = new productModel(productData);
    await product.save();

    res
      .status(200)
      .json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// function for get all products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// function for get single product
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.log(object);
    res.status(500).json({ message: error.message });
  }
};

// function for removing product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res
      .status(200)
      .json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({success:false, message: error.message });
  }
};

export { addProduct, listProducts, singleProduct, removeProduct };
