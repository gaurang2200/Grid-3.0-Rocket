import Express from 'express'
import { JWTHelper } from '../middlewares'
import { KibanaController } from '../controllers'

const KibanaRouter = new Express.Router()

export default KibanaRouter

const { get } = KibanaController
const { decryptJWT } = JWTHelper

/**
  * Login User
  * @GET /api/kibana
*/
KibanaRouter.get('/',decryptJWT,get)
