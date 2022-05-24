import { Router } from 'express';
import auth from './auth.js';
import content from "./content.js";
import client from "./client.js";
import advertisement from './advertisement.js';
import calendar from '../models/calendar.js';
const router = Router();

router.use("/auth", auth);
router.use("/content", content);
router.use("/client", client);
router.use("/advertisement", advertisement);
router.use("calendar",calendar);

export default router;