cth.controller('SingleDeviceController', ['$scope', '$http', '$interval', '$location', '$timeout', 'dateTimeFormat', function($scope, $http, $interval, $location, $timeout, $dateTimeFormat){

  $scope.device_id = $location.search()['device']
  $scope.map = new GMaps({div: '#gmap_marker', lat: AGILE_MAP.initLat, lng: AGILE_MAP.initLng, zoom: AGILE_MAP.initZoom});
  $scope.path = [];
  $scope.live_alert_marker = [];
  $scope.liveMap = true;

  $scope.speed = function(){
    $(".knob").val($scope.device.Speed).trigger('change');
    //$("#div_speedometer").speedometer({ percentage: $scope.device.Speed || 0 });
  };

  $scope.drawPolyline = function(){
    $scope.map.removePolylines();
    $scope.map.drawPolyline({
      path: $scope.path,
      strokeColor: AGILE_MAP.polyline.strokeColor,
      strokeOpacity: AGILE_MAP.polyline.strokeOpacity,
      strokeWeight: AGILE_MAP.polyline.strokeWeight
    });
  };

  $scope.mapFocus = function(_lat, _lng){
    var myLatlng = new google.maps.LatLng(_lat, _lng);
    $scope.map.panTo(myLatlng);
  };

  $scope.setLiveMap = function(val){
    $scope.liveMap = val;
    $scope.path = [];
    $scope.live_alert_marker = [];
  }

  $scope.drawLiveMap = function(){
    if($scope.liveMap){
      $scope.map_routes = "Live Routes"
      $scope.map.removeMarkers();
      $scope.path.push([$scope.device.Lat, $scope.device.Lng]);

      if($scope.device.alert)
        $scope.live_alert_marker.push({lat: $scope.device.Lat, lng: $scope.device.Lng, alert: $scope.device.alert});

      angular.forEach($scope.live_alert_marker, function(al, index){
        $scope.add_alert_marker(al.lat, al.lng, al.alert)
      });

      $scope.drawPolyline();
      $scope.map.addMarker({lat: $scope.device.Lat, lng: $scope.device.Lng, title: $scope.device.Vehicle, icon: AGILE_MAP.marker.icon.default});
      $scope.mapFocus($scope.device.Lat, $scope.device.Lng);
    }
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


  $scope.drawTripRoute = function(trip_id){
    $scope.setLiveMap(false);
    $scope.map_routes = "Routes History"
    $scope.map.removeMarkers();
    url = TRIP_DETAILS_DATA_URL+'?trip_id='+trip_id;
    $http.get(url).success(function(data) {
      $scope.routes = data.routes
      angular.forEach($scope.routes, function(route, index){
        $scope.path.push([route.lat, route.lng]);
        if(route.alert)
          $scope.add_alert_marker(route.lat, route.lng, route.alert)
      });
      $scope.drawPolyline();
      $scope.map.addMarker({lat:$scope.routes[0].lat, lng: $scope.routes[0].lng, icon: AGILE_MAP.marker.icon.default});
      $scope.map.addMarker({lat:$scope.routes[$scope.routes.length-1].lat, lng: $scope.routes[$scope.routes.length-1].lng, icon: AGILE_MAP.marker.icon.default});
      $scope.mapFocus($scope.routes[$scope.routes.length-1].lat, $scope.routes[$scope.routes.length-1].lng);
    });
  }

  $scope.playRoute = function(play){
    $scope.hideLive = true;
    arguments.callee.i = (play) ? 0 : ++arguments.callee.i;
    lat = $scope.routes[arguments.callee.i].lat;
    lng = $scope.routes[arguments.callee.i].lng;

    if($scope.routes[arguments.callee.i].alert)
      $scope.add_alert_marker(lat, lng, $scope.routes[arguments.callee.i].alert)

    $scope.path.push([lat, lng]);
    $scope.drawPolyline();
    $scope.mapFocus(lat, lng);

    if(arguments.callee.i < $scope.routes.length-1){
      $timeout(function(){
        $scope.playRoute()
      }, 2000);
    }else{
      $scope.hideLive = false;
    }
  }

  $scope.playTripRoute = function(){
    $scope.map.removePolylines();
    $scope.map.removeMarkers();
    $scope.path = [];
    $scope.playRoute(true);
    $scope.map.addMarker({lat:$scope.routes[0].lat, lng: $scope.routes[0].lng, icon: AGILE_MAP.marker.icon.default});
    $scope.map.addMarker({lat:$scope.routes[$scope.routes.length-1].lat, lng: $scope.routes[$scope.routes.length-1].lng, icon: AGILE_MAP.marker.icon.default});
  }



  $scope.refresh = function() {
    url = SINGLE_DEVICE_DATA_URL+'?device='+$scope.device_id;
    $http.get(url).success(function(data) {
      $scope.stats = data.stats;
      $scope.device = data.device;
      $scope.trips = data.trips;
      $scope.drawLiveMap();
      $scope.speed();
      $scope.temp();
    });
  };

  $scope.goToHistoryPage = function(trip_id){
    $location.path('singleDeviceHistory').search({'trip_id': trip_id});
  }

  $scope.dateFormat = function(dateTime){
    return $dateTimeFormat.date(dateTime);
  }

  $scope.timeFormat = function(dateTime){
    return $dateTimeFormat.time(dateTime);
  }

  $scope.temp = function(){
    $("#range_6").ionRangeSlider("update",{from: $scope.device.Temprature})
  }

  $scope.refresh();
  $interval($scope.refresh, DATA_INTERVAL_TIME); 
}]);
