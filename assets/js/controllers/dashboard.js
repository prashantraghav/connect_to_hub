// data from api must be in given format 

/* data = {"stats":{"alerts":15,"totalKms":150,"overall_avg":25,"totalLandingTime":15,"utilization":40},"devices":[{"DeviceID":"1","Vehicle":"UP 13 N 4989","RecivedTime":"2015-06-11 04:07:00","AccOnOff":"On","Location":"Greater Noida","Speed":"9.99","Rpm":"2000","Lat":"28.4962","Lng":"77.536","Temprature":"9.99"},{"DeviceID":"2","Vehicle":" DL 4C 9 2969","RecivedTime":"2015-06-11 04:07:00","AccOnOff":"On","Location":"Mumbai","Speed":"9.99","Rpm":"2000","Lat":"18.975","Lng":"72.8258","Temprature":"9.99"}]} */


cth.controller('DashboardController', ['$scope', '$http', '$interval', function($scope, $http, $interval){
  
  $scope.map = new GMaps({div: '#gmap_marker', lat: AGILE_MAP.initLat, lng: AGILE_MAP.initLng, zoom: AGILE_MAP.initZoom});
  
  $scope.refresh = function() {
    url = DASHBOARD_DATA_URL;
    $http.get(url).success(function(data) {
      $scope.stats = data.stats;
      $scope.devices = data.devices;
      $scope.map.removeMarkers();
      $.each($scope.devices, function(i, dev){
        $scope.map.addMarker({lat: dev.Lat, lng: dev.Lng, title: dev.Vehicle, icon: AGILE_MAP.marker.icon, click: function(e){ $scope.infoDialog(dev.DeviceID)}});
      });
    });
  };

  $scope.infoDialog = function(device_id){
    url = SINGLE_DEVICE_DATA_URL+'?device='+$scope.device_id
    $http.get(url).success(function(data) {
      $scope.dev = data.device;
      $("#fleet_dialog").trigger('click');
    });
  };

  $scope.refresh();

  $interval($scope.refresh, DATA_INTERVAL_TIME);
}]);
