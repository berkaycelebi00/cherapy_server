
import asyncErrorWrapper from "express-async-handler";
import User from "../models/user.js";
import { db } from "../models/index.js";
import Client from "../models/client.js";
import { Op } from 'sequelize';
import dotenv from 'dotenv'
dotenv.config()

const findProfAll = asyncErrorWrapper(async (req, res) => {

    const result = await Client.findAll({
        include: [
            {
                association: db.professional,
                attributes: ["name", "surname", "id"],

            },
            {
                association: db.clientUser,
                attributes: ["name", "surname", "id"]
            }
        ], where: {
            professionalId: req.params.id
        }
    })
    res.status(200).json({
        success: true,
        "clients":result
    })
})





export {
    findProfAll
}