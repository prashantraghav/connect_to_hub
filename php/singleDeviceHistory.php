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

$chart_data = array(
               array('date'=>'2012-01-01', 'distance'=>120, 'alert'=>10,'fuel'=>'40'),
               array('date'=>'2012-01-02', 'distance'=>50, 'alert'=>5,  'fuel'=>'10'),
               array('date'=>'2012-01-03', 'distance'=>20, 'alert'=>40, 'fuel'=>'90'),
               array('date'=>'2012-01-04', 'distance'=>90, 'alert'=>50, 'fuel'=>'40'),
               array('date'=>'2012-01-05', 'distance'=>30, 'alert'=>30, 'fuel'=>'50'),
               array('date'=>'2012-01-06', 'distance'=>90, 'alert'=>10, 'fuel'=>'30'),
               array('date'=>'2012-01-07', 'distance'=>100,'alert'=>60, 'fuel'=>'25'),
               array('date'=>'2012-01-08', 'distance'=>80, 'alert'=>40, 'fuel'=>'40'),
               array('date'=>'2012-01-09', 'distance'=>70, 'alert'=>10, 'fuel'=>'20'),
               array('date'=>'2012-01-10', 'distance'=>80, 'alert'=>50, 'fuel'=>'10'),
               array('date'=>'2012-01-11', 'distance'=>60, 'alert'=>35, 'fuel'=>'40'),
              );

$data['routes'] = $routes;
$data['trip'] = $trip1;
$data['chart'] = $chart_data;


print_r(json_encode($data));

?>
