'use strict';

/* Controllers */


angular.module('MyApp').controller('loginController', function($scope,$http,Md5) {
	 $scope.user = {
	 	username : "chenhc",
      	password : "111111"
	 }
  	 $scope.userCode = {
  	  client_id: "leopard-web-id",
  	  redirect_uri:"http://localhost:8080/test/1",
  	  response_type:"code",
      username : "chenhc",
      password : "111111"
     };
     $scope.userToken = {
  	  client_id: "leopard-web-id",
  	  redirect_uri:"http://localhost:8080/test/1",
  	  code:"11",
  	  grant_type:"authorization_code",
  	  client_secret:"leopard-web-secret",
      password : "111111"
     };
    // function to submit the form after all validation has occurred            
    $scope.login = function(user) {
        // $scope.userEncrypted.username = user.username;
        // $scope.userEncrypted.password = Md5.hex_md5(user.password);
        $scope.submit($scope.userCode);
    };

    $scope.submit = function (userCode) {
      var a = $.param(userCode);
      $http({
      		// withCredentials: true,
            method: 'POST',
            data: a,
            url: login_url,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallback(response) {
        		if(response.data.success == true){
        			$scope.userToken.code = response.data.data;
        			PostAccessToken($scope.userToken);
        		}
        		else{
        			alert(response.data.message);
        		}
				

            }, function errorCallback(response) {
                // 请求失败执行代码
                alert("访问失败");

        });
    };

    function PostAccessToken(userToken){
    	var serializedData = $.param(userToken);
    	$http({
    		// withCredentials: true,
            method: 'POST',
            url: accessToken_url,
            data: serializedData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallback(response) {
        		if(response.data.success == true){
        			sessionStorage = response.data.data;
        			alert(sessionStorage);
        		}
        		else{
        			alert(response.data.message);
        		}				
            }, function errorCallback(response) {
                // 请求失败执行代码
                alert("认证失败");

        });
    }

})


