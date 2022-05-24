
import asyncErrorWrapper from "express-async-handler";
import Content from "../models/content.js";
import { Op } from 'sequelize';
import dotenv from 'dotenv'
dotenv.config()

const createContent = asyncErrorWrapper(async (req, res) => {

    res.status(200).send({
        id:"sa"
    });
})

const findAll = asyncErrorWrapper(async (req, res) => {
    const contents = await Content.findAll();
    res.status(200).send({
        contents
    });

})

const deleteContent = asyncErrorWrapper(async (req, res) => {

})


export {
    createContent,
    deleteContent,
    findAll
}