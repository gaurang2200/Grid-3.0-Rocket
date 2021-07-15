import { Client } from 'ssh2';

var conn = new Client();

var script = fs.readFileSync('script.sh', 'utf8');

conn.on('ready', function() {

    console.log('Client :: ready');

    var myconn = conn.exec(`host  ${CLIENT} bash`,  function(err, stream) {
    
      if (err) throw err;
      stream.write(script)
      stream.on('close', function(code, signal) {
        console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
        conn.end();
      }).on('data', function(data) {
        console.log(data);
      }).stderr.on('data', function(data) {
        console.log('STDERR: ' + data);
      });

    });

    console.log(myconn);
  }).connect({
  host: 'gateway',
  username: 'gergely',
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