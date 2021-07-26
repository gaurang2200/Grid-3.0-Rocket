import { AssetDAO } from "../daos"
import { addAsset,deleteAsset } from "../helpers"

const AssetModel = {
  findOrCreate,
  findAndDelete,
  findAndUpdate,
  findByIP,
  findAllIP
}

export default AssetModel


async function findByIP(ip){

  if(!ip)
    return { status:400 ,isError:true, message:"All Fields Required"}

  let assets = await AssetDAO.findByIP(ip)

  return { status:200, isError: false, message:assets }
}

async function findOrCreate(body) {
  const { ip, port, os, username ,password } = body

  if (!ip || !port || !os || !username || !password)
    return { status:400 ,isError:true, message:"All Fields Required"}

  let check = await AssetDAO.findByIP(ip)

  if (check)
    return { status:409, isError:true, message:"IP Already Present" }

  if(password.length>100){
    console.log(password)
    body.password=undefined
    body.privateKey = password
  }

  await AssetDAO.create(body)

  await addAsset(body)

  return {status:200,isError:false,message:"Created Successfully"}
}

async function findAndDelete(body) {
  const { ip } = body
  if(!ip)
    return { status:400,isError:true,message:"IP is required" }

  let asset = await AssetDAO.findByIP(ip)

  if(!asset)
    return { status:400,isError:true,message:"IP not present in DB" }

  AssetDAO.deleteByIP(ip)

  deleteAsset(ip, asset.os)


  return {status:200,isError:false,message:"Deleted Successfully"}
}

async function findAndUpdate(body){
  const { ip, update } = body
  if(!ip)
    return { status:400, isError:true,message:"Details are required" }

  let asset = await AssetDAO.findByIP(ip)

  if(!asset)
    return { status:400,isError:true,message:"IP not present in DB" }

  AssetDAO.updateByIP(ip,update)
  return {status:200,isError:false,message:"Updated Successfully"}
}

async function findAllIP(page,limit){
  limit=Math.min(30,limit)
  let assets = await AssetDAO.getPage(page,limit)
  if(!assets) return { status:404, isError:true,message:"No Assets Found" }
  return { status:200, isError:false,message:assets }
}