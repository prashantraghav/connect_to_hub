cth.controller('SingleDeviceHistoryController', ['$scope', '$http', '$interval', '$location', '$timeout', 'dateTimeFormat', 
                                         function($scope, $http, $interval, $location, $timeout, $dateTimeFormat){

  $scope.map = new GMaps({div: '#gmap_marker', lat: AGILE_MAP.initLat, lng: AGILE_MAP.initLng, zoom: 10});
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
      source: {lat: $scope.routes[0]['lat'], lng: $scope.routes[0]['lng']},
      destination: {lat: $scope.routes[$scope.routes.length-1]['lat'], lng: $scope.routes[$scope.routes.length-1]['lng']}
    };
  }

  $scope.mapFocus = function(lat, lng){
    var myLatlng = new google.maps.LatLng(lat, lng);
    $scope.map.panTo(myLatlng);
  };


  $scope.showMarkers = function(){
    var _location = $scope.tripLocation();
    $scope.map.addMarker({lat: _location.destination.lat, lng: _location.destination.lng, icon: AGILE_MAP.marker.icon});
    $scope.map.addMarker({lat: _location.source.lat, lng: _location.source.lng, icon: AGILE_MAP.marker.icon});
  }

  $scope.drawMap = function(play){
    arguments.callee.i = (play) ? 0 : ++arguments.callee.i;
    lat = $scope.routes[arguments.callee.i].lat;
    lng = $scope.routes[arguments.callee.i].lng;
    $scope.path.push([lat, lng]);
    $scope.mapLivePolyline();
    $scope.mapFocus(lat, lng);
    if(arguments.callee.i < $scope.routes.length-1){
      $timeout(function(){
        $scope.drawMap()
      }, 2000);
    }
  }

  $scope.playRoute = function(){
    $scope.path = [];
    $scope.map.removePolylines();
    $scope.drawMap(true);
  }

  $scope.makeChart = function(){
    ChartsAmcharts.init($scope.chart);
  }

  $scope.refresh = function() {
    trip_id = $location.search()['trip_id']
    url = SINGLE_DEVICE_HISTORY_DATA_URL+'?trip='+trip_id;
    $http.get(url).success(function(data) {

      $scope.trip = data.trip;
      $scope.tripHistory = data.tripHistory;
      $scope.routes = data.routes;
      $scope.chart = data.chart;

      $scope.playRoute();
      $scope.showMarkers();
      $scope.makeChart();
    });
  };

  $scope.goToHistoryPage = function(trip_id){
    $location.path('singleDeviceHistory').search({'trip_id': trip_id});
    $scope.refresh();
  }

  $scope.dateFormat = function(dateTime){
    return $dateTimeFormat.date(dateTime);
  }

  $scope.timeFormat = function(dateTime){
    return $dateTimeFormat.time(dateTime);
  }

  $scope.refresh();

}]);
