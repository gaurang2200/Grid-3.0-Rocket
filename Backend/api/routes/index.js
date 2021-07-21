"use strict";

import AssetRouter from './Asset';

const Routes = [
  { path:'/add/ip',router: AssetRouter }
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
