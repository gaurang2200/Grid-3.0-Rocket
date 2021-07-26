'use strict'
import getAsset from './getAsset'
import addAsset from './addAsset'
import deleteAsset from './deleteAsset'

async function updateAsset(asset) {
  let check = await getAsset(asset.ip,asset.os)
  if(check.length==0) return await addAsset(asset)
  await deleteAsset(asset.ip,asset.os)
  await addAsset(asset)
}

export default updateAsset