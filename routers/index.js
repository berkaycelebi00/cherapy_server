import { Router } from 'express';
import auth from './auth.js';
import content from "./content.js";

const router = Router();

router.use("/auth", auth);
router.use("/content", content);

export default router;