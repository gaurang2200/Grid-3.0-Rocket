import jwt from "jsonwebtoken"

const JWTHelper = {
  attachJWT,
  decryptJWT
}

export default JWTHelper

async function attachJWT(request,response){
  let token = jwt.sign({id:request.id},process.env.JWT_SECRET_KEY, { expiresIn:'24h'})

  response.cookie("jwt",token,{
    maxAge:24*60*60*1000,
    httpOnly:true
  })
}

async function decryptJWT(request,response,next){
  try{
    let payload = jwt.verify(request.cookies.jwt,process.env.JWT_SECRET_KEY)
    request.id = payload.id
    next()
  }
  catch(e){ next() }
}