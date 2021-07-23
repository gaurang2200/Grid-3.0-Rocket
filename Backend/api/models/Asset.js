import { AssetDAO } from "../daos"
import { scanAsset } from "../helpers"

async function findOrCreate(body) {
  const { ip, port, os, username, privateKey ,password } = body
  
  if (!ip || !port || !os || !username || (!privateKey && !password))
    return { status:400 ,isError:true, message:"All Fields Required"}

  let check = await AssetDAO.findByIP(ip)

  if (check)
    return { status:409 ,isError:true,message:"IP Already Present" };

  await AssetDAO.create(body);

  scanAsset([body])

  return {status:200,isError:false,message:"Created Successfully"};
}

async function findAndDelete(body) {
  const { ip } = body
  if(!ip)
    return { status:400,isError:true,message:"IP is required" }

  let asset = await AssetDAO.findByIP(ip)

  if(!asset)
    return { status:400,isError:true,message:"IP not present in DB" }

  AssetDAO.deleteByIP(ip)
  return {status:200,isError:false,message:"Deleted Successfully"};
}

async function findAndUpdate(body){
  const { ip, update } = body
  if(!ip)
    return { status:400, isError:true,message:"Details are required" }

  let asset = await AssetDAO.findByIP(ip)

  if(!asset)
    return { status:400,isError:true,message:"IP not present in DB" }

  AssetDAO.updateByIP(ip,update)
  return {status:200,isError:false,message:"Updated Successfully"};
}

const AssetModel = {
  findOrCreate,
  findAndDelete,
  findAndUpdate
}

export default AssetModel