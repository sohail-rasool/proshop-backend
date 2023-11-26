import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  userProfile,
  updateProfile,
  getUsers,
  deleteUser,
  getUser,
  updateUser,
} from "../controller/usersController.js";
import { protect, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", authUser);
router.post("/register", registerUser);
router.post("/logout", logoutUser);
router.route("/profile").get(protect, userProfile).put(protect, updateProfile);
//Admin routes
router.get("/", protect, isAdmin, getUsers);
router
  .route("/:id")
  .get(protect, isAdmin, getUser)
  .put(protect, isAdmin, updateUser)
  .delete(protect, isAdmin, deleteUser);

const userRoute = router;

export default userRoute;
