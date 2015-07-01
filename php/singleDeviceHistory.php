<?php
$data = array();
$trip1 = array("trip_id"=>"1",
                  "vehicle"=>"UP 13 N 4989",
                  "recivedTime"=>"2015-06-11 04:07:00",
                  "accOnOff"=>"On",
                  "source"=>"Greater Noida",
                  "destination"=>"Gurgaon",
                  "startTime"=>"2015-06-11 04:07:00",
                  "endTime"=>"2015-06-11 07:07:00",
                  "duration"=>"3:00:00",
                  "kms"=>"70",
                  "fuelConsumed"=>"3",
                  "alarms"=>"5");

$routes = array(
              array('lat'=>28.4962, 'lng'=>77.536),
              array('lat'=>28.5700, 'lng'=>77.3200),
              array('lat'=>28.6139, 'lng'=>77.2090),
              array('lat'=>28.4700, 'lng'=>77.0300)
            );

$data['routes'] = $routes;
$data['trip'] = $trip1;


print_r(json_encode($data));

?>
