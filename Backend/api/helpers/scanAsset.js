import Tunnel from './SSHTunnel'


async function scanAsset(asset) {
    const { ip, port, username, password, os, privateKey } = asset
    let trie=0
    while (trie != 3) {
      try {
        let data = await Tunnel(ip, port, os, username, password, privateKey)
        return data
      }
      catch {
        trie += 1
        if (trie == 3)
          return {
              ip: ip,
              hostname: "N/A",
              lastSeen: "N/A",
              os: "N/A",
              domain: "N/A",
              publicIP: "N/A",
              active: false
            }
        else
          //Retry After 4 seconds
          await new Promise(r => setTimeout(r, 4000))
      }
    }
}

export default scanAsset