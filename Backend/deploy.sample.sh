#!/bin/bash

#### Elastic Search Config
export ELASTICSEARCH_NODE=<Enter Elastic Search URL>
export ELASTIC_USERNAME=<Elastic Username>
export ELASTIC_PASSWORD=<Elastic Password>
#

#### Script Path
#### Change following path as you needed
export PS_SCRIPT_PATH=$HOME/Grid-3.0-Rocket/Backend/scripts/windows.ps1
export SH_SCRIPT_PATH=$HOME/Grid-3.0-Rocket/Backend/scripts/linux.sh
#

##### Database Config
export MONGO_DBNAME=<DB NAME>
export MONGO_HOSTS=<DB URL>
export MONGO_USERNAME=<DB Username>
export MONGO_PASSWORD=<DB Password>
export MONGO_READ_PREFERENCE=primary
export MONGO_PEM_PATH=
#

##### JWT SECRET
export JWT_SECRET_KEY=<JWT Secret Token>


#### Kibana URL
export KIBANA_URL=<Kibana URL>

#### Cron Period
export CRON_TIME='*/15 * * * *'

npm start