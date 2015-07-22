cth.controller('SingleDeviceController', ['$scope', '$http', '$interval', '$location', function($scope, $http, $interval, $location ){

  $scope.device_id = $location.search()['device']
  $scope.map = new GMaps({div: '#gmap_marker', lat: AGILE_MAP.initLat, lng: AGILE_MAP.initLng, zoom: AGILE_MAP.initZoom});
  $scope.path = [];

  $scope.speed = function(){
      //$("#div_speedometer").speedometer({ percentage: $scope.device.Speed || 0 });
  };

  $scope.mapLivePolyline = function(){
    $scope.map.drawPolyline({
      path: $scope.path,
      strokeColor: AGILE_MAP.polyline.strokeColor,
      strokeOpacity: AGILE_MAP.polyline.strokeOpacity,
      strokeWeight: AGILE_MAP.polyline.strokeWeight
    });
  };

  $scope.mapFocus = function(){
    var myLatlng = new google.maps.LatLng($scope.device.Lat, $scope.device.Lng);
    $scope.map.panTo(myLatlng);
  };

  $scope.drawMap = function(){
    $scope.map.removeMarkers();
    $scope.path.push([$scope.device.Lat, $scope.device.Lng]);
    $scope.mapLivePolyline();
    $scope.map.addMarker({lat: $scope.device.Lat, lng: $scope.device.Lng, title: $scope.device.Vehicle, icon: AGILE_MAP.marker.icon});
    $scope.mapFocus();
    $scope.map.setZoom(8);
  }


  $scope.refresh = function() {
    url = SINGLE_DEVICE_DATA_URL+'?device='+$scope.device_id;
    $http.get(url).success(function(data) {
      $scope.stats = data.stats;
      $scope.device = data.device;
      $scope.trips = data.trips;
      $scope.drawMap();
      $scope.speed();
    });
  };

  $scope.goToHistoryPage = function(trip_id){
    $location.path('singleDeviceHistory').search({'trip_id': trip_id});
  }

  $scope.refresh();

  $interval( $scope.refresh, DATA_INTERVAL_TIME); 
}]);
