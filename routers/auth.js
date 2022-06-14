import { Router } from 'express';
import { login,register ,setVolunteer, updateProfile,updateProfilePhoto} from '../controllers/auth.js';
import {verifySignUp} from "../middlewares/verifySignUp.js";
import { upload } from '../middlewares/libraries/image_upload.js';


const router = Router();

router.post("/login", login);
router.post("/register",[
    verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted ], register);
router.post("/setAsVolunteer",setVolunteer);
router.post("/photo/:id",[upload.single("file")],updateProfilePhoto);
router.put("/:id",updateProfile);


export default router;