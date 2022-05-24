import { Router } from 'express';
import { createContent,deleteContent,findAll } from '../controllers/content.js';
import { upload } from '../middlewares/libraries/image_upload.js';
import {verifySignUp} from "../middlewares/verifySignUp.js";


const router = Router();

router.post("/",[upload.single("file")], createContent);
router.delete("/",deleteContent);
router.get("/",findAll)

export default router;