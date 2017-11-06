'use strict';

var myApp = angular.module('myApp', ['ui.router','oc.lazyLoad','ngIdle','ui.bootstrap']);
// Declare app level module which depends on filters, and services
	myApp.config(function($stateProvider,$urlRouterProvider, $ocLazyLoadProvider) {
    $urlRouterProvider.otherwise('/table2');
    $stateProvider.state('view1', 
      {url: '/view1',
        templateUrl: 'partials/partial1.html',
        controller: 'viewController',
         resolve: {
                  loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){//这两行就是loader的使用，此行写法固定
                      return $ocLazyLoad.load('js/viewController.js');//后面这个就是进入这个模板时候要加载进来的js
                  }]
          }
      });
    $stateProvider.state('logout', {url: '/logout',templateUrl: 'partials/partial2.html',controller: 'logoutController'});
    $stateProvider.state('table1', {url: '/table1',templateUrl: 'partials/table1.html',controller: 'Table1Controller'});
    $stateProvider.state('table2', {url: '/table2',templateUrl: 'partials/table2.html',controller: 'Table2Controller'});
    $stateProvider.state('table3', 
      {url: '/table3',
        templateUrl: 'partials/table3.html',
        controller: 'testController',
         resolve: {
                  loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){//这两行就是loader的使用，此行写法固定
                      return $ocLazyLoad.load('js/table3.js');//后面这个就是进入这个模板时候要加载进来的js
                  }]
          }
      });
    $stateProvider.state('department', 
      {url: '/department',
        templateUrl: 'partials/department.html',
        controller: 'departmentController',
         resolve: {
                  loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){//这两行就是loader的使用，此行写法固定
                      return $ocLazyLoad.load('js/department.js');//后面这个就是进入这个模板时候要加载进来的js
                  }]
          }
      });

     $stateProvider.state('table4', 
      {url: '/table4',
        templateUrl: 'partials/table4.html',
        controller: 'Table4Controller',
         resolve: {
                  loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad){//这两行就是loader的使用，此行写法固定
                      return $ocLazyLoad.load('js/Table4Controller.js');//后面这个就是进入这个模板时候要加载进来的js
                  }]
          }
      });
  });












