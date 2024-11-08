// layui.use(['layer', 'element', 'jquery'], function() {
//     var layer = layui.layer;
//     var element = layui.element;
//     var $ = layui.$; // 引入 jQuery
//
//     // 定义一个函数来加载健康提示
//     function fetchHealthTips() {
//         $.ajax({
//             url: 'static/datahealth_tips.json', // 数据文件路径
//             dataType: 'json',
//             success: function(data) {
//                 var tipsHtml = '';
//                 data.tips.forEach(function(tip) {
//                     tipsHtml += '<li style="padding: 8px; border-bottom: 1px solid #eee;">' + tip + '</li>'; // 将每条提示加入列表
//                 });
//                 $('#tipsList').html(tipsHtml); // 更新 div 内容
//             },
//             error: function(jqXHR, textStatus, errorThrown) {
//                 layer.msg('健康提示加载失败: ' + textStatus);
//             }
//         });
//     }
//
//     // 初始加载健康提示
//     fetchHealthTips();
//
//     // 刷新提示的事件处理
//     $('#refreshButton').on('click', function() {
//         fetchHealthTips(); // 点击按钮刷新健康提示
//     });
// });



// layui.use(['layer', 'element', 'jquery'], function() {
//     var layer = layui.layer;
//     var element = layui.element;
//     var $ = layui.$; // 引入 jQuery
//
//     // 定义一个函数来加载健康提示
//     function fetchHealthTips() {
//         $.ajax({
//             url: 'static/datahealth_tips.json', // 数据文件路径
//             dataType: 'json',
//             success: function(data) {
//                 var tipsHtml = '';
//                 data.tips.forEach(function(tip) {
//                     tipsHtml += '<li style="padding: 8px; border-bottom: 1px solid #eee;">' + tip + '</li>'; // 将每条提示加入列表
//                 });
//                 $('#tipsList').html(tipsHtml); // 更新 div 内容
//             },
//             error: function(jqXHR, textStatus, errorThrown) {
//                 layer.msg('健康提示加载失败: ' + textStatus);
//             }
//         });
//     }
//
//     // 初始加载健康提示
//     fetchHealthTips();
//
//     // 刷新提示的事件处理
//     $('#refreshButton').on('click', function() {
//
//         fetchHealthTips(); // 点击按钮刷新健康提示
//
//     });
//
//     // 定时器，每10秒检查一次更新
//     // setInterval(function() {
//     //     fetchHealthTips(); // 定期加载健康提示
//     // }, 1000); // 每10000毫秒（10秒）调用一次
// });


layui.use(['layer', 'element', 'jquery'], function() {
    var layer = layui.layer;
    var element = layui.element;
    var $ = layui.$; // 引入 jQuery

    // 定义一个函数来加载健康提示
    function fetchHealthTips() {
        $.ajax({
            url: 'static/datahealth_tips.json', // 数据文件路径
            dataType: 'json',
            success: function(data) {
                var tipsHtml = '';
                data.tips.forEach(function(tip) {
                    tipsHtml += '<li style="padding: 8px; border-bottom: 1px solid #eee;">' + tip + '</li>'; // 将每条提示加入列表
                });
                $('#tipsList').html(tipsHtml); // 更新 div 内容
            },
            error: function(jqXHR, textStatus, errorThrown) {
                layer.msg('健康提示加载失败: ' + textStatus);
            }
        });
    }

    // 刷新提示的事件处理
    $('#refreshButton').on('click', async function() {
        const inputText = "给我几条养生建议？大约在100字"; // 直接设置问题为固定文本
        const response = await fetch('http://121.43.149.242:3000/begin-measurement', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ input: inputText })
        });

        if (response.ok) {
            const data = await response.json();
            const messageContent = data.message.choices[0].message.content; // 获取content
            console.log("OpenAI的响应内容:", messageContent); // 打印content
            $('#tipsList').append('<li style="padding: 8px; border-bottom: 1px solid #eee;">' + messageContent + '</li>');

            // 在成功获取新建议后再加载健康提示
            fetchHealthTips();
        } else {
            console.error('请求失败:', response.statusText);
            layer.msg('请求失败');
        }
    });

    // 初始加载健康提示
    fetchHealthTips();
});

