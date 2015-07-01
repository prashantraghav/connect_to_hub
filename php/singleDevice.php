<?php
$data = array('stats'=>array('alerts'=> 15, 'totalKms'=> 150, 'landing_hrs'=> 25, 'utilization'=> 40, 'transactions'=>'55', 'newVisits'=>'85', 'bounce'=>'46' ));

$device1 = array("DeviceID"=>"1",
                  "Vehicle"=>"UP 13 N 4989",
                  "RecivedTime"=>"2015-06-11 04:07:00",
                  "AccOnOff"=>"On",
                  "Location"=>"Greater Noida",
                  "Speed"=>"20",
                  "Rpm"=>"2000",
                  "Lat"=>"28.4962",
                  "Lng"=>"77.536",
                  "Temprature"=>"9.99");

$trips = array(
              array("trip_id"=>1, "source"=>'Kanpur', "destination"=>'Lucknow'),
              array("trip_id"=>2, "source"=>'Delhi', "destination"=>'Noida'),
              array("trip_id"=>3, "source"=>'Mumbai', "destination"=>'Delhi')
            );


$data['device'] = $device1;
$data['trips'] = $trips;


print_r(json_encode($data));

?>
