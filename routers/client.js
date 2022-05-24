import { Router } from 'express';
import { findProfAll } from '../controllers/client.js';
import {verifySignUp} from "../middlewares/verifySignUp.js";


const router = Router();

router.get("/:id", findProfAll);



export default router;