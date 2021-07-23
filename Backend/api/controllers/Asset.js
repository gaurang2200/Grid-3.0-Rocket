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
  const { body={} } = request
  const { status=200,isError=false, message='' } = await AssetModel.findOrCreate(body)
  let res = responseBody(isError,message)
  response.status(status).send(res)
}

async function del(request,response){

}

async function update(request,response){

}

async function get(request,response){

}