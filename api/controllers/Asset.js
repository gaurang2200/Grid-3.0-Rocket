import ResponseBody from '../helpers'
import AssetModel from '../models'

const AssetController = {
  create,
  del,
  update,
  get
}

export default AssetController

async function create(request,response){
  const { body={} } = request
  const { isError, message } = AssetModel.findOrCreate(body);
  let res = new ResponseBody(isError,message);
  response.send(res);
}

async function del(request,response){

}

async function update(request,response){

}

async function get(request,response){

}