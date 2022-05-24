import { Router } from 'express';
import { findAdByProfId, addProfAdImage, findAllAds,addProfAdd} from '../controllers/advertisement.js';
import { upload } from '../middlewares/libraries/image_upload.js';
import {verifySignUp} from "../middlewares/verifySignUp.js";


const router = Router();

router.get("/professional/:profId", findAdByProfId);
router.post("/image/:profId",[upload.single("file")], addProfAdImage);
router.post("/professional/", addProfAdd);
router.get("/", findAllAds);



export default router;