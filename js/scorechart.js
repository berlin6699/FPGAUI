layui.use(['layer', 'element', 'jquery'], function () {
    var layer = layui.layer;
    var element = layui.element;
    var $ = layui.$; // 引入 jQuery

    var chartDom = document.getElementById('scorechart');
    var myChart = echarts.init(chartDom);
    var option;

    function fetchData() {
        $.ajax({
            url: 'static/datascore.json', // 数据文件路径
            dataType: 'json',
            success: function (data) {
                option = {
                    title: {
                        text: '健康得分图'  // 保持标题
                    },
                    legend: {
                        data: [data.name],  // 使用从 JSON 文件获取的名称
                        orient: 'vertical',   // 纵向排列
                        left: 'right',        // 将图例放在右侧
                        top: 'middle'         // 垂直居中
                    },
                    radar: {
                        center: ['50%', '50%'], // 雷达图居中
                        radius: '60%',           // 设置雷达图的半径
                        indicator: [
                            { name: '心电', max: 100 },
                            { name: '血氧', max: 100 },
                            { name: '血压', max: 100 },
                            { name: '呼吸', max: 100 },
                            { name: '心跳', max: 100 },
                            { name: '心态', max: 100 }
                        ]
                    },
                    series: [
                        {
                            name: '预算与支出对比', // 可以保持不变
                            type: 'radar',
                            data: [
                                {
                                    value: data.values, // 从 JSON 中获取值
                                    name: data.name,  // 从 JSON 中获取名称
                                    areaStyle: {      // 设置曲线填充效果
                                        color: 'rgba(255, 165, 0, 0.5)' // 填充颜色
                                    },
                                    itemStyle: {      // 设置曲线的样式
                                        color: 'orange' // 曲线颜色
                                    }
                                }
                            ]
                        }
                    ]
                };

                myChart.setOption(option); // 设置图表选项
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
