import Express from 'express'
import { AssetController } from '../controllers'
import { JWTHelper } from '../middlewares'

const AssetRouter = new Express.Router()

export default AssetRouter

const {decryptJWT} = JWTHelper
const { get,create,del,update,all } = AssetController

/**
  * Add IP Address to the list
  * @POST /ip/add
  * @body Requires ip,username,password or privateKey
*/
AssetRouter.post('/add',decryptJWT,create)

/**
  * Add IP Address to the list
  * @POST /api/ip/delete
  * @body Requires ip
*/
AssetRouter.post('/delete',decryptJWT,del)

/**
  * Add IP Address to the list
  * @POST /api/ip/search
  * @body Requires ip
*/
AssetRouter.get('/search',decryptJWT,get)

/**
  * Add IP Address to the list
  * @POST /api/ip/update
  * @body Requires ip and update object with key value pair to update
*/
AssetRouter.post('/update',decryptJWT,update)

/**
  * Get All IP Addresses
  * @GET /api/ip/all
*/
AssetRouter.get('/all',decryptJWT,all)