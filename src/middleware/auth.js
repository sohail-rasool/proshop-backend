import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import customAsyncHandler from "./customAsyncHandler.js";

const protect = customAsyncHandler(async (req, res, next) => {
  try {
    // const token = req.cookies.token;
    const token = req.cookies.token;
    // Use promisified version of jwt.verify
    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return reject(err);
        }
        resolve(decoded);
      });
    });

    try {
      // Find the user in the database and attach it to the request object
      const dbUser = await User.findById(decoded.userId).select("-password");
      req.user = dbUser;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Invalid Token");
    }
  } catch (error) {
    res.status(401);
    throw new Error("Unauthorized");
  }
});

// isAdminMiddleware.js
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    // If the user is an admin, proceed to the next middleware
    next();
  } else {
    res.status(403);
    throw new Error("Not authorized as an admin");
  }
};

export { protect, isAdmin };
