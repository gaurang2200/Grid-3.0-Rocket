import client from "../../config/DB_CONFIG"


async function getAsset(ip,os){
  let assets = await client.search({
    index:`asset_logs_${os}`,
    body:{
      query:{
        term:{
          ip:ip
        }
      }
    }
  })
  const res = assets.body.hits.hits
  return res
}

export default getAsset