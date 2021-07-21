import AssetSchema from '../schemas'
import CRUD from './CRUD'

const AssetDAO = new CRUD('Assets',AssetSchema)

export default AssetDAO