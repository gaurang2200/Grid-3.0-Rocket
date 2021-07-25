import getAsset from './getAsset'
import addAsset from './addAsset'

async function updateAsset(asset) {
  check = await getAsset(asset.ip,asset.os)
  if(!check) return await addAsset(asset)
  deleteAsset(asset)
  addAsset(asset)
}

export default updateAsset