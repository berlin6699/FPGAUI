layui.use(['layer', 'element', 'jquery'], function () {
    var layer = layui.layer;
    var element = layui.element;
    var $ = layui.$; // 引入 jQuery

    var chartDom = document.getElementById('chart_heart');
    var myChart = echarts.init(chartDom);
    var option;

    function fetchData() {
        $.ajax({
            url: 'static/dataheart.json', // 数据文件路径
            dataType: 'json',
            success: function (data) {
                const dateList = data.map(item => item[0]);
                const valueList = data.map(item => item[1]);

                option = {
                    backgroundColor: '#f5f5f5', // 设置整个图表的背景色
                    visualMap: [
                        {
                            show: false,
                            type: 'continuous',
                            min: 0,
                            max: 400
                        }
                    ],
                    tooltip: {
                        trigger: 'axis'
                    },
                    graphic: {
                        elements: [
                            {
                                type: 'text',
                                left: '2%',
                                top: '10%',
                                style: {
                                    text: '\ue62c 心电图',
                                    fontFamily: 'layui-icon',
                                    fontSize: 30,
                                    fontWeight: 'bold',
                                    fill: '#1a291e'
                                }
                            }
                        ]
                    },
                    xAxis: [
                        {
                            name: '时间', // 横坐标名称
                            nameLocation: 'middle', // 名称位置
                            nameGap: 30, // 与轴线的距离
                            nameTextStyle: {
                                fontSize: 18, // 设置横坐标名称的字体大小
                                fontWeight: 'bold', // 可以选择加粗
                                color: '#032025' // 颜色
                            },
                            data: dateList  // 添加 x 轴数据
                        }
                    ],
                    yAxis: [
                        {
                            name: '幅度', // 横坐标名称
                            nameGap: 50, // 与轴线的距离
                            nameTextStyle: {
                                fontSize: 18, // 设置横坐标名称的字体大小
                                fontWeight: 'bold', // 可以选择加粗
                                color: '#032025' // 颜色
                            },
                            nameLocation: 'middle', // 名称位置
                        },
                    ],
                    grid: [
                        {
                            top: '10%',
                            bottom: '10%',
                            left: '20%',
                            right: '5%',
                        }
                    ],
                    series: [
                        {
                            type: 'line',
                            showSymbol: false,
                            data: valueList, // 保持原数据
                            lineStyle: {
                                color: '#FF0000', // 线条颜色红色
                                width: 2 // 线条宽度
                            },
                        }
                    ]
                };

                myChart.setOption(option);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                layer.msg('数据加载失败: ' + textStatus);
            }
        });
    }

    // 初始加载数据
    fetchData();

    // 定时刷新数据
    setInterval(function () {
        fetchData();
    }, 1000); // 每1秒刷新一次数据
});
