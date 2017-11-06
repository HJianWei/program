'use strict';

myApp.config(function ($httpProvider) {
  $httpProvider.interceptors.push('tokenInterceptor');
});

myApp.factory('tokenInterceptor', function ($rootScope, $q) {
  return {
    request: function (config) {
      //window.location = "login.html";
      config.headers = config.headers || {};
      if (window.sessionStorage.token) {
        //alert("yes");
        config.headers.Authorization = 'Bearer ' + window.sessionStorage.token;
        //alert(JSON.stringify(config));
        return config;
      }else{
        alert("请先登录");
        window.location = "login.html";
      }

      //alert(JSON.stringify(config));
      //return config;
    },
    response: function (response) {

      if (response.status === 401) {
        // handle the case where the user is not authenticated
      }
      return response || $q.when(response);
    }
  };
});