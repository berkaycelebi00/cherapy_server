
import asyncErrorWrapper from "express-async-handler";
import User from "../models/user.js";
import { db } from "../models/index.js";
import Advertisement from "../models/advertisement.js";
import { Op } from 'sequelize';
import dotenv from 'dotenv'
dotenv.config()

const findAdByProfId = asyncErrorWrapper(async (req, res) => {
    const profId = req.params.profId;
    const result = await Advertisement.findAll({
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
const addProfAdImage = asyncErrorWrapper(async (req, res) => {
    const id = req.params.adId;
    const imgUrl = req.file.filename.split("/")[req.file.filename.split("/").length-1]
    const result = await Advertisement.update({imageUrl:imgUrl},{
        where:{
            id
        }
    })
    res.status(200).json({
        success: true,
        result
    })
})
const findAllAds = asyncErrorWrapper(async (req, res) => {
    console.log("bende")
    const result = await Advertisement.findAll({
       include:[
           {association:db.ad,attributes:["name","surname","id"]},
           
       ]
    })
    res.status(200).json({
        success: true,
        "ads":result
    })
})

const addProfAdd = asyncErrorWrapper(async (req, res) => {

    const result = await Advertisement.create(req.body)
    res.status(200).json({
        success: true,
        "ads":result
    })
})



export {
    findAdByProfId,
    addProfAdImage,
    addProfAdd,
    findAllAds
}