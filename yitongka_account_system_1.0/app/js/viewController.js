'use strict';

    angular.module('myApp').controller('viewController', function($scope,$http) {
		$http({
        method: 'GET',
        url: 'http://192.168.1.142:8080/data/sites.json'
    }).then(function successCallback(response) {
            alert("success");
            console.log(response);
            //$scope.names = response.data.sites;
        }, function errorCallback(response) {
            // 请求失败执行代码
           alert("failed");
    });
  });
 