import { AssetDAO } from "../daos"

async function findOrCreate(body){
  const { ip,port,os,username,privateKey } = body
  if(!ip || !port || !os || !username || !privateKey){
    throw new CustomError()
  }
  let check = AssetDAO.findByIP(ip);
  if(check)
    throw new CustomError();
  await AssetDAO.create(body);
  return "Created Successfully";
}