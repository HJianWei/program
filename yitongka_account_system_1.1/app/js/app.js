'use strict';
var app=angular.module('MyApp', ['ui.router','oc.lazyLoad']);
	//增加拦截器
	app.config(['$httpProvider', function($httpProvider){
		$httpProvider.interceptors.push(HttpInterceptor);
	}]);
	
	//配置路由
    app.config(function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {  
        $urlRouterProvider.otherwise("/app/home");  
        $stateProvider.state('app', {  
            url: "/app",  
            abstract:true,  
            templateUrl: "menu/menu.html",  
            controller: 'MainController' ,
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){//这两行就是loader的使用，此行写法固定
                    return $ocLazyLoad.load(['menu/menu.js']);//后面这个就是进入这个模板时候要加载进来的js
                }]
            }
        })  
        .state('app.home', {  
        	url: "/home",  
        	templateUrl: "home/home.html"  ,
        	controller: 'HomeController',
        	resolve: {
        		loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){//这两行就是loader的使用，此行写法固定
        			return $ocLazyLoad.load(['home/home.js']);//后面这个就是进入这个模板时候要加载进来的js
        		}]
        	}
        }) 
        .state('app.home2', {  
        	url: "/home2",  
        	templateUrl: "home/home2.html"
        })  
        .state('app.article', {  
        	url: "/article",  
        	template: "文章"  
        })  
        .state('app.photo', {  
        	url: "/photo",  
        	template: "相册"  
        })  
        .state('app.music', {  
        	url: "/music",  
        	template: "音乐"  
        })  
        .state('app.comment', {  
        	url: "/comment",  
        	template: "留言板"  
        })  
        .state('app.user', {  //用户管理
        	url: "/user",  
            templateUrl: "user/user.html"  ,
            controller: 'userController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){//这两行就是loader的使用，此行写法固定
                    return $ocLazyLoad.load(['user/user.js']);//后面这个就是进入这个模板时候要加载进来的js
                }]
            }
        })
        .state('app.auth', {  //权限管理
        	url: "/auth",  
            templateUrl: "auth/auth.html"  ,
            controller: 'authController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){//这两行就是loader的使用，此行写法固定
                    return $ocLazyLoad.load(['auth/auth.js']);//后面这个就是进入这个模板时候要加载进来的js
                }]
            }
        })
        .state('app.role', {  //权限管理
        	url: "/role",  
            templateUrl: "role/role.html"  ,
            controller: 'roleController',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){//这两行就是loader的使用，此行写法固定
                    return $ocLazyLoad.load(['role/role.js']);//后面这个就是进入这个模板时候要加载进来的js
                }]
            }
        })
        .state('login', {  //登录
        	url: "/login",  
            templateUrl: "login/login.html" ,
            controller:"loginController",
            resolve: {
            	loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){//这两行就是loader的使用，此行写法固定
            		return $ocLazyLoad.load(['login/login.js']);//后面这个就是进入这个模板时候要加载进来的js
            	}]
            }
        })
        .state('login2', {  //登录
            url: "/login2",  
            templateUrl: "login2/partials/login.html" ,
            controller:"loginController",
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){//这两行就是loader的使用，此行写法固定
                    return $ocLazyLoad.load(['login2/js/encrypt.js','login2/js/login.js']);//后面这个就是进入这个模板时候要加载进来的js
                }]
            }
        })
        .state('app.error', {  //异常
        	url: "/error",  
            templateUrl: "error.html" ,
        })
        .state('app.organization', {  //机构
            url: "/organization",  
            templateUrl: "organizationDepartment/organization/organization.html" ,
            controller: 'organizationController',
            resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){//这两行就是loader的使用，此行写法固定
                        return $ocLazyLoad.load('organizationDepartment/organization/organization.js');//后面这个就是进入这个模板时候要加载进来的js
                    }]
            }
        })
        .state('app.department', {  //部门
            url: "/department",  
            templateUrl: "organizationDepartment/department/department.html" ,
            controller: 'departmentController',
            resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){//这两行就是loader的使用，此行写法固定
                        return $ocLazyLoad.load('organizationDepartment/department/department.js');//后面这个就是进入这个模板时候要加载进来的js
                    }]
            }
        })
});  
    