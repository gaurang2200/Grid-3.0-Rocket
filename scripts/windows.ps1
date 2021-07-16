$domainInfo = (Get-ADDomain | ConvertTo-JSON);
$strComputer = get-content env:computername;
$computer = [ADSI]"WinNT://$strComputer";
$objCount = ($computer.psbase.children | measure-object).count;
$Counter = 1;
$result = @();

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
          $result += New-Object PSObject -Property @{
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

$result = $result | select-object Computername, ParentGroup, NameMember, TypeMember, PathMember, isGroupMember, Depth;

$result = ($result | ConvertTo-JSON);
$result;
$domainInfo;