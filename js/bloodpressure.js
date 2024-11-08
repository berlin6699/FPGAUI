layui.use(['layer', 'element', 'jquery'], function() {
    var layer = layui.layer;
    var element = layui.element;
    var $ = layui.$; // 引入 jQuery

    // ECharts 仪表盘初始化
    var chartDom = document.getElementById('bloodpressure');
    var myChart = echarts.init(chartDom);

    // 初始的 gaugeData
    var gaugeData = [
        {
            value: 120,  // 收缩压
            name: '收缩压',
            title: {
                offsetCenter: ['0%', '-40%']
            },
            detail: {
                valueAnimation: true,
                offsetCenter: ['0%', '-20%']
            }
        },
        {
            value: 80,  // 舒张压
            name: '舒张压',
            title: {
                offsetCenter: ['0%', '20%']
            },
            detail: {
                valueAnimation: true,
                offsetCenter: ['0%', '40%']
            }
        }
    ];

    var option = {
        series: [
            {
                type: 'gauge',
                startAngle: 90,
                endAngle: -270,
                pointer: {
                    show: false
                },
                progress: {
                    show: true,
                    overlap: false,
                    roundCap: true,
                    clip: false,
                    itemStyle: {
                        borderWidth: 1,
                        borderColor: '#464646'
                    }
                },
                axisLine: {
                    lineStyle: {
                        width: 20
                    }
                },
                splitLine: {
                    show: false,
                    distance: 0,
                    length: 10
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: false,
                    distance: 50
                },
                data: gaugeData,
                title: {
                    fontSize: 12
                },
                detail: {
                    width: 50,
                    height: 14,
                    fontSize: 12,
                    color: 'inherit',
                    borderColor: 'inherit',
                    borderRadius: 20,
                    borderWidth: 1,
                    formatter: '{value} mmHg'
                }
            }
        ]
    };

    // 设置并渲染图表
    myChart.setOption(option);

    // 定义一个函数来加载数据
    function fetchData() {
        $.ajax({
            url: 'static/datapressure.json', // 数据文件路径
            dataType: 'json',
            success: function(data) {
                gaugeData[0].value = data.systolic;  // 收缩压
                gaugeData[1].value = data.diastolic; // 舒张压

                myChart.setOption({
                    series: [{
                        data: gaugeData,
                        pointer: {
                            show: false
                        }
                    }]
                });

                // 根据血压值更新显示文本
                var systolic = data.systolic;
                var diastolic = data.diastolic;
                var statusDescription;

                // 判断血压状态
                if (systolic < 90 || diastolic < 60) {
                    statusDescription = '低血压';
                } else if (systolic >= 90 && systolic <= 120 && diastolic >= 60 && diastolic <= 80) {
                    statusDescription = '正常';
                } else if (systolic > 120 && systolic <= 140 || diastolic > 80 && diastolic <= 90) {
                    statusDescription = '高血压前期';
                } else {
                    statusDescription = '高血压';
                }

                $('#bloodPressureDisplay').text('当前血压：' + systolic + '/' + diastolic + ' mmHg (' + statusDescription + ')');
            },
            error: function(jqXHR, textStatus, errorThrown) {
                layer.msg('数据加载失败: ' + textStatus);
            }
        });
    }

    // 初始加载数据
    fetchData();

    // 定时更新数据
    setInterval(function() {
        fetchData(); // 每2秒更新一次数据
    }, 2000);
});
