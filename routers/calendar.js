import { Router } from 'express';
import { findCalendarsByProfId,addNewCalendar ,deleteCalendar} from '../controllers/calendar.js';
import {verifySignUp} from "../middlewares/verifySignUp.js";


const router = Router();

router.post("/:profId", addNewCalendar);
router.delete("/:calendarId", deleteCalendar);
router.get("/:profId", findCalendarsByProfId);



export default router;