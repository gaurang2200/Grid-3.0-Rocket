import jwt from "jsonwebtoken"

const JWTHelper = {
  attachJWT,
  decryptJWT
}

export default JWTHelper

async function attachJWT(request,response){
  let token = jwt.sign({id:request.id},process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 })

  response.cookie("jwt",token,{
    maxAge:60*60,
    httpOnly:true
  })
}

async function decryptJWT(request,response,next){
  try{
    let payload = jwt.verify(request.cookie.jwt,process.env.JWT_SECRET_KEY)
    request.id = payload.id
    console.log(payload)
    next()
  }
  catch(e){
    next()
  }
}