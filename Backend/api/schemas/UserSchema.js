import { Schema } from 'mongoose'


const UserSchema = new Schema({
  username:{ type:String,required:true },
  password:{ type:String,required:true }
},{ timestamp:true })

UserSchema.index({username:1})

export default UserSchema