
angular.module('MyApp').controller('loginController', function ($scope,$http,$state,$httpParamSerializerJQLike) {
	
    $scope.login=function(){
    	sessionStorage.token=$scope.user.token;
    	$state.go("app.home");
    };
});