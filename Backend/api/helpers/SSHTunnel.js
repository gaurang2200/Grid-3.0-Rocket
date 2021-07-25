import { Client } from "ssh2";
import minify from "./Minifier";

const ssh2 = new Client();

export default async (ip, port, os, user, password, privateKey) => {
  return new Promise((resolve, reject) => {
    let result = "";

    ssh2
      .on("ready", () => {
        console.log("Client :: ready");

        var script;

        if (os == "win64" || os == "win32")
          script = `powershell -command "${minify(
            process.env.PS_SCRIPT_PATH
          )}`;
        else script = minify(process.env.SH_SCRIPT_PATH);

        ssh2.exec(script, (err, stream) => {
          if (err) console.error(err.message);

          stream
            .on("close", (code, signal) => {
              console.log(
                "Stream :: close :: code: " + code + ", signal: " + signal
              );
              try{
                console.log(result);
                result = JSON.parse(result);
                result["active"] = true;
                result["ip"] = ip;
                resolve(result);
              } catch (err) {
                console.log(err);
              }
              ssh2.end();
            })
            .on("data", (data) => {
              try {
                // console.log(data.toString("utf8"));
                // data = JSON.parse(data.toString("utf8"));
                result += data.toString("utf8");
              } catch (err) {
                console.log(err)
              }
            })
            .stderr.on("data", (data) => {
              console.log("STDERR: " + data);
            })

          process.on("uncaughtException", (err) => {
            console.log(`Error Ignored`);
          });
        });
      })
      .connect({
        host: ip,
        port: port,
        username: user,
        password: password,
        readyTimeout: 5000,
      });

      ssh2.on('error', (err) => {
        console.log(err)
        reject(err)
      })
  });
};

/*
Object Structure:

{
    'macAddress':'',
    'ipAddress':'X.X.X.X',
    'operatingSystem':'ubuntu',
    'hostName':'',
    'lastSeen':'',
    'domainInformation':''
}

*/
