const express = require("express");
const router = express.Router();
import { JWTHelper } from '../middlewares'

router.get("/", JWTHelper.decryptJWT, function (req, res, next) {
  if (req.id) return res.redirect("/dashboard");
  next();
});

router.get("/login",JWTHelper.decryptJWT, (req, res, next) => {
  if (req.id) return res.redirect("/dashboard");
  next();
});

router.get("/register",JWTHelper.decryptJWT, (req, res, next) => {
    if (req.id) return res.redirect("/dashboard");
    next();
});

router.get("/dashboard",JWTHelper.decryptJWT, (req, res, next) => {
  if (!req.id) return res.redirect("/login");
  next();
});

module.exports = router;