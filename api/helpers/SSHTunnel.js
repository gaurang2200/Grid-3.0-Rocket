import { Client } from 'ssh2';
import minify from './Minifier';

var conn = new Client();

export default (host, port, os, user, key) => {

  conn.on('ready', () => {

    console.log('Client :: ready');

    var script;

    if (os == 'win64' || os == 'win32')
      script = `powershell -command "${minify(process.env.PS_SCRIPT_PATH)}`
    else
      script = minify(process.env.SH_SCRIPT_PATH);

    conn.exec(script, (err, stream) => {

      if (err) console.error(err.message);

      stream.on('close', (code, signal) => {
        console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
        conn.end();
      }).on('data', (data) => {
        console.log(data.toString('utf8'))
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
    privateKey: key
  });
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
