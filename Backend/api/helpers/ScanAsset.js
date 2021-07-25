import Tunnel from './SSHTunnel'
import { client } from '../../config'


async function scanAsset(assets){
  assets.forEach(async(asset)=>{
    try {
      const { ip,port,username,password,os,privateKey } = asset
      let data =  await Tunnel(ip,port,os,username,password,privateKey)
      console.log(data + "~~~~~~~~~~~~~~~~~~~~~~~~~~~");
      client.index({
        index:"asset_logs",
        body:data
      })
    } catch(err) {
      client.index({
        index:"asset_logs",
        body: {
          ip: asset.ip,
          hostname: "NA",
          lastSeen:"NA",
          os: "NA",
          domain:"NA",
          publicIP: "NA",
          active: false 
        }
      })
    }

  })
}

export default scanAsset