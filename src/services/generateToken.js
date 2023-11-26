import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "30d", // Set your desired expiration time
  });

  // Set the token as a cookie with expiration
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days,
    secure: process.env.NODE_ENV !== "development",
  });

  return token
};

export default generateToken;
