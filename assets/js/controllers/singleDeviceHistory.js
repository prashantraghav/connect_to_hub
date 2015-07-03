cth.controller('SingleDeviceHistoryController', ['$scope', '$http', '$interval', '$location', function($scope, $http, $interval, $location ){

  $scope.trip_id = $location.search()['trip_id']
  $scope.map = new GMaps({div: '#gmap_marker', lat: AGILE_MAP.initLat, lng: AGILE_MAP.initLng, zoom: AGILE_MAP.initZoom});
  $scope.path = [];

  $scope.mapLivePolyline = function(){
    $scope.map.drawPolyline({
      path: $scope.path,
      strokeColor: AGILE_MAP.polyline.strokeColor,
      strokeOpacity: AGILE_MAP.polyline.strokeOpacity,
      strokeWeight: AGILE_MAP.polyline.strokeWeight
    });
  };

  $scope.tripLocation = function(){
    return { 
      source: {lat: $scope.path[0][0], lng: $scope.path[0][1]},
      destination: {lat: $scope.path[$scope.path.length-1][0], lng: $scope.path[$scope.path.length-1][1]}
    };
  }

  $scope.mapFocus = function(){
    var myLatlng = new google.maps.LatLng($scope.tripLocation().destination.lat, $scope.tripLocation().destination.lng);
    $scope.map.panTo(myLatlng);
  };

  
  $scope.showMarkers = function(){
    var _location = $scope.tripLocation();
    $scope.map.addMarker({lat: _location.destination.lat, lng: _location.destination.lng, icon: AGILE_MAP.marker.icon});
    $scope.map.addMarker({lat: _location.source.lat, lng: _location.source.lng, icon: AGILE_MAP.marker.icon});
  }

  $scope.drawMap = function(){
    $scope.mapLivePolyline();
    $scope.showMarkers();
    $scope.mapFocus();
    $scope.map.setZoom(10);
  }

  $scope.makeChart = function(){
    ChartsAmcharts.init($scope.chart);
  }

  $scope.refresh = function() {
    url = SINGLE_DEVICE_HISTORY_DATA_URL+'?trip='+$scope.trip_id;
    $http.get(url).success(function(data) {
      $scope.trip = data.trip;
      $scope.routes = data.routes;
      $scope.chart = data.chart
      $.each($scope.routes, function(i, route){
        $scope.path.push([route.lat, route.lng]);
      });
      $scope.drawMap();
      $scope.makeChart();
    });
  };

  $scope.refresh();

  //$interval( $scope.refresh, 2000); 
}]);
