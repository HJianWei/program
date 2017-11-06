'use strict';

/* Controllers */

validationApp.controller('LoginController', function($scope,$http,Md5) {
  	 $scope.userEncrypted = {
      username : "123456",
      password : "123456"
     };
    // function to submit the form after all validation has occurred            
    $scope.login = function(user) {

        // // check to make sure the form is completely valid
        // if (user.username=="admin"&&user.password=="admin") {
        //     //alert('our form is amazing');
        //     window.location = "index.html";
         
        // }else{
        // 		alert("用户名或密码错误");
        // }
        $scope.userEncrypted.username = user.username;
        $scope.userEncrypted.password = Md5.hex_md5(user.password);
        //alert("用户名:"+user.username+"密码:"+user.password+" 加密后的密码："+$scope.userEncrypted.password);
        $scope.submit($scope.userEncrypted);
        //window.location = "data/imitationToken.json";
    };

    $scope.submit = function (userEncrypted) {
      $http({
            method: 'get',
            //先于get代替，post不可用
            data: userEncrypted,
            url: 'data/imitationToken.json'
        }).then(function successCallback(response) {
                  //alert(JSON.stringify(response.data));
                  // $window.sessionStorage.token = data.token;
                    window.sessionStorage.token = "tokenTest";
                    //alert(window.localStorage.token);
                    window.location = "index.html";
                  // $scope.message = 'Welcome';
            }, function errorCallback(response) {
                // 请求失败执行代码
                         // Erase the token if the user fails to log in
                         delete window.sessionStorage.token;
                         alert("访问失败");
                // // Handle login errors here
                // $scope.message = 'Error: Invalid user or password';
        });

    };

})



