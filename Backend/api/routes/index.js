"use strict";

import AssetRouter from './Asset'
import KibanaRouter from './Kibana'
import AuthRouter from './Auth'

const Routes = [
  { path:'/api/ip/',router: AssetRouter },
  { path:'/api/kibana/',router:KibanaRouter },
  { path:'/api/auth',router:AuthRouter },
  { path:'/api/hello', router:(req, res) => {
    res.send("Hello World")
  }}
]

Routes.init = (app) => {
  if (!app || !app.use) {
    console.error(
      "[Error] Route Initialization Failed: app / app.use is undefined"
    )
    return process.exit(1)
  }

  // Custom Routes
  Routes.forEach((route) => app.use(route.path, route.router))

  // Final Route Pipeline
  app.use("*", (request, response) => {
    return response.status(404).send({
      error:true,
      message:"Route Not Defined"
    })
  })

}

export default Routes
