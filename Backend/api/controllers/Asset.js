import { responseBody } from '../helpers'
import { AssetModel } from '../models'

const AssetController = {
  create,
  del,
  update,
  get
}

export default AssetController

async function create(request,response){
  if(!request.id) return response.send(responseBody(403,"Unauthorized"))
  const { body={} } = request
  const { status=200,isError=false, message='' } = await AssetModel.findOrCreate(body)
  let res = responseBody(isError,message)
  response.status(status).send(res)
}

async function del(request,response){
  if(!request.id) return response.send(responseBody(403,"Unauthorized"))
  const { body={} } = request
  const { status=200,isError=false, message='' } = await AssetModel.findAndDelete(body)
  let res = responseBody(isError,message)
  response.status(status).send(res)
}

async function update(request,response){
  if(!request.id) return response.send(responseBody(403,"Unauthorized"))
  const { body={} } = request
  const { status=200,isError=false, message='' } = await AssetModel.findAndUpdate(body)
  let res = responseBody(isError,message)
  response.status(status).send(res)
}

async function get(request,response){
  if(!request.id) return response.send(responseBody(403,"Unauthorized"))
  const { body={} } = request
  const { status=200,isError=false, message='' } = await AssetModel.findByIP(body)
  let res = responseBody(isError,message)
  response.status(status).send(res)
}