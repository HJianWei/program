var myApp = angular.module('myApp', ["smart-table"]);

	myApp.controller('testController', function ($scope,$http) {

    $scope.itemsByPage=6;
    var choosedRow = null;

    $scope.rowCollection = [];
    init();//获取数据
    function init(){
    $http({
    method: 'GET',
    url: 'http://127.0.0.1:3000/organization'
    }).then(function successCallback(response) {
            //alert("success");
            $scope.rowCollection = response.data;
        }, function errorCallback(response) {
            // 请求失败执行代码
           alert("获取数据失败");
    });//获取服务器的数据
    }

    //remove to the real data holder
    $scope.removeItem = function removeItem(row) {
            var id = row.id;
            $http({
            method: 'DELETE',
            url: 'http://127.0.0.1:3000/organization/'+id
            }).then(function successCallback(response) {
                    init();
                    alert("删除成功");
                }, function errorCallback(response) {
                    // 请求失败执行代码
                   alert("删除失败");
            });//向服务器删除数据
    }

    $scope.update = function(row){
    //显示bootstrap中的模块窗口
        choosedRow = row;
        $scope.prod = {};
        $('#modal-2').modal('show');
            $scope.prod.code = row.organization_code;
            $scope.prod.name = row.organization_name;
            $scope.prod.parent = row.organization_parentId;
            $scope.prod.legalPersonality = row.organization_legalPersonality;
            $scope.prod.address = row.organization_address;
            $scope.prod.license = row.organization_license;
    };

    //定义一个点击确定按钮时触发的事件,
    $scope.ensure = function () {
    $http({
        method: 'PATCH',
        url: 'http://127.0.0.1:3000/organization/'+choosedRow.id,
        data: {organization_code:$scope.prod.code,organization_name:$scope.prod.name,organization_parentId:$scope.prod.parent,organization_legalPersonality:$scope.prod.legalPersonality,organization_address:$scope.prod.address,organization_license:$scope.prod.license}
    }).then(function successCallback(response) {
        init();
        alert("修改成功");
    //关闭模块窗口
    }, function errorCallback(response) {
        // 请求失败执行代码
       alert("修改失败");
    });//向服务器修改数据
    $('#modal-2').modal('hide');
    };

    $scope.addItem = function () {
        //显示bootstrap中的模块窗口
        $('#modal-1').modal('show');
    };

    $scope.save = function(){
        $http({
        method: 'POST',
        url: 'http://127.0.0.1:3000/organization',
        data: {organization_code:$scope.newCode,organization_name:$scope.newName,organization_parentId:$scope.newParent,organization_legalPersonality:$scope.newLegalPersonality,organization_address:$scope.newAddress,organization_license:$scope.newLicense}
        }).then(function successCallback(response) {
                //将添加的值赋给数组
                init();
                //关闭模块窗口
                $('#modal-1').modal('hide');
                alert("添加成功");
                //$scope.rowCollection = response.data;
            }, function errorCallback(response) {
                // 请求失败执行代码
               alert("添加失败");
        });//向服务器新增数据
   };

    //排序自定义规则
    $scope.getters={
        firstName: function (value) {
            //this will sort by the length of the first name string
            return value.firstName.length;
        }
    }
    //条件选择数组
    $scope.predicates = ['organization_code', 'organization_name', 'organization_parentId','organization_legalPersonality','organization_address','organization_license'];
    $scope.selectedPredicate = $scope.predicates[0];

});

    //多选框实现
	myApp.directive('csSelect', function () {
    return {
        require: '^stTable',
        template: '<input type="checkbox"/>',
        scope: {
            row: '=csSelect'
        },
        link: function (scope, element, attr, ctrl) {

            element.bind('change', function (evt) {
                scope.$apply(function () {
                    ctrl.select(scope.row, 'multiple');
                });
            });

            scope.$watch('row.isSelected', function (newValue, oldValue) {
                if (newValue === true) {
                    element.parent().addClass('st-selected');
                } else {
                    element.parent().removeClass('st-selected');
                }
            });
        }
    };
});