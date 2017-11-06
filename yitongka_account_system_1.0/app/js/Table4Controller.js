//http://wenzhixin.net.cn/p/bootstrap-table/docs/getting-started.html
angular.module('app', ['bsTable'])
.controller('Table4Controller', function ($scope, $http) {
    //$scope.workspaces = [];
    $scope.arrayData = [
                  {name:"张三",age:"23",city:"海南",id:"0"},
                  {name:"李四",age:"25",city:"香港",id:"1"},
                  {name:"王五",age:"25",city:"济南",id:"2"},
                  {name:"刘六",age:"22",city:"济南",id:"3"},
                  {name:"李七",age:"35",city:"烟台",id:"4"},
                  {name:"张八",age:"32",city:"聊城",id:"5"},
                  {name:"吕九",age:"30",city:"莆田",id:"6"},
                  {name:"黄十",age:"31",city:"秀屿",id:"7"},
                  {name:"陈十一",age:"3",city:"荔城",id:"8"},
                  {name:"易十二",age:"8",city:"重庆",id:"9"},
                  {name:"阳十三",age:"14",city:"成都",id:"10"},
                  {name:"天十四",age:"2",city:"昆明",id:"11"},
                 ];
      
        $scope.initTable = {
            options: {
                //url: 'http://localhost:8000/app/data/huangjianwei.json',         //请求后台的URL（*）
                data: $scope.arrayData,
                rowStyle: function (row, index) {
                    return { classes: 'none' };
                },
                toolbar: '#toolbar',                //工具按钮用哪个容器
                cache: false,
                //height: 400,
                striped: true,
                pagination: true,
                pageSize: 10,
                pageList: [5, 10, 25, 50, 100, 200],
                search: true,
                showColumns: true,
                showRefresh: false,
                minimumCountColumns: 2,
                clickToSelect: false,
                showToggle: true,
                maintainSelected: true,
                columns: [{
                    field: 'state',
                    checkbox: true
                }, {
                    field: 'name',
                    title: '姓名',
                    align: 'center',
                    valign: 'bottom',
                    sortable: true
                }, {
                    field: 'age',
                    title: '年龄',
                    align: 'center',
                    valign: 'bottom',
                    sortable: true
                }, {
                    field: 'city',
                    title: '城市',
                    align: 'center',
                    valign: 'middle',
                    sortable: true
                }]
            }
        };


   


   //删除功能
   var count = -1;//用来表示选中的数量
   var jsonObjArraySelected =[];
   var idArray = [];
   //定义一个单击删除按钮时触发的事件，用于删除选中行
    $scope.del = function () {
    jsonObjArraySelected = $("#table_bootstrap").bootstrapTable('getSelections');
    count = jsonObjArraySelected.length;//选中的数量
    if(count<=0){
        alert("未选中数据");
    }else{
        for(var item in jsonObjArraySelected){ 
            idArray.push(item.id);
        } 
        //alert(($("#table_bootstrap").bootstrapTable('getSelections')).name);//要从json对象转化为字符串
        //alert(($("#table_bootstrap").bootstrapTable('getSelections'))[0].id);//获取选中的json对象的id
        //alert(JSON.stringify($("#table_bootstrap").bootstrapTable('getSelections')));//要从json对象转化为字符串
        if(confirm("是否删除以下"+count+"条数据") ){
            //这里将访问后台的删除接口，传入id值，并且更新scope数组
            for(var item in idArray){ 
            $scope.arrayData.splice(item,1);
            } 
        }
        
    }
   };
    
 
   //新增功能
   //定义一个点击添加按钮时触发的事件，用于新增数据
   $scope.add = function(){
    //显示bootstrap中的模块窗口
    $('#modal-1').modal('show');     
   };

   //定义一个点击保存按钮时触发的事件
   $scope.save = function(){
    //将添加的值赋给数组
    alert('success');
    $scope.arrayData.name = $scope.newName;
    $scope.arrayData.age = $scope.newAge;
    $scope.arrayData.city = $scope.newCity;
    //$scope.texts.push({name:$scope.newName,age:$scope.newAge,city:$scope.newCity});
    $scope.arrayData.push({name:$scope.newName,age:$scope.newAge,city:$scope.newCity});
    //关闭模块窗口
    $('#modal-1').modal('hide');
   };
    
    
    //修改功能
    //定义一个点击修改按钮时出发的事件，用于修改数据
    //定义一个空对象，用于保存和修改数据时临时存储
    $scope.prod = {};
    //定义一个全局变量idx,用于存储选中行的id
    var idx = -1;
    $scope.update = function(){

    jsonObjArraySelected = $("#table_bootstrap").bootstrapTable('getSelections');
    count = jsonObjArraySelected.length;//选中的数量
    if(count<=0){
        alert("未选中数据");
    }else if(count>1){
        alert("一次只能修改一条数据");
    }else{
        //显示bootstrap中的模块窗口
        $('#modal-2').modal('show');

        //将选中行的数据绑定到临时对象prod中，在下面的模态窗口中展示出来
        $scope.prod.name = jsonObjArraySelected[0].name;
        $scope.prod.age = jsonObjArraySelected[0].age;
        $scope.prod.city = jsonObjArraySelected[0].city;  
        idx = jsonObjArraySelected[0].id;      
    }
   };
 
   //定义一个点击确定按钮时触发的事件,
   $scope.ensure = function () {
    //将修改后的值赋给数组
    $scope.arrayData[idx].name = $scope.prod.name;
    $scope.arrayData[idx].age = $scope.prod.age;
    $scope.arrayData[idx].city = $scope.prod.city;
    //关闭模块窗口
    $('#modal-2').modal('hide');
   };

    //定义一个点击确定按钮时触发的事件,
   $scope.showData = function () {
    //将修改后的值赋给数组
    alert($scope.arrayData[0].name);
   };

     //定义一个点击确定按钮时触发的事件,
   $scope.deleteData = function () {
    //将修改后的值赋给数组
            var ids = $.map($("#table_bootstrap").bootstrapTable('getSelections'), function (row) {
                return row.id;
            });
            $("#table_bootstrap").bootstrapTable('remove', {
                field: 'id',
                values: ids
            });
   };

});
