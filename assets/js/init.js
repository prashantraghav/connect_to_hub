var cth = angular.module('ConnectToHub', ['ui.router', 'ui.bootstrap', 'oc.lazyLoad', 'ngSanitize']);

cth.config(['$stateProvider', '$urlRouterProvider', function($state, $urlRouter){
  this.getRouteState = function(state){
    return { url: "/"+state,
             templateUrl: "views/"+state+".html",
             data: { pageTitle: state.uppercase },
          }
    }

  
  $urlRouter.otherwise('/dashboard')
  $state
    .state('dashboard', this.getRouteState('dashboard'))
    .state('singleDevice', this.getRouteState('singleDevice'))
    .state('singleDeviceHistory', this.getRouteState('singleDeviceHistory'))
    .state('addDevice', this.getRouteState('addDevice'))
    .state('addEmail', this.getRouteState('addEmail'))
    .state('vehicleGroup', this.getRouteState('vehicleGroup'))
    .state('alertVehicleGroup', this.getRouteState('alertVehicleGroup'))
    .state('eventVehicleGroup', this.getRouteState('eventVehicleGroup'))
    .state('drivingBoard', this.getRouteState('drivingBoard'))
    .state('table', this.getRouteState('datatables/advanced'))
 }]);


/*cth.factory('settings', ['$rootScope', function($rootScope) {
  var settings = {
    layout: {
      pageSidebarClosed: false,
      pageBodySolid: false,
      pageAutoScrollOnLoad: 1000 
     },
     layoutImgPath: Metronic.getAssetsPath() + 'admin/layout/img/',
     layoutCssPath: Metronic.getAssetsPath() + 'admin/layout/css/'
  };
  $rootScope.settings = settings;
  return settings;
}]); */

cth.controller('AppController', ['$scope', '$rootScope', function($scope, $rootScope) {
  $scope.$on('$viewContentLoaded', function() {
    Metronic.initComponents(); // init core components
    Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 
  });
}]);


cth.controller('HeaderController', ['$scope', function($scope) {
  $scope.$on('$includeContentLoaded', function() {
    Layout.initHeader();
  });
}]);

cth.controller('SidebarController', ['$scope', function($scope) {
  $scope.$on('$includeContentLoaded', function() {
    Layout.initSidebar();
  });
}]);

cth.controller('QuickSidebarController', ['$scope', function($scope) {
  $scope.$on('$includeContentLoaded', function() {
    setTimeout(function(){
      QuickSidebar.init();
    }, 2000)
  });
}]);

cth.controller('ThemePanelController', ['$scope', function($scope) {
  $scope.$on('$includeContentLoaded', function() {
    Demo.init(); // init theme panel
  });
}]);

/* Setup Layout Part - Footer */
cth.controller('FooterController', ['$scope', function($scope) {
  $scope.$on('$includeContentLoaded', function() {
    Layout.initFooter(); // init footer
  });
}]);




cth.run(["$rootScope", "$state", function($rootScope, $state) {
      $rootScope.$state = $state; // state to be accessed from view
}]);
