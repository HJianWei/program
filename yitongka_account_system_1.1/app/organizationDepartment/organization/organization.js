var myApp = angular.module('MyApp', ["smart-table"]);

	myApp.controller('organizationController', function ($scope,$http) {

    $scope.itemsByPage=6;
    var choosedRow = null;

    $scope.rowCollection = [];
    init();//获取数据
    function init(){
    $http({
    method: 'POST',
    url: organization_query_url
    }).then(function successCallback(response) {
            //alert(response.data.success);
            console.log(response); 
            //console.log(organiationTest); 
            $scope.rowCollection = response.data.data;
        }, function errorCallback(response) {
            // 请求失败执行代码
           alert("获取数据失败");
    });//获取服务器的数据
    };

    //remove to the real data holder
    $scope.removeItem = function removeItem(row) {
            var id = row.organizationID;
            $http({
            method: 'DELETE',
            url: organization_delete_url+id
            }).then(function successCallback(response) {
                    init();
                    alert("删除成功");
                }, function errorCallback(response) {
                    // 请求失败执行代码
                   alert("删除失败");
            });//向服务器删除数据
    };

    $scope.addItem = function () {
        //显示bootstrap中的模块窗口
        $('#modal-1').modal('show');
    };

    //新建数据
    $scope.save = function(){
        $http({
        method: 'POST',
        url: organization_update_url,
        data: {organizationCode:$scope.newCode,organizationName:$scope.newName,organizationParentId:$scope.newParentId,organizationParentName:$scope.newParentName,organizationLegalPersonality:$scope.newLegalPersonality,organizationAddress:$scope.newAddress,organizationlicense:$scope.newLicense,stage:0}
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



    $scope.update = function(row){
    //显示bootstrap中的模块窗口
        choosedRow = row;
        $scope.prod = {};
        $('#modal-2').modal('show');
            $scope.prod.code = row.organizationCode;
            $scope.prod.name = row.organizationName;
            $scope.prod.parentId = row.organizationParentId;
            $scope.prod.parentName = row.organizationParentName;
            $scope.prod.legalPersonality = row.organizationLegalPersonality;
            $scope.prod.address = row.organizationAddress;
            $scope.prod.license = row.organizationlicense;
    };

    //定义一个点击确定按钮时触发的事件,
    $scope.ensure = function () {
    $http({
        method: 'POST',
        url: organization_update_url,
        data: {organizationID:choosedRow.organizationID,organizationCode:$scope.prod.code,organizationName:$scope.prod.name,organizationParentId:$scope.prod.parentId,organizationParentName:$scope.prod.parentName,organizationLegalPersonality:$scope.prod.legalPersonality,organizationAddress:$scope.prod.address,organizationlicense:$scope.prod.license}
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



    //排序自定义规则
    $scope.getters={
        firstName: function (value) {
            //this will sort by the length of the first name string
            return value.firstName.length;
        }
    }
    //条件选择数组
    $scope.predicates = ['organizationCode', 'organizationName', 'organizationParentName','organizationLegalPersonality','organizationAddress','organizationlicense'];
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