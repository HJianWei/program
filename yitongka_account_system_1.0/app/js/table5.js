var myApp = angular.module('TestApp', ['smart-table']);

	myApp.controller('testController', function ($scope) {

	var nameList = ["Pierre", "Pol", "Jacques", "Robert", "Elisa","黄建伟"],
        cityList = ["莆田", "昆明", "成都", "重庆", "厦门","北京","株洲","上海"];

    $scope.itemsByPage=6;

    function createRandomItem() {
	    var
	        name = nameList[Math.floor(Math.random() * 6)],
	        city = cityList[Math.floor(Math.random() * 8)],
            idx = -1;
	        age = Math.floor(Math.random() * 100);


	    return{
	        name: name,
	        age: age,
	        city: city
	    };
	}

	$scope.rowCollection = [];
    for (var j = 0; j < 10000; j++) {
        $scope.rowCollection.push(createRandomItem());
    }



    /*$scope.rowCollection = [
	    {name:"张三",age:"23",city:"海南"},
	    {name:"李四",age:"25",city:"香港"},
	    {name:"王五",age:"25",city:"济南"},
	    {name:"刘六",age:"22",city:"济南"},
	    {name:"李七",age:"35",city:"烟台"},
	    {name:"张八",age:"32",city:"聊城"},
	    {name:"吕九",age:"30",city:"盘锦"}
	  ];*/

    //remove to the real data holder
    $scope.removeItem = function removeItem(row) {
        var index = $scope.rowCollection.indexOf(row);
        if (index !== -1) {
            $scope.rowCollection.splice(index, 1);
        }
    }

    $scope.update = function(row){
    //显示bootstrap中的模块窗口
        $scope.prod = {};
        $('#modal-2').modal('show');
        var index = $scope.rowCollection.indexOf(row);
        //将选中行的数据绑定到临时对象prod中，在下面的模态窗口中展示出来
        if (index !== -1) {
            $scope.prod.name = $scope.rowCollection[index].name;
            $scope.prod.age = $scope.rowCollection[index].age;
            $scope.prod.city = $scope.rowCollection[index].city;
            //$scope.rowCollection.splice(index, 1);
        }

        //选中行的索引赋值给全局变量idx
        idx = index;
    };

    //定义一个点击确定按钮时触发的事件,
    $scope.ensure = function () {
    $scope.rowCollection[idx].name = $scope.prod.name;
    $scope.rowCollection[idx].age = $scope.prod.age;
    $scope.rowCollection[idx].city = $scope.prod.city;
    //关闭模块窗口
    $('#modal-2').modal('hide');
    };

    $scope.addItem = function () {
        //显示bootstrap中的模块窗口
        $('#modal-1').modal('show');
    };

    $scope.save = function(){
    //将添加的值赋给数组
    $scope.rowCollection.push({name:$scope.newName,age:$scope.newAge,city:$scope.newCity});
    //关闭模块窗口
    $('#modal-1').modal('hide');
   };

    $scope.getters={
        firstName: function (value) {
            //this will sort by the length of the first name string
            return value.firstName.length;
        }
    }

    $scope.predicates = ['name', 'age', 'city'];
    $scope.selectedPredicate = $scope.predicates[0];

});

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