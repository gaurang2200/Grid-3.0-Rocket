'use strict'

import { SERVER_CONFIG,MONGO_CONFIG } from './config'
import { cron } from './api/helpers'

const { PORT } = SERVER_CONFIG
const { mongoConnect } = MONGO_CONFIG


const startServer = async (app) => {
  try {
    await mongoConnect()
    await app.listen(PORT)
    await cron()
    console.log(`[Info] Server Started Successfully! Listening on Port: ${PORT}`)
  } catch (error) {
    console.log(error)
    throw error
  }
}

export default startServer
