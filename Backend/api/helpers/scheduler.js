import { AssetDAO } from '../daos'
import updateAsset from './updateAsset'
import schedule from 'node-schedule'

const cronTime = process.env.CRON_TIME || '*/15 * * * *'

async function cron(){
  schedule.scheduleJob(cronTime,() => {
    AssetDAO.getAllIps().then((assets)=>{
      assets.forEach(updateAsset)
    })
  })
}

export default cron