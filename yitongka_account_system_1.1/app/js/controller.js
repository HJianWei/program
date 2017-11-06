angular.module('MyApp').controller('MainController', ['$scope',function($scope) {  
        console.log('init ctrl');  
        $scope.currentType = 'home';  
        $scope.changeTab = function(type){  
            $scope.currentType = type;  
        }; 
    }]);