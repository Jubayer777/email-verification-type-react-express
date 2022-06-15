import express from "express";
import { createUser,userVerify} from "../controllers/user.controller";
const router = express.Router();

router.post("/user", createUser);
router.get("/verify/:userId", userVerify);

export default router;
