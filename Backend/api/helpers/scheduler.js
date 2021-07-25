import { AssetDAO } from '../daos'
import updateAsset from './updateAsset'
import schedule from 'node-schedule'

async function cron(){
  schedule.scheduleJob('*/15 * * * *',() => {
    AssetDAO.getAllIps().then((assets)=>{
      assets.forEach(updateAsset)
    })
  })
}

export default cron