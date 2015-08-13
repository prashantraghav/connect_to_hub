cth.controller('SingleDeviceHistoryController', ['$scope', '$http', '$interval', '$location', '$timeout', 'dateTimeFormat', 
                                         function($scope, $http, $interval, $location, $timeout, $dateTimeFormat){

  $scope.map = new GMaps({div: '#gmap_marker', lat: AGILE_MAP.initLat, lng: AGILE_MAP.initLng, zoom: 10});
  $scope.path = [];
  $scope.filterOptions = [{option: "Week", value:"w"}, {option:"Month", value:"M"}, {option:"Year", value:'Y'}, {option:"Custom", value:'C'}]
  $scope.filterDevices = [{name: "All Devices", value:'0'}];
  $scope.filter = {option: $scope.filterOptions[0].value, device: $scope.filterDevices[0].value, fromDate: null, toDate: null}
  $scope.API_URL = SINGLE_DEVICE_HISTORY_DATA_URL+'?option='+$scope.filter.option+'&device='+$scope.filter.device;

  $scope.mapLivePolyline = function(){
    $scope.map.removePolylines();
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
    $scope.map.removeMarkers();
    var _location = $scope.tripLocation();
    $scope.map.addMarker({lat: _location.destination.lat, lng: _location.destination.lng, icon: AGILE_MAP.marker.icon.default});
    $scope.map.addMarker({lat: _location.source.lat, lng: _location.source.lng, icon: AGILE_MAP.marker.icon.default});
  }

  $scope.add_alert_marker = function(_lat, _lng, alert){
    $scope.map.addMarker({lat: _lat, lng: _lng, icon:  AGILE_MAP.marker.icon.alert, infoWindow: {
      content: '<div style="color:black">'
                +'<b> Description: </b>'+alert.AlarmDescription+'<br/>'
                +'<b> Value: </b>'+alert.AlarmValue+' '+ alert.AlarmUnit+'<br/>'
                +'<b> Location: </b>'+_lat+', '+_lng+'<br/>'
               +'</div>'
    }});
  }

  $scope.playMap = function(play){
    arguments.callee.i = (play) ? 0 : ++arguments.callee.i;
    lat = $scope.routes[arguments.callee.i].lat;
    lng = $scope.routes[arguments.callee.i].lng;
    
    if($scope.routes[arguments.callee.i].alert)
      $scope.add_alert_marker(lat, lng, $scope.routes[arguments.callee.i].alert)

    $scope.path.push([lat, lng]);
    $scope.mapLivePolyline();
    $scope.mapFocus(lat, lng);

    if(arguments.callee.i < $scope.routes.length-1){
      $timeout(function(){
        $scope.playMap()
      }, 2000);
    }
  }

  $scope.playRoute = function(){
    $scope.path = [];
    $scope.showMarkers();
    $scope.playMap(true);
  }

  $scope.drawRoute = function(){
    $scope.path = [];
    $scope.showMarkers();
    angular.forEach($scope.routes, function(route, index){
      $scope.path.push([route.lat, route.lng])
      if(route.alert)
        $scope.add_alert_marker(route.lat, route.lng, route.alert)
    });

    $scope.mapLivePolyline();
    var _location = $scope.tripLocation()
      $scope.mapFocus(_location.destination.lat, _location.destination.lng);
  }

  $scope.drawTripRoute = function(trip_id){
    url = TRIP_DETAILS_DATA_URL+'?trip_id='+trip_id;
    $http.get(url).success(function(data) {
      $scope.trip = data.stats;
      $scope.routes = data.routes;
      $scope.drawRoute();
    });
  }

  $scope.makeChart = function(){
    ChartsAmcharts.init($scope.chart);
  }

  $scope.getAlldevices = function(devices){
    angular.forEach(devices, function(device, index){
      $scope.filterDevices.push({name: device.brand, value: device.DeviceID})
    });
  }

  $scope.refresh = function(first_call) {
    url = $scope.API_URL
    $http.get(url).success(function(data) {

      $scope.trip = data.trip;
      $scope.tripHistory = data.tripHistory;
      $scope.routes = data.routes;
      $scope.chart = data.chart;
      if(first_call) $scope.getAlldevices(data.devices);

      $scope.drawRoute();
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

  $scope.apply_filter = function(){
    if($scope.filter.option !='C'){
      $scope.API_URL = SINGLE_DEVICE_HISTORY_DATA_URL+'?option='+$scope.filter.option+'&device='+$scope.filter.device;
      $scope.refresh();
    }
  }

  $scope.apply_filter_custom = function(){
     $scope.API_URL = SINGLE_DEVICE_HISTORY_DATA_URL+'?fromDate='+$scope.filter.fromDate+'&toDate='+$scope.filter.toDate+'&device='+$scope.filter.device;
     $scope.refresh();
  }

  $scope.refresh(true);

}]);
