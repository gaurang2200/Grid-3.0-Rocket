import { Client } from 'ssh2';
import minify from './Minifier';
const fs = require('fs');

var conn = new Client();
var response;
var flag=0;

conn.on('ready', function () {

  console.log('Client :: ready');

  var osys = 'win64';

  var script;

  if(osys == 'win64' || osys == 'win32'){
    script = minify("/home/akash/Grid/Grid-3.0-Rocket/scripts/windows.ps1")
  }
  else{
    script = fs.readFileSync(process.env.LINUX_BASH_SCRIPT, 'utf8');
  }

  conn.exec('powershell', function (err, stream) {
    if (err) console.error(err.message);
    stream.write(script);
    stream.on('close', function (code, signal) {
      console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
      try { conn.end(); } catch (err) { return; }
    }).on('data', function (data) {
      // response = JSON.parse(data.toString('utf8'))
      console.log(data.toString('utf8'))
    }).stderr.on('data', function (data) {
      console.log('STDERR: ' + data);
    });
  });
}).connect({

});


/*
ssh 'ready'

HostName: cat /proc/sys/kernel/hostname
Last Seen: last
Operating System: cat /etc/os-release | head -n 2 | tail -n 1 | cut -d '=' -f 2
Domain Information: hostname -d

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
