import bcrypt from 'bcrypt'

const crypter = {
  hash,
  verify
}

export default crypter

async function hash(data){
  let salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(data,salt)
}

async function verify(data,hash){
  return await bcrypt.compare(data,hash)
}