
import asyncErrorWrapper from "express-async-handler";
import User from "../models/user.js";
import { db } from "../models/index.js";
import Calendar from "../models/calendar.js";
import { Op } from 'sequelize';
import dotenv from 'dotenv'
dotenv.config()

const findCalendarsByProfId = asyncErrorWrapper(async (req, res) => {
    const profId = req.params.profId;
    const result = await Calendar.findAll({

        where:{
            professionalId:profId
        }
     })
     res.status(200).json({
         success: true,
         "ads":result
     })
})
const addNewCalendar = asyncErrorWrapper(async (req, res) => {
    const result = await Calendar.create(req.body)
    res.status(200).json({
        success: true,
        result
    })
})

const deleteCalendar = asyncErrorWrapper(async (req, res) => {
    const id = req.params.calendarId;
    const result = await Calendar.destroy({
        where:{
            id
        }
    })
    res.status(200).json({
        success: true,
        result
    })
})


export {
    findCalendarsByProfId,
    addNewCalendar,
    deleteCalendar,
}