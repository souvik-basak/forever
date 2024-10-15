import jwt from "jsonwebtoken";

const adminAuth = async(req, res, next) =>{
  try {
    const {token} = req.headers;
    if(!token){
      return res.status(401).json({message: "Unauthorized"});
    }
    const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
    // if(token_decoded.role !== "admin"){
    //   return res.status(401).json({message: "Unauthorized"});
    // }
    if(token_decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
      return res.status(401).json({message: "Unauthorized"});
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

export default adminAuth;