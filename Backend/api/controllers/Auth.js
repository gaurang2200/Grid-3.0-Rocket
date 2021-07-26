import { AuthModel } from '../models'
import { responseBody } from '../helpers'
import { JWTHelper } from '../middlewares'

const { attachJWT,decryptJWT } = JWTHelper

const AuthController = {
  register,
  login,
  logout
}

export default AuthController

async function register(request,response){
  const { body } = request
  const {status,isError,message } = await AuthModel.register(body)
  const res = responseBody(isError,message)
  response.status(status).send(res)
}

async function login(request,response){
  const { body } = request
  const {_id,status,isError,message } = await AuthModel.login(body)
  request.id=_id
  const res = responseBody(isError,message)
  if(!isError)
    attachJWT(request,response)
  response.status(status).send(res)
}

async function logout(request,response){
  const {status,isError,message } = await AuthModel.logout()
  const res = responseBody(isError,message)
  response.cookie("jwt", "", {httpOnly:true})
  response.status(status).send(res)
}