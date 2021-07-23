'use strict'

import mongoose from 'mongoose'
import fs from 'fs'

const {
  MONGO_DBNAME = '',
  MONGO_HOSTS = '',
  MONGO_USERNAME = '',
  MONGO_PASSWORD = '',
  MONGO_REPLICASET,
  MONGO_READ_PREFERENCE,
  MONGO_PEM_PATH = '',
  MONGO_SERVER_IDENTITY_CHECK = 'true'
} = process.env

const REQUIRED_CONFIG = [
  'MONGO_DBNAME',
  'MONGO_HOSTS',
  'MONGO_USERNAME',
  'MONGO_PASSWORD'
  // 'MONGO_PEM_PATH'
]

const sslCA = MONGO_PEM_PATH && [fs.readFileSync(MONGO_PEM_PATH)]

REQUIRED_CONFIG.forEach(key => {
  if (!process.env[key]) {
    console.error('[Error] Missing MongoDB Config:', key)
    return process.exit(1)
  }
})

const MONGO_CREDENTIALS = encodeURIComponent(MONGO_USERNAME) + ':' + encodeURIComponent(MONGO_PASSWORD)
const CONNECTION_URI = `mongodb+srv://${MONGO_CREDENTIALS}@${MONGO_HOSTS}/${MONGO_DBNAME}`

const SSL_CONFIG = MONGO_PEM_PATH ? {
  ssl: true,
  sslValidate: true,
  checkServerIdentity: MONGO_SERVER_IDENTITY_CHECK === 'true',
  sslCA
} : {}

const CONFIG = {
  DBNAME: MONGO_DBNAME,
  CONNECTION_URI,
  OPTIONS: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    promiseLibrary: Promise,
    poolSize: 10,

    replicaSet: MONGO_REPLICASET,
    readPreference: MONGO_READ_PREFERENCE,
    ...SSL_CONFIG
  }
}

mongoose.connection.on('connected', () => {
  console.log('[Info] DB Connection Established')
})

mongoose.connection.on('reconnected', () => {
  console.log('[Info] DB Connection Re-established')
})

mongoose.connection.on('disconnected', () => {
  console.log('[Error] DB Connection Disconnected')
})

mongoose.connection.on('close', () => {
  console.log('[Info] DB Connection Closed')
})

mongoose.connection.on('error', (error) => {
  throw error
})

if (process.env.APP_ENVIROMENT === 'dev') { mongoose.set('debug', true) }

const mongoConnect = async () => {
  console.log('[Connection] Connecting to DB...')
  await mongoose.connect(CONNECTION_URI, CONFIG.OPTIONS)
}

const MONGO_CONFIG = { CONFIG, mongoConnect }

export default MONGO_CONFIG
