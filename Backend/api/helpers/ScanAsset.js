import Tunnel from './SSHTunnel'
import { client } from '../../config'


async function scanAsset(assets) {
  assets.forEach(async (asset) => {
    const { ip, port, username, password, os, privateKey } = asset

    let trie=0
    
    while (trie != 3) {
      try {
        let data = await Tunnel(ip, port, os, username, password, privateKey)
        client.index({
          index: `asset_logs_${os}`,
          body: data
        })
        break;
      }
      catch {
        trie += 1
        if (trie == 3)
          client.index({
            index: `asset_logs_${os}`,
            body: {
              ip: ip,
              hostname: "NA",
              lastSeen: "NA",
              os: "NA",
              domain: "NA",
              publicIP: "NA",
              active: false
            }
          })
      }
    }
  })
}

export default scanAsset