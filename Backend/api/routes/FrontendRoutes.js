import Express from 'express'
import { JWTHelper } from '../middlewares'

const FrontEndRouter = Express.Router()

export default FrontEndRouter

FrontEndRouter.get("/", JWTHelper.decryptJWT, function (req, res, next) {
  if (req.id) return res.redirect("/dashboard")
  res.redirect("/login")
})

FrontEndRouter.get("/login",JWTHelper.decryptJWT, (req, res, next) => {
  if (req.id) return res.redirect("/dashboard")
  next()
})

FrontEndRouter.get("/register",JWTHelper.decryptJWT, (req, res, next) => {
    if (req.id) return res.redirect("/dashboard")
    next()
})

FrontEndRouter.get("/dashboard",JWTHelper.decryptJWT, (req, res, next) => {
  if (!req.id) return res.redirect("/login")
  next()
})