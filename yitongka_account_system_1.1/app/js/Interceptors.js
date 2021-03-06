angular.module('MyApp').factory('HttpInterceptor', ['$q', HttpInterceptor]);
 
function HttpInterceptor($q,$state) {
 return {
  // 请求发出之前，可以用于添加各种身份验证信息
  request:function(config){
	  
   if(sessionStorage.token) {
    config.headers.token = sessionStorage.token;
   }else{
	   $state.go("login2");
	   //alert('22');
   }
   return config;
  },
  // 请求发出时出错
  requestError: function(err){
   return $q.reject(err);
  },
  // 成功返回了响应
  response: function(res){
   return res;
  },
  // 返回的响应出错，包括后端返回响应时，设置了非 200 的 http 状态码
  responseError: function(err){
	  $state.go("app.error");
   //return $q.reject(err);
  }
 };
}
