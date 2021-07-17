import { Client } from 'ssh2';
import minify from './Minifier';
const fs = require('fs');

var conn = new Client();

conn.on('ready', function () {
  console.log('Client :: ready');

  var osys = 'linux';
  var script;

  if(osys == 'win64' || osys == 'win32'){
    script = minify(`/home/kaguya/Grid-3.0-Rocket/scripts/windows.ps1`)
    script = `powershell -command "${script}"`;
  } else {
    script = minify('/home/kaguya/Grid-3.0-Rocket/scripts/linux.sh');
  }

  //For windows cmd open -> powershell
  conn.exec(script, function (err, stream) {
    if (err) console.error(err.message);
    stream.on('close', function (code, signal) {
      console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
      conn.end();
    }).on('data', function (data) {
      console.log(data.toString('utf8'))
    }).stderr.on('data', function (data) {
      console.log('STDERR: ' + data);
    })
    process.on('uncaughtException', (err) => {
      console.log(`Error Ignored`)
    })
  });
}).connect({
});


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
