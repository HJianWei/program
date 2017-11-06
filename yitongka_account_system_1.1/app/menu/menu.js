angular.module('MyApp').controller('NavbarCtrl', function ($scope,$http,$location,$state) {
	    $http.get(menu_url).then(function(json){
	        $scope.navbar = json.data;
	    });
	    $scope.logout=function(){
	    	alert(444);
	    	sessionStorage.token="";
	    	$state.go("login");
	    }
    });