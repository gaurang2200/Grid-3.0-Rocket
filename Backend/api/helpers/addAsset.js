import scanAsset from './scanAsset'
import { client } from '../../config'

async function addAsset(asset) {
  try{
    let data = await scanAsset(asset)
    client.index({
      index:`asset_logs_${asset.os}`,
      body:data
    })
  }
  catch{ }
}

export default addAsset