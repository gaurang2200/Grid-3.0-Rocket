import Tunnel from './SSHTunnel'
import { client } from '../../config'


async function scanAsset(assets){
  assets.forEach(async(asset)=>{
    const { ip,port,username,password,os,privateKey } = asset


    let data =  await Tunnel(ip,port,os,username,password,privateKey)

    client.index({
      index:"asset_logs",
      body:data
    })

  })
}

export default scanAsset