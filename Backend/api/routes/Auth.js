import Express from 'express'
import { JWTHelper } from '../middlewares'
import { AuthController } from '../controllers'

const AuthRouter = new Express.Router()

export default AuthRouter

const { register, login, logout } = AuthController
const { attachJWT,decryptJWT } = JWTHelper

/**
  * Login User
  * @POST /register
  * @body Requires name,username,password
*/
AuthRouter.post('/register',decryptJWT,register)

/**
  * Register the user
  * @POST /login
  * @body Requires username,password
*/
AuthRouter.post('/login',decryptJWT,login)

/**
  * Logging Out The User
  * @GET /logout
*/
AuthRouter.get('/logout',logout)