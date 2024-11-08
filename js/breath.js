layui.use(['element', 'jquery'], function() {
    var element = layui.element;
    var $ = layui.$; // 引入 jQuery

    var chartDom = document.getElementById('breathchart');
    var myChart = echarts.init(chartDom);

    function fetchData() {
        $.ajax({
            url: 'static/databreath.json', // 数据文件路径
            dataType: 'json',
            success: function(data) {
                // 假设数据是以 [[时间, 值], ...] 格式存储
                const dateList = data.map(item => item[0]); // 获取时间刻度数据
                const valueList = data.map(item => item[1]); // 获取对应的数值

                var option = {
                    color: ['#80FFA5'], // 只保留一条线的颜色
                    title: {
                        text: '呼吸曲线图'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: dateList // 使用从文件读取的时间刻度数据
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: 'Line 1',
                            type: 'line',
                            smooth: true,
                            lineStyle: {
                                width: 2 // 调整线条宽度
                            },
                            showSymbol: false,
                            areaStyle: {
                                opacity: 0.5,
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: 'rgb(128, 255, 165)'
                                    },
                                    {
                                        offset: 1,
                                        color: 'rgb(1, 191, 236)'
                                    }
                                ])
                            },
                            emphasis: {
                                focus: 'series'
                            },
                            data: valueList // 使用从文件读取的数值数据
                        }
                    ]
                };

                myChart.setOption(option);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                layer.msg('数据加载失败: ' + textStatus);
            }
        });
    }

    // 初始加载数据
    fetchData();

    // 定时刷新数据
    setInterval(function() {
        fetchData();
    }, 5000); // 每5秒刷新一次数据
});
