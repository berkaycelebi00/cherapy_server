import { Router } from 'express';
import { login,register ,setVolunteer} from '../controllers/auth.js';
import {verifySignUp} from "../middlewares/verifySignUp.js";


const router = Router();

router.post("/login", login);
router.post("/register",[
    verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted ], register);
router.post("/setAsVolunteer",setVolunteer);


export default router;