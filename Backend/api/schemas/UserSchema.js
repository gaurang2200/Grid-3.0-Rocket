import { Schema } from 'mongoose'


const UserSchema = new Schema({
  name: { type:String, required:true },
  username:{ type:String,required:true },
  password:{ type:String,required:true }
},{ timestamp:true })

export default UserSchema