import scanAsset from './scanAsset'
import { client } from '../../config'

async function addAsset(asset) {
    let data = await scanAsset(asset)
    client.index({
      index:`asset_logs_${asset.os}`,
      body:data
    })
}

export default addAsset