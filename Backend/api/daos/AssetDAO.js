import mongoose from 'mongoose'
import { AssetSchema } from '../schemas'

const mongoModel = new mongoose.model("Assets",AssetSchema)

const AssetDAO = {
  create,
  findById,
  findByIP,
  getAllIps,
  deleteByIP,
  updateByIP,
  getPage
}

export default AssetDAO

/* CREATE */
async function create(item) {
  return mongoModel.create(item)
}

/* READ */
async function findById(id) {
  return mongoModel.findById(id)
}

async function findByIP(ip) {
  let f = await mongoModel.findOne({ ip: ip })
  return f
}

async function getAllIps(){
  return await mongoModel.find({})
}

async function deleteByIP(ip){
  return await mongoModel.findOneAndDelete({ip})
}

async function updateByIP(ip,update){
  return await mongoModel.findOneAndUpdate({ip:ip},update)
}

async function getPage(page,limit){
  return await mongoModel.find({}).skip(page*limit).select({privateKey:0,password:0,__v:0,_id:1})
}