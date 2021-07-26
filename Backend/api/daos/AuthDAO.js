import { UserSchema } from "../schemas"
import mongoose from 'mongoose'

const mongoModel = new mongoose.model("Users",UserSchema)

const UserDAO = {
  findOrCreate,
  findUser
}

export default UserDAO

async function findOrCreate(body){
  const {name,username,password} = body
  let c = await mongoModel.findOne({username:username})
  if(c) return undefined
  return await mongoModel.create(body)
}

async function findUser(body){
  const { username } = body
  let c = await mongoModel.findOne({username:username})
  return c
}