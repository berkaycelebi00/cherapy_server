
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
        include:[
            {association:db.ad,attributes:["name","surname","id"]},
            
        ],
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
    const id = req.params.profId;
    const imgUrl = req.file.filename.split("/")[req.file.filename.split("/").length-1]
    const result = await Calendar.update({imageUrl:imgUrl},{
        where:{
            professionalId:id
        }
    })
    res.status(200).json({
        success: true,
        result
    })
})

const deleteCalendar = asyncErrorWrapper(async (req, res) => {
    const id = req.params.profId;
    const imgUrl = req.file.filename.split("/")[req.file.filename.split("/").length-1]
    const result = await Calendar.update({imageUrl:imgUrl},{
        where:{
            professionalId:id
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