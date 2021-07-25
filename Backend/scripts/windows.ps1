$strComputer = get-content env:computername;
$computer = [ADSI]"WinNT://$strComputer";
$objCount = ($computer.psbase.children | measure-object).count;
$Counter = 1;
$workgroups = @();

foreach($adsiObj in $computer.psbase.children)
{
  switch -regex($adsiObj.psbase.SchemaClassName)
    {
      "group"
      {
        $group = $adsiObj.name;
        $LocalGroup = [ADSI]"WinNT://$strComputer/$group,group";
        $Members = @($LocalGroup.psbase.Invoke("Members"));
        $objCount = ($Members | measure-object).count;

        $GName = $group.tostring();

        ForEach ($Member In $Members) {
          $Name = $Member.GetType().InvokeMember("Name", "GetProperty", $Null, $Member, $Null);
          $Path = $Member.GetType().InvokeMember("ADsPath", "GetProperty", $Null, $Member, $Null);
          $isGroup = ($Member.GetType().InvokeMember("Class", "GetProperty", $Null, $Member, $Null) -eq "group");
          If (($Path -like "*/$strComputer/*") -Or ($Path -like "WinNT://NT*")) {
              $Type = "Local";
          } Else {$Type = "Domain";}
          $workgroups += New-Object PSObject -Property @{
            Computername = $strComputer;
            NameMember = $Name;
            PathMember = $Path;
            TypeMember = $Type;
            ParentGroup = $GName;
            isGroupMember = $isGroup;
            Depth = $Counter;
          }
        }
      }
    }
}

$workgroups = $workgroups | select-object PathMember;

$workgroups = ($workgroups);

$domainInfo = (Get-ADDomain);

$mac = Get-WmiObject win32_networkadapterconfiguration | Select-Object -Property @{
    Name = "IPAddress";
    Expression = {($PSItem.IPAddress[0]);}
  }, MacAddress | Where IPAddress -NE $null;
$mac = $mac[0].MacAddress;

$hostname = (hostname);
$publicIP = $(Resolve-DnsName -Name myip.opendns.com -Server 208.67.222.220).IPAddress;

$last = Get-ADUser -Filter {Name -eq "Administrator"} -Properties * | Select-Object Name, @{N='LastLogon'; E={[DateTime]::FromFileTime($_.LastLogon)}};

$result = @{
    "publicIP" = $publicIP;
    "mac" = $mac;
    "hostName" = $hostName;
    "domain" = $domainInfo;
    "groups" = $workgroups;
    "os" = "windows";
    "lastSeen" = $last.LastLogon.ToString();
};

$result | ConvertTo-JSON