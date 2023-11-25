import jwt from "jsonwebtoken";


const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || '30d', // Set your desired expiration time
    });
  };

  export default generateToken