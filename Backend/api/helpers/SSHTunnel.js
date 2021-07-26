import { Client } from "ssh2"
import minify from "./Minifier"


export default async (ip, port, os, user, password, privateKey) => {
  return new Promise((resolve, reject) => {
    let sshOptions

    const conn = new Client()

    if (password)
      sshOptions = {
        host: ip,
        port: port,
        username: user,
        password: password,
        readyTimeout: 5000,
      }
    else
      sshOptions = {
        host: ip,
        port: port,
        username: user,
        privateKey: privateKey,
        readyTimeout: 5000,
      }

    let result = ""

    conn
      .on("ready", () => {

        var script

        if (os == "win64" || os == "win32")
          script = `powershell -command "${minify(process.env.PS_SCRIPT_PATH)}`
        else
          script = minify(process.env.SH_SCRIPT_PATH)

        conn.exec(script, (err, stream) => {
          if (err) { }

          stream
            .on("close", (code, signal) => {
              try {
                result = JSON.parse(result)
                result.active = true
                result.ip = ip
                resolve(result)
              } catch (error) {
                reject(error)
              }
              conn.end()
            })
            .on("data", (data) => {
              try {
                result += data.toString("utf8")
              } catch { }
            })
            .stderr.on("data", () => { })
        })
      }).connect(sshOptions)

    if (process.listeners('uncaughtException').length == 0) {
      process.on("uncaughtException", () => { });
    }

    conn.on('error', (err) => {
      reject(err)
    })
  })
}
