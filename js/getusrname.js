layui.use(['table', 'dropdown'], function(){
    var table = layui.table;

    // 创建渲染实例
    table.render({
        elem: '#test',
        url: 'static/member.json', // 使用 JSON 数据
        toolbar: '#toolbarDemo',
        height: 'full-35',
        cellMinWidth: 80,
        page: true,
        cols: [[
            {type: 'checkbox', fixed: 'left'},
            {field:'id', fixed: 'left', width:80, title: 'ID', sort: true},
            {field:'username', width:80, title: '用户', edit: 'text'},
            {field:'age', width:80, title: '年龄', edit: 'text'},
            {field:'sex', width:80, title: '性别', sort: true, edit: 'text'},
            {field:'height', width:100, title: '身高', sort: true, edit: 'text'},
            {field:'weight', width:100, title: '体重', sort: true, edit: 'text'},
            {field:'sign', width:200, title: '签名', edit: 'text'},
        ]],
        done: function(res, curr, count){
            // 1. 清空下拉框内容
            var select = document.getElementById('exampleSelect');
            select.innerHTML = '<option disabled selected>请选择测量人</option>'; // 重新插入默认选项

            // 2. 遍历加载到的用户数据，并添加到下拉框
            res.data.forEach(function(item) {
                var option = document.createElement('option');
                option.value = item.username; // 使用用户名作为选项的值
                option.innerHTML = item.username; // 显示用户名
                select.appendChild(option); // 添加到下拉框中
            });
        }
    });
});
