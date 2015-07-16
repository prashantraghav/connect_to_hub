// data from api must be in given format 

/* data = {"stats":{"alerts":15,"totalKms":150,"overall_avg":25,"totalLandingTime":15,"utilization":40},"devices":[{"DeviceID":"1","Vehicle":"UP 13 N 4989","RecivedTime":"2015-06-11 04:07:00","AccOnOff":"On","Location":"Greater Noida","Speed":"9.99","Rpm":"2000","Lat":"28.4962","Lng":"77.536","Temprature":"9.99"},{"DeviceID":"2","Vehicle":" DL 4C 9 2969","RecivedTime":"2015-06-11 04:07:00","AccOnOff":"On","Location":"Mumbai","Speed":"9.99","Rpm":"2000","Lat":"18.975","Lng":"72.8258","Temprature":"9.99"}]} */


cth.controller('AlertsController', ['$scope', '$http', '$interval', function($scope, $http, $interval){
  
  $scope.refresh = function() {
    url = ALERTS_DATA_URL;
    $http.get(url).success(function(data) {
      $scope.unseen_alerts = data.unseen_alerts;
      $scope.seen_alerts = data.seen_alerts;
      $scope.alerts = data.unseen_alerts.concat(data.seen_alerts);
    });
  };

  $scope.dateFormat = function(dateTime){
    date = new Date(dateTime);
    return date;
  };


  $scope.refresh();

  $interval( $scope.refresh, DATA_INTERVAL_TIME);
}]);
