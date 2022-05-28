import { Router } from 'express';
import { findCalendarsByProfId,addNewCalendar ,deleteCalendar,updateCalendarById} from '../controllers/calendar.js';
import {verifySignUp} from "../middlewares/verifySignUp.js";


const router = Router();

router.post("/:profId", addNewCalendar);
router.delete("/:calendarId", deleteCalendar);
router.get("/:profId", findCalendarsByProfId);
router.put("/:calendarId",updateCalendarById);



export default router;