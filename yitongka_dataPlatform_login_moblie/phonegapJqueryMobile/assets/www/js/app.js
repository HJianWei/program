var baseUrl='http://192.168.1.142:8080/sdmp';


function ajaxFind(url, dataObj) {
		var result = null;
		$.ajax({
			url : url,
			data : dataObj,
			type:'post',
			dataType : "json",
			async : false,//同步
			cache : false,
			success : function(data) {
				if(data != null && data != '') {
					result = data;
				} 
			},
			error : function(XMLHttpRequest, text, error) {
				result = null;
			}
		});
		return result;
	}
	
	
	
function resizeTb(){
	xpkChart.resize();
	

}


//驾驶舱
var xpkoption = '';
xpkoption = {
	    tooltip: {
	        formatter: "{a} <br/>{b} : {c}%"
	    },
	    toolbox: {
	        show: false,
	    },
	    animation:true,
	    addDataAnimation:true,
	    animationDuration:5000,
	    animationEasing:'BounceOut',
	    series: [{
	        name: "完成比",
	        type: "gauge",
	        splitNumber: 10,
	        center: ["25%", "60%"],
	        radius: [0, "85%"],
	        axisLine: {
	            lineStyle: {
	                color: [[0.2, "#ff4500"], [0.8, "#48b"], [1, "#228b22"]],
	                width: 10
	            }
	        },
	        axisTick: {
	            splitNumber: 10,
	            length: 18,
	            lineStyle: {
	                color: "auto"
	            }
	        },
	        axisLabel: {
	            textStyle: {
	                color: "auto"
	            }
	        },
	        splitLine: {
	            show: true,
	            length: 22,
	            lineStyle: {
	                color: "auto"
	            }
	        },
	        pointer: {
	            width: 5
	        },
	        title: {
	            show: true,
	            offsetCenter: [0, "-115%"],
	            textStyle: {
	                color: "#000",
	                fontSize: 16,
	                fontWeight: "bold",
	            }
	        },
	        detail: {
	            formatter: "{value}%",
	            textStyle: {
	                color: "auto",
	                fontWeight: "normal",
	                fontSize: 24
	            }
	        },
	        data: [{
	            value: 88,
	            name: "芯片卡消费交易完成比"
	        }]
	    },
	    {
	        name: "完成比",
	        type: "gauge",
	        splitNumber: 10,
	        center: ["75%", "60%"],
	        radius: [0, "85%"],
	        axisLine: {
	            lineStyle: {
	                color: [[0.2, "#ff4500"], [0.8, "#48b"], [1, "#228b22"]],
	                width: 10
	            }
	        },
	        axisTick: {
	            splitNumber: 10,
	            length: 18,
	            lineStyle: {
	                color: "auto"
	            }
	        },
	        axisLabel: {
	            textStyle: {
	                color: "auto"
	            }
	        },
	        splitLine: {
	            show: true,
	            length: 22,
	            lineStyle: {
	                color: "auto"
	            }
	        },
	        pointer: {
	            width: 5
	        },
	        title: {
	            show: true,
	            offsetCenter: [0, "-115%"],
	            textStyle: {
	                color: "#000",
	                fontSize: 16,
	                fontWeight: "bold",
	            }
	        },
	        detail: {
	            formatter: "{value}%",
	            textStyle: {
	                color: "auto",
	                fontWeight: "normal",
	                fontSize: 24
	            }
	        },
	        data: [{
	            value: 88,
	            name: "预付卡销售完成比"
	        }]
	    }]
	};

function initTus(dateType) {
		//if(dateType==0){
		//	var input_dateType_fbt = document.getElementById('input_dateType_fbt');	
		//	dateType = input_dateType_fbt.value;
		//} 
		//var type = document.getElementById('sec_tjType').value;
	    var controllerURL = baseUrl+"/sdmp/indexConfig.do?method=getPie&dateType=3&type=4";
	    var rdata = ajaxFind(controllerURL);
	    var option = {
		    title : {
		        text: '',
		        subtext: '',
		        x:'center'
		    },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    series : [
		        {
		            name: '',
		            type: 'pie',
		            radius : '60%',
		            center: ['50%', '70%'],
		            data:[],
		            itemStyle: {
		                emphasis: {
		                    shadowBlur: 10,
		                    shadowOffsetX: 0,
		                    shadowColor: 'rgba(0, 0, 0, 0.5)'
		                }
		            }
		        }
		    ]
		};
	    var chart = echarts.init(document.getElementById('chartdiv'),'macarons');
	    if(rdata.data){
			option.series[0].data = rdata.data;
			option.title.text=rdata.title;
			chart.setOption(option,true);
			chart.resize();
		}
	    
	    
	}



//交易量
var jyloption = '';
jyloption = {
	    tooltip: {
	        trigger: "axis",
	        axisPointer: {
	            type: "shadow"
	        },
	        formatter: function(params) {
	            var res = "";
	            var total = 0;
	            for(var i = 0,l = params.length; i < l; i++) {
	              res += (params[i].seriesName.substr(0,7) =='预付卡' ? '预付卡' : params[i].seriesName.substr(0,7))+ params[0].name +" : " + params[i].value + "万元<br />";
	              total += params[i].value
	            }
	            res += params[0].name + " 总合计: " + total.toFixed(2)+ " 万元";
	            return res
	        }
	    },
	    animation:true,
	    legend: {
	        orient: "horizontal",
	        x: "left",
	        y: "bottom",
	        data: ["芯片卡（交通）","芯片卡（其它）","预付卡"]
	    },
	    grid: {
	        x: 50,
	        x2: 40,
	        y: 10,
	        y2: 85,
	    },
	    toolbox: {
	        show: true,
	        x: "right",
	        y: "bottom",
	        feature: {
	            magicType: {
	                show: true,
	                type: ["bar", "tiled"]
	            },
	            restore: {
	                show: true
	            },
	        }
	    },
	    xAxis: [{
	        type: "category",
	        data: ["消费", "充值"]
	    }],
	    yAxis: [{
		        type: "value",
	    }],
	    series: [{
	        name: "预付卡",
	        type: "bar",
	        stack: "总计",
	        barWidth: 60,
	        itemStyle: {
	            normal: {
	            color: "#9DBD40",
	                label: { 
	                    show: true,
	                    textStyle: {
	                        fontSize: "12",
	                        fontFamily: "微软雅黑",
	                        fontWeight: "bold",
	                        color: "#fff"
	                    },
	                    position: "inside"
	                }
	            }
	        },
	        data: [100, 100]
	    },
	    {
	        name: "芯片卡（其它）",
	        type: "bar",
	        stack: "总计",
	        barWidth: 60,
	        itemStyle: {
	            normal: {
	            	color: "#D8773A",
	                label: {
	                    show: true,
	                    textStyle: {
	                        fontSize: "12",
	                        fontFamily: "微软雅黑",
	                        fontWeight: "bold",
	                        color: "#fff"
	                    },
	                    position: "inside"
	                }
	            }
	        },
	        data: [100, 100]
	    },
	    {
	        name: "芯片卡（交通）",
	        type: "bar",
	        stack: "总计",
	        barWidth: 60,
	        itemStyle: {
	            normal: {
	            	color: "#94B6D2",
	                label: {
	                    show: true,
	                    textStyle: {
	                        fontSize: "12",
	                        fontFamily: "微软雅黑",
	                        fontWeight: "bold",
	                        color: "#fff"
	                    },
	                    position: "inside"
	                }
	            }
	        },
	        data: [100, 100]
	    }]
	};


//交易卡量趋势
var zxtJykloption = {
    title: {
        show: true,
        subtext: "单位：张"
    },
    tooltip: {
        trigger: "axis"
    },
    animation:true,
     legend: {
        orient: "horizontal",
        x: "left",
        y: "bottom",
        data: ["充值","消费","换卡","退卡"]
    },
    toolbox: {
        show: true,
        x: "right",
        y: "bottom",
        feature: {
            magicType: {
                show: true,
                type: ["line", "bar"]
            },
            restore: {
                show: true
            },
        }
    },
    
    xAxis: [{
        type: "category",
        boundaryGap: false,
        data: []
    }],
    yAxis: [{
        type: "value",
    }],
    series: [{
        name: "充值",
        type: "line",
        data: [],
        markLine: {
            data: [{
                type: "average",
                name: "平均值"
            }]
        },
        markPoint: {
            data: [{
                type: "max",
                name: "最大值"
            },
            {
                type: "min",
                name: "最小值"
            }]
        },
    },
   {
        name: "消费",
        type: "line",
        data: [],
        markLine: {
            data: [{
                type: "average",
                name: "平均值"
            }]
        },
        markPoint: {
            data: [{
                type: "max",
                name: "最大值"
            },
            {
                type: "min",
                name: "最小值"
            }]
        },
    },
    {
        name: "换卡",
        type: "line",
        data: []
    },{
        name: "退卡",
        type: "line",
        data: []
    }]
};



//交易量趋势
var zxtXfoption = {
    title: {
        show: true,
        subtext: "单位：万元"
    },
    tooltip: {
        trigger: "axis"
    },
    animation:true,
     legend: {
        orient: "horizontal",
        x: "left",
        y: "bottom",
        data: ["芯片卡（交通）","芯片卡（其它）","预付卡","合计"]
    },
    toolbox: {
        show: true,
        x: "right",
        y: "bottom",
        feature: {
            magicType: {
                show: true,
                type: ["line", "bar"]
            },
            restore: {
                show: true
            },
            saveAsImage: {
                show: false
            }
        }
    },
    xAxis: [{
        type: "category",
        boundaryGap: false,
        data: []
    }],
    yAxis: [{
        type: "value",
    }],
    series: [{
        name: "芯片卡（交通）",
        type: "line",
        data: []
    },
   {
        name: "芯片卡（其它）",
        type: "line",
        data: []
    },
    {
        name: "预付卡",
        type: "line",
        data: []
    },{
        name: "合计",
        type: "line",
        markLine: {
            data: [{
                type: "average",
                name: "平均值"
            }]
        },
        markPoint: {
            data: [{
                type: "max",
                name: "最大值"
            },
            {
                type: "min",
                name: "最小值"
            }]
        },
        data: []
    }]
};
