'use strict';

/* Controllers */

  myApp.
  controller('logoutController', function($scope) {
			 window.location="login.html";
  })
  .controller('Table1Controller',["$scope",function($scope){
   //定义表格内容
   $scope.texts = [
    {name:"张三",age:"23",city:"海南"},
    {name:"李四",age:"25",city:"香港"},
    {name:"王五",age:"25",city:"济南"},
    {name:"刘六",age:"22",city:"济南"},
    {name:"李七",age:"35",city:"烟台"},
    {name:"张八",age:"32",city:"聊城"},
    {name:"吕九",age:"30",city:"盘锦"}
   ];
   //定义一个空对象，用于保存和修改数据时临时存储
   $scope.prod = {};
   //定义一个单击删除按钮时触发的事件，用于删除选中行
   $scope.del = function ($index) {
    if($index>=0){
     if(confirm("是否删除"+$scope.texts[$index].name) ){
      $scope.texts.splice($index,1);
     }
    }
   };
    
   //定义一个全局变量idx,用于存储选中行的索引，方便执行保存操作。idx取值为0、1、、、、都有用，所以暂取值为-1;
   var idx = -1;
   //定义一个点击添加按钮时触发的事件，用于新增数据
   $scope.add = function(){
    //显示bootstrap中的模块窗口
    $('#modal-1').modal('show');
     
   };
   //定义一个点击保存按钮时触发的事件
   $scope.save = function(){
    //将添加的值赋给数组
    $scope.texts.name = $scope.newName;
    $scope.texts.age = $scope.newAge;
    $scope.texts.city = $scope.newCity;
    $scope.texts.push({name:$scope.newName,age:$scope.newAge,city:$scope.newCity});
    //关闭模块窗口
    $('#modal-1').modal('hide');
   };
    
    
   //定义一个点击修改按钮时出发的事件，用于修改数据
   $scope.update = function($index){
    //显示bootstrap中的模块窗口
    $('#modal-2').modal('show');
 
    //将选中行的数据绑定到临时对象prod中，在下面的模态窗口中展示出来
    $scope.prod.name = $scope.texts[$index].name;
    $scope.prod.age = $scope.texts[$index].age;
    $scope.prod.city = $scope.texts[$index].city;
    //选中行的索引赋值给全局变量idx
    idx = $index;
   };
 
   //定义一个点击确定按钮时触发的事件,
   $scope.ensure = function () {
    //将修改后的值赋给数组
    $scope.texts[idx].name = $scope.prod.name;
    $scope.texts[idx].age = $scope.prod.age;
    $scope.texts[idx].city = $scope.prod.city;
    //关闭模块窗口
    $('#modal-2').modal('hide');
   };
   
 	}])
  .controller('Table2Controller',["$scope",function($scope){
     $scope.add = function(){
    alert($('#tb_departments').bootstrapTable('getSelections'));
     
   };
  }]);