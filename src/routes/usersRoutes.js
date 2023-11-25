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

const router = express.Router();

router.post('/login',authUser)
router.post('/register',registerUser)
router.post('/logout',logoutUser)
router.route('/profile').get(userProfile).put(updateProfile)
router.get('/',getUsers)
router.route('/:id').get(getUser).put(updateUser).delete(deleteUser)

const userRoute = router;

export default userRoute;
