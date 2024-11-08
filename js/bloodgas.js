layui.use(['layer', 'element', 'jquery'], function() {
    var layer = layui.layer;
    var element = layui.element;
    var $ = layui.$; // 引入 jQuery

    // ECharts 仪表盘初始化
    var chartDom = document.getElementById('bloodgas');
    var myChart = echarts.init(chartDom);

    // 初始的血氧浓度数据
    var gaugeData = [
        {
            value: 100,
            name: '血氧浓度'
        }
    ];

    var option = {
        tooltip: {
            formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
            {
                name: '血氧',
                type: 'gauge',
                detail: {
                    formatter: '{value}'
                },
                data: gaugeData,
                axisLine: { // 更改外边框的颜色
                    lineStyle: {
                        width: 10, // 设置边框宽度
                        color: [
                            [0.3, '#ff4500'],  // 0%-30% 的部分，红色
                            [0.7, '#48b'],     // 30%-70% 的部分，蓝色
                            [1, '#228b22']     // 70%-100% 的部分，绿色
                        ]
                    }
                }
            }
        ]
    };

    // 设置并渲染图表
    myChart.setOption(option);

    // 定义一个函数来加载数据
    function fetchData() {
        $.ajax({
            url: 'static/datagas.json', // 数据文件路径
            dataType: 'json',
            success: function(data) {
                gaugeData[0].value = data.bloodOxygen;  // 从 JSON 中获取血氧浓度值

                myChart.setOption({
                    series: [{
                        data: gaugeData
                    }]
                });

                // 根据血氧浓度的值更新显示文本
                var oxygenLevel = data.bloodOxygen;
                var levelDescription;

                if (oxygenLevel < 90) {
                    levelDescription = '不好';
                } else if (oxygenLevel >= 90 && oxygenLevel < 95) {
                    levelDescription = '良好';
                } else {
                    levelDescription = '很好';
                }

                $('#bloodOxygenDisplay').text('当前血氧浓度：' + oxygenLevel + ' ' + levelDescription + '！');
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
