import { Router } from 'express';
import { login,register } from '../controllers/auth.js';
import {verifySignUp} from "../middlewares/verifySignUp.js";


const router = Router();

router.get("/login", login);
router.post("/register",[
    verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted ], register);


export default router;