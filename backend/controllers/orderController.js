import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import Razorpay from "razorpay";

// global variables
const currency = "inr";
const deliveryCharge = 10;

// gateway for payment
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const razorpay = new Razorpay({
  key_secret: process.env.RAZORPAY_SECRET_KEY,
  key_id: process.env.RAZORPAY_KEY_ID,
});
// placing order using COD
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      amount,
      paymentMethod: "COD",
      payment: false,
      address,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, {
      cartData: {},
    });

    res.json({ success: true, message: "Order Placed Successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// place order using stripe
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;
    const orderData = {
      userId,
      items,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      address,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));
    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charge",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });
    const session = await stripe.checkout.sessions.create({
      // payment_method_types: ["card"],
      line_items: line_items,
      mode: "payment",
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
    });
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// verify payment using stripe
const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;
  try {
    if (success) {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true, message: "Payment Successful" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment Failed" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// place order using razorpay
const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;
    const orderData = {
      userId,
      items,
      amount,
      paymentMethod: "Razorpay",
      payment: false,
      address,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    const options = {
      amount: amount * 100,
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString(),
    };
    await razorpay.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
      }
      res.json({ success: true, order });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// verify payment using razorpay
const verifyRazorpay = async(req, res) => {
  try{const {userId, razorpay_order_id} = req.body
  const orderInfo = await razorpay.orders.fetch(razorpay_order_id)
  if(orderInfo.status === "paid"){
    await orderModel.findOneAndUpdate(orderInfo.receipt, {payment: true})
    await userModel.findByIdAndUpdate(userId, {cartData: {}})
    res.json({success: true, message: "Payment Successful"})
    } else{
      res.json({success: false, message: "Payment Failed"})
    }
  }
  catch(error){
    console.log(error)
    return res.status(500).json({success: false, message: error})
  }
}

// get all orders
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// get user orders
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// update order status from admin
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Order Status Updated Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
  verifyRazorpay,
};
