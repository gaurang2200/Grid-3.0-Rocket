import Express from 'express'
import AssetController from '../controllers'


const AssetRouter = new Express.Router()

export default AssetRouter

const { get,create,del,update } = AssetController

/**
  * Add IP Address to the list
  * @POST /ip/add
  * @body Requires ip,username,password or privateKey
*/
APIRouter.post('/ip/add',create)