cth.controller('AlertsController', ['$scope', '$http', '$interval','dateTimeFormat', function($scope, $http, $interval, $dateTimeFormat){
  
  $scope.refresh = function() {
    url = ALERTS_DATA_URL;
    $http.get(url).success(function(data) {
      $scope.unseen_alerts = data.unseen_alerts;
      $scope.seen_alerts = data.seen_alerts;
      $scope.alerts = data.unseen_alerts.concat(data.seen_alerts);
    });
  };

  $scope.dateFormat = function(dateTime){
    return $dateTimeFormat.date(dateTime);
  }

  $scope.timeFormat = function(dateTime){
    return $dateTimeFormat.time(dateTime);
  }

  $scope.refresh();

  $interval( $scope.refresh, DATA_INTERVAL_TIME);
}]);
