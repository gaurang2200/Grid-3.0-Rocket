import { Client } from 'ssh2'
import minify from './Minifier'

const ssh2 = new Client()

export default async (host, port, os, user, password, privateKey) => {

  return new Promise((resolve, reject) => {

    let result = ""

    ssh2.on('ready', () => {

      console.log('Client :: ready');

      var script;

      if (os == 'win64' || os == 'win32')
        script = `powershell -command "${minify(process.env.PS_SCRIPT_PATH)}`
      else
        script = minify(process.env.SH_SCRIPT_PATH);

      ssh2.exec(script, (err, stream) => {

        if (err) console.error(err.message);

        stream.on('close', (code, signal) => {
          console.log('Stream :: close :: code: ' + code + ', signal: ' + signal)
          ssh2.end()
          resolve(result)
        }).on('data', (data) => {
          try {
            data = JSON.parse(data.toString('utf8'))
            result = data
          }
          catch { }
        }).stderr.on('data', (data) => {
          console.log('STDERR: ' + data);
        });

        process.on('uncaughtException', (err) => {
          console.log(`Error Ignored`)
        })

      });
    }).connect({
      host: host,
      port: port,
      username: user,
      password: password
    });
  })
}


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
