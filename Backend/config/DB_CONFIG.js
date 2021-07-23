'use strict'

import { Client } from "@elastic/elasticsearch"

const {
    ELASTICSEARCH_NODE='',
    ELASTIC_USERNAME='',
    ELASTIC_PASSWORD=''
} = process.env

const client = new Client({
    node:ELASTICSEARCH_NODE,
    auth:{
        username:ELASTIC_USERNAME,
        password:ELASTIC_PASSWORD
    }
})

export default client