<?php
$data = array('stats'=>array('unseen_alerts'=> 15, 'totalKms'=> 150, 'overall_avg'=> 25, 'totalLandingTime'=> 15, 'utilization'=> 40 ));

$device1 = array("DeviceID"=>"1",
                  "Vehicle"=>"UP 13 N 4989",
                  "RecivedTime"=>"2015-06-11 04:07:00",
                  "AccOnOff"=>"On",
                  "Location"=>"Greater Noida",
                  "Speed"=>"9.99",
                  "Rpm"=>"2000",
                  "Lat"=>"28.4962",
                  "Lng"=>"77.536",
                  "Temprature"=>"9.99");

$device2 = array("DeviceID"=>"2",
                 "Vehicle"=>" DL 4C 9 2969",
                 "RecivedTime"=>"2015-06-11 04:07:00",
                 "AccOnOff"=>"On",
                 "Location"=>"Mumbai",
                 "Speed"=>"9.99",
                 "Rpm"=>"2000",
                 "Lat"=>"18.975",
                 "Lng"=>"72.8258",
                 "Temprature"=>"9.99");

$data['devices'] = array($device1, $device2);


print_r(json_encode($data));

?>
