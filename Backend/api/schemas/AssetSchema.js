import { Schema } from 'mongoose'


const AssetSchema = new Schema({
  ip:{ type:String,required:true },
  os:{ type:String,enum:['linux','windows'],required:true },
  username:{ type:String,required:true },
  password:{ type:String },
  port:{ type:Number, required:true },
  privateKey:{ type:String }
})

export default AssetSchema