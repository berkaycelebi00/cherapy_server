import jwt from "jsonwebtoken"

import { db } from "../models";
import dotenv from 'dotenv'


dotenv.config()
const User = db.user;
const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
        success:false,
      message: "No token provided!"
    });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({
          success:false,
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};
const isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
          success:false,
        message: "Require Admin Role!"
      });
      return;
    });
  });
};
const isModerator = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "professional") {
          next();
          return;
        }
      }
      res.status(403).send({
        success:false,
        message: "Require Professional Role!"
      });
    });
  });
};
const isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "professional") {
          next();
          return;
        }
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({
        success:false,
        message: "Require Moderator or Admin Role!"
      });
    });
  });
};
export {
  verifyToken,
  isAdmin,
  isModerator,
  isModeratorOrAdmin
};
