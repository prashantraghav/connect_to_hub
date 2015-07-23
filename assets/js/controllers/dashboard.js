cth.controller('DashboardController', ['$scope', '$http', '$interval', '$location', 'dateTimeFormat', function($scope, $http, $interval, $location, $dateTimeFormat){
  
  $scope.map = new GMaps({div: '#gmap_marker', lat: AGILE_MAP.initLat, lng: AGILE_MAP.initLng, zoom: AGILE_MAP.initZoom});
  $scope.infoWindow = new google.maps.InfoWindow;

  $scope.refresh = function() {
    url = DASHBOARD_DATA_URL;
    $http.get(url).success(function(data) {
      $scope.stats = data.stats;
      $scope.devices = data.devices;
      $scope.map.removeMarkers();
      $.each($scope.devices, function(i, dev){
        $scope.map.addMarker({
          lat: dev.Lat, 
          lng: dev.Lng, 
          title: dev.Vehicle, 
          icon: AGILE_MAP.marker.icon, 
          infoWindow: {
            content: $scope.infoWindowContent(dev),
          },
        });
      });
    });
  };

    $scope.infoWindowContent = function(dev){
      return '<div style="color:black">'
             +'<b>Fleet ID </b> '+dev.DeviceID+'<br/>'
             +'<b>Vehicle:</b> '+dev.Vehicle+' ('+dev.Brand+')<br/>'
             +'<b>RecivedTime:</b> '+$scope.timeFormat(dev.RecivedTime)+' '+$scope.dateFormat(dev.RecivedTime)+'<br/>'
             +'<b>Acc On/Off:</b> '+dev.AccOnOff+'<br/>'
             +'<b>Speed:</b> '+dev.Speed+' <br/>'
             +'<b>Location:</b> '+dev.Location+'<br/>'
             +'</div>';
    }


    $scope.goToSingleDevicePage = function(device_id){
      $location.path('singleDevice').search({'device': device_id});
    }


  $scope.mapFocus = function(lat, lng){
    var myLatlng = new google.maps.LatLng(lat, lng);
    $scope.map.panTo(myLatlng);
  };


  $scope.dateFormat = function(dateTime){
    return $dateTimeFormat.date(dateTime);
  }

  $scope.timeFormat = function(dateTime){
    return $dateTimeFormat.time(dateTime);
  }



  $scope.refresh();

  $interval($scope.refresh, DATA_INTERVAL_TIME);
}]);
