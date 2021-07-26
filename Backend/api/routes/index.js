"use strict"

import AssetRouter from './Asset'
import KibanaRouter from './Kibana'
import AuthRouter from './Auth'
import FrontendRouter from './FrontendRoutes'
import path from 'path'

const Routes = [
  { path:'/api/ip/',router: AssetRouter },
  { path:'/api/kibana/',router:KibanaRouter },
  { path:'/api/auth',router:AuthRouter },
  { path:'/', router:FrontendRouter }
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

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../../../Frontend", "build", "index.html"))
  })

  // Final Route Pipeline
  // app.use("*", (request, response) => {
  //   return response.status(404).send({
  //     error:true,
  //     message:"Route Not Defined"
  //   })
  // })

}

export default Routes
