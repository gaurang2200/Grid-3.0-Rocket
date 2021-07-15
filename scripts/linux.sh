hostname=$(cat /proc/sys/kernel/hostname)
lastseen=$(last)
os=$(cat /etc/os-release | head -n 2 | tail -n 1 | cut -d '=' -f 2)
domain=$(hostname -d)
publicIP=$(host myip.opendns.com resolver1.opendns.com | tail -n 1 | cut -d ' ' -f 4)

print(){
    echo  { \"hostname\": \"$hostname\"  ,\"lastSeen\":\"$lastseen\" ,\"os\":$os  ,\"domain\": \"$domain\" ,\"publicIP\": \"$publicIP\" }
}

