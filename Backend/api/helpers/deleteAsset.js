import {client} from "../../config"

async function deleteAsset(ip,os) {
  try {
    await client.deleteByQuery({
      index: `asset_logs_${os}`,
      body: {
        query: {
          match: {
            'ip': ip
          }
        }
      }
    })
  }
  catch{  }
}


export default deleteAsset