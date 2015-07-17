<?php

$unseen_alerts = array();
$seen_alerts = array();
array_push($unseen_alerts, array("DeviceID"=>"1",
                  "Vehicle"=>"UP 13 N 4989",
                  "RecivedTime"=>"2015-06-11 04:07:00",
                  "GPSFixStatus"=>"On",
                  "AlarmDescription"=>"Ignition ON",
                  "AlarmUnit"=>null,
                  "AlarmValue"=>"0.000",
                  "Lat"=>"28.4962",
                  "Lng"=>"77.536",
                  "seen"=>false));


array_push($seen_alerts, array("DeviceID"=>"2",
                  "Vehicle"=>"DL 4C 2969",
                  "RecivedTime"=>"2015-06-11 04:07:00",
                  "GPSFixStatus"=>"3D Fix",
                  "AlarmDescription"=>"Over Fix",
                  "AlarmUnit"=>'Km/H',
                  "AlarmValue"=>"35",
                  "Lat"=>"28.4962",
                  "Lng"=>"77.536",
                  "seen"=>true));

$data['unseen_alerts'] = $unseen_alerts;
$data['seen_alerts'] = $seen_alerts;


print_r(json_encode($data));

?>
