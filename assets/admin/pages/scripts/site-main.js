//var MetronicApp = angular.module('MetronicApp', []);
	  MetronicApp.controller('AddVehicleGroup', function($scope){
        $scope.items = [];

        $scope.add = function () {
          $scope.items.push({ 
            inlineChecked: false,
          });
        };
      })
	  
	  
	  
	  $(".hasclear").keyup(function () {
    var t = $(this);
    t.next('span').toggle(Boolean(t.val()));
});
$(".clearer").hide($(this).prev('input').val());
$(".clearer").click(function () {
    $(this).prev('input').val('').focus();
    $(this).hide();
});










	
