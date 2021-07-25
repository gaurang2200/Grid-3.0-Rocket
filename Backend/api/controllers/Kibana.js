import { responseBody } from '../helpers'
import { KibanaModel } from '../models'

const KibanaController = {
  get
}

export default KibanaController

async function get(request,response){
  if(!request.id) return response.status(403).send(responseBody(true,"Unauthorized"))
  const { status=200,isError=false, message='' } = await KibanaModel.get()
  let res = responseBody(isError,message)
  response.status(status).send(res)
}