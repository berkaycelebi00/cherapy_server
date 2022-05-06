
import asyncErrorWrapper from "express-async-handler";
import User from "../models/user.js";
import Role from "../models/role.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { Op } from 'sequelize';
import dotenv from 'dotenv'
dotenv.config()

const login = asyncErrorWrapper(async (req, res) => {
    const user = await User.findOne({
        where: {
            username: req.body.username
        }
    })
    if (!user) {
        return res.status(404).send({ message: "User Not found." });
    }
    var passwordIsValid = bcryptjs.compareSync(
        req.body.password,
        user.password
    );
    if (!passwordIsValid) {
        return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
        });
    }
    var token = jsonwebtoken.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: 86400 // 24 hours
    });
    var authorities = [];
    user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
        });
    });

})

const register = asyncErrorWrapper(async (req, res) => {
    const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcryptjs.hashSync(req.body.password, 8)
    })
    if (req.body.roles) {
        const roles = await Role.findAll({
            where: {
                name: {
                    [Op.or]: req.body.roles
                }
            }
        })
        user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
        });
    } else {
        // user role = 1
        user.setRoles([1]).then(() => {
            res.send({ message: "User was registered successfully!" });
        });
    }
})


export {
    login,
    register
}