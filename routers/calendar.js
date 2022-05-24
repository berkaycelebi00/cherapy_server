import { Router } from 'express';
import { findCalendarsByProfId,addNewCalendar ,deleteCalendar} from '../controllers/calendar';
import {verifySignUp} from "../middlewares/verifySignUp.js";


const router = Router();

router.post("/:profId", addNewCalendar);
router.delete("/:profId", deleteCalendar);
router.get("/:profId", findCalendarsByProfId);



export default router;