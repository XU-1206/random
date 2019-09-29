var data0 = [0, 0, 0, 0, 0, 0, 0]
var data = [60, 85, 110, 160, 90, 80, 190]
var xdata = ['06-02', '06-03', '06-04', '06-05', '06-06', '06-07', '06-08']
// 定义变量xIndex 表示X轴序号, Ymonth 表示柱状图的label值
var xIndex,Ymonth

option = {
    // 关闭提示框, 替换为柱状图的点击事件
    tooltip: {
        trigger: "none"
    },
    title: {
        text: "收益趋势图",
        subtext: '用散点图代替柱状图两端点,并给柱状图添加点击事件,简约风格,很适合移动端',
        textStyle: {
            color: "#010001",
            fontSize: 26
        },
        subtextStyle: {
            color: "#5B5BFA",
            fontSize: 14
        },
        left: 'center',
        top: "15%"
    },
    grid: {
        left: "10%",
        top: "35%",
        bottom: "15%",
        right: "10%",
        containLabel: true
    },
    xAxis: {
        data: xdata,
        type: 'category',
        splitLine: {
            show: false
        },
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            color: '#383738',
            fontSize: 14,
            margin: 20
        }
    },
    yAxis: {
        type: 'value',
        splitNumber: 4,
        interval: 50,
        splitLine: {
            show: true,
            lineStyle: {
                color: '#D5D5D5',
                type: 'dashed'
            }
        },
        axisLine: {
            show: false,
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            color: '#383738',
            fontSize: 14
        }
    },
    series: [{
            type: 'bar',
            barWidth: 4,
            data: data,
            color: ['#F14845'],
            label: {
                show: true,
                position: 'top',
                // 标签刻度值位置
                offset: [0, -15],
                fontSize: 16,
                formatter: function(params) {
                    // 判断收益是否大于0, 或者是否对应当前数据
                    if(params.value === 0 || params.value !== Ymonth) {
                        return ''
                    } else {
                        return params.value
                    }
                }
            }
        },
        {
            type: 'scatter',
            symbolSize: 8,
            itemStyle: {
                borderWidth: 2.5,
                borderColor: '#F14845',
                color: "#fff",
                opacity: 1
            },
            silent: true,
            data: data0
        },
        {
            type: 'scatter',
            symbolSize: 8,
            itemStyle: {
                borderWidth: 2.5,
                borderColor: '#F14845',
                color: "#fff",
                opacity: 1
            },
            silent: true,
            data: data
        }

    ]
}

// 给每条数据的热区增加点击事件
myChart.getZr().on('click', function(params) {
    var pointInPixel= [params.offsetX, params.offsetY]
    if (myChart.containPixel('grid', pointInPixel)) {
        var pointInGrid = myChart.convertFromPixel({seriesIndex: 0}, pointInPixel)
        // X轴序号
        xIndex = pointInGrid[0]
        // 获取当前图表的option
        var op = myChart.getOption()
        // 获得图表中我们想要的数据
        Ymonth = op.series[0].data[xIndex]
        // console.log('点击了第' + xIndex + '条数据')
        myChart.setOption({
            xAxis: [{
                axisLabel: {
                    textStyle: {
                        color: function(value, index) {
                            return index === xIndex ? '#F14845' : '#383738'
                        }
                    }
                }
            }]
        })
    }
})
