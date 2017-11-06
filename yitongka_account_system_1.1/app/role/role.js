'use strict';
var app = angular.module('MyApp', ['ui.grid','ui.grid.selection','ui.grid.edit',
            'ui.grid.exporter','ui.grid.pagination','ui.grid.resizeColumns','ui.grid.autoResize']);

        app.controller('roleController', function($scope,i18nService,$http) {
            // 国际化；
            i18nService.setCurrentLang("zh-cn");
            
            $scope.ttt=function(){alert($scope.gridOptions.data[0].age);}
            
            $scope.gridOptions = {
                data: 'myData',
                columnDefs: [{ field: "id"},
                             { field: 'nameValue', 
                                 displayName: '角色名', 
                                 width: '10%', 
                                 enableColumnMenu: false,// 是否显示列头部菜单按钮
                                 enableHiding: false,
                                 suppressRemoveSort: true,
                                 enableCellEdit: false // 是否可编辑
                             },
                             { field: "codeValue"},
                             { field: "shortOrder"},
                             { field: "activeStatus"},
                             { field: "remark"}
                            ],
                            
                enableSorting: true, //是否排序
                useExternalSorting: false, //是否使用自定义排序规则
                enableGridMenu: true, //是否显示grid 菜单
                showGridFooter: true, //是否显示grid footer
                enableHorizontalScrollbar :  1, //grid水平滚动条是否显示, 0-不显示  1-显示
                enableVerticalScrollbar : 0, //grid垂直滚动条是否显示, 0-不显示  1-显示
                
                //-------- 分页属性 ----------------
                enablePagination: true, //是否分页，默认为true
                enablePaginationControls: true, //使用默认的底部分页
                paginationPageSizes: [10, 15, 20], //每页显示个数可选项
                paginationCurrentPage:1, //当前页码
                paginationPageSize: 10, //每页显示个数
                //paginationTemplate:"<div></div>", //自定义底部分页代码
                totalItems : 0, // 总数量
                useExternalPagination: true,//是否使用分页按钮
                
           
                //----------- 选中 ----------------------
                enableFooterTotalSelected: true, // 是否显示选中的总数，默认为true, 如果显示，showGridFooter 必须为true
                enableFullRowSelection : true, //是否点击行任意位置后选中,默认为false,当为true时，checkbox可以显示但是不可选中
                enableRowHeaderSelection : true, //是否显示选中checkbox框 ,默认为true
                enableRowSelection : true, // 行选择是否可用，默认为true;
                enableSelectAll : true, // 选择所有checkbox是否可用，默认为true; 
                enableSelectionBatchEvent : true, //默认true
                   isRowSelectable: function(row){ //GridRow
                   if(row.entity.age > 45){
                       row.grid.api.selection.selectRow(row.entity); // 选中行
                   }
                },
                modifierKeysToMultiSelect: false ,//默认false,为true时只能 按ctrl或shift键进行多选, multiSelect 必须为true;
                multiSelect: true ,// 是否可以选择多个,默认为true;
                noUnselect: false,//默认false,选中后是否可以取消选中
                selectionRowHeaderWidth:30 ,//默认30 ，设置选择列的宽度；
                
                //--------------导出----------------------------------
                exporterAllDataFn: function(){
                       return getPage(1,$scope.gridOptions.totalItems,$http);
                },
                exporterCsvColumnSeparator: ',',
                exporterCsvFilename:'download.csv',
                exporterFieldCallback : function ( grid, row, col, value ){
                 if ( value == 50 ){
                   value = "可以退休";
                 }
                 return value;
                },
                exporterHeaderFilter :function( displayName ){ 
                   return 'col: ' + name; 
                },
                exporterHeaderFilterUseName : true,
                exporterMenuCsv : true,
                exporterMenuLabel : "Export",
                exporterMenuPdf : true,
                exporterOlderExcelCompatibility : false,
                exporterPdfCustomFormatter : function ( docDefinition ) {
                 docDefinition.styles.footerStyle = { bold: true, fontSize: 10 };
                 return docDefinition;
                },
                exporterPdfFooter :{ 
                                     text: 'My footer', 
                                     style: 'footerStyle' 
                                   },
                exporterPdfDefaultStyle : {
                  fontSize: 11,font:'simblack' //font 设置自定义字体
                },
                exporterPdfFilename:'download.pdf',
                /* exporterPdfFooter : {
                 columns: [
                   'Left part',
                   { text: 'Right part', alignment: 'right' }
                 ]
                }, 
                或 */
                exporterPdfFooter1: function(currentPage, pageCount) { 
                       return currentPage.toString() + ' of ' + pageCount; 
                },
                exporterPdfHeader : function(currentPage, pageCount) { 
                   return currentPage.toString() + ' of ' + pageCount; 
                },
                exporterPdfMaxGridWidth : 720,
                exporterPdfOrientation : 'landscape',//  'landscape' 或 'portrait' pdf横向或纵向
                exporterPdfPageSize : 'A4',// 'A4' or 'LETTER' 
                exporterPdfTableHeaderStyle : {
                 bold: true,
                 fontSize: 12,
                 color: 'black'
                },
                exporterPdfTableLayout : null,
                exporterPdfTableStyle: {
                 margin: [0, 5, 0, 15]
                },
                exporterSuppressColumns : ['buttons'],
                exporterSuppressMenu: false,

                //---------------api---------------------
                onRegisterApi: function(gridApi) {
                    $scope.gridApi = gridApi;
                    //分页按钮事件
                    gridApi.pagination.on.paginationChanged($scope,function(newPage, pageSize) {
                          if(getPage) { 
                              getPage(newPage, pageSize,$http); 
                           }
                    });
                    
                    //编辑离开事件
                    $scope.gridApi.edit.on.afterCellEdit($scope,function(rowEntity){
						if(updateUser){
							updateUser(rowEntity,$http);
						}
					});

                    
                    //行选中事件
                    $scope.gridApi.selection.on.rowSelectionChanged($scope,function(row,event){
                        if(row){
                            $scope.testRow = row.entity;
                        }
                     });
                }
            };
            
            var updateUser=function(obj,$http){
            	$http.post(user_update_url,obj).then(function(json){
        	 		alert(json.data.data);
            	});
            }
            
            var getPage = function(curPage, pageSize,$http) {
            	var data="{\"pageNum\":\""+curPage+"\",\"pageSize\":\""+pageSize+"\"}";
        	 	$http.get(role_url,data).then(function(json){
        	 		//$scope.gridOptions.data = json.data.data.list;
        	 		$scope.myData=json.data.data;
        	 		$scope.gridOptions.totalItems=json.data.page.total;
        	 		$scope.gridOptions.paginationCurrentPage=json.data.page.pageNum;
         	    });
                    
            };
            
            
            getPage(1, $scope.gridOptions.paginationPageSize,$http);
        });
        