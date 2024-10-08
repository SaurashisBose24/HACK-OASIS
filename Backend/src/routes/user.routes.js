import { Router } from "express"
import { loginUser, logoutUser, registerUser,fetchUser } from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/auth.user.js";

const router = Router();

router.route("/signup").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/getUser").post(fetchUser);

export default router