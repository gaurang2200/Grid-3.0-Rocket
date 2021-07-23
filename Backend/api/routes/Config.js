import Express from 'express'
import { ConfigController } from '../controllers'

const ConfigRouter = new Express.Router()

export default ConfigRouter

const { regenerate,retry } = ConfigController

ConfigRouter.get('/regenerate',regenerate)

ConfigRouter.post('/retry',retry)