layui.use(['table', 'dropdown'], function(){
    var table = layui.table;
    var dropdown = layui.dropdown;

    // 创建渲染实例
    table.render({
        elem: '#test',
        url: 'static/member.json', // 此处为静态模拟数据，实际使用时需换成真实接口
        toolbar: '#toolbarDemo',
        defaultToolbar: ['filter', 'exports', 'print', { // 右上角工具图标
            title: '提示',
            layEvent: 'LAYTABLE_TIPS',
            icon: 'layui-icon-tips',
            onClick: function(obj) { // 2.9.12+
                layer.alert('要注意保重身体哦！');
            }
        }],
        height: 'full-35', // 最大高度减去其他容器已占有的高度差
        css: [ // 重设当前表格样式
            '.layui-table-tool-temp{padding-right: 145px;}'
        ].join(''),
        cellMinWidth: 80,
        page: true,
        cols: [[
            {type: 'checkbox', fixed: 'left'},
            {field:'id', fixed: 'left', width:80, title: 'ID', sort: true, edit: 'text'}, // ID 可编辑
            {field:'username', width:100, title: '用户', edit: 'text'}, // 用户 可编辑
            {field:'age', width:100, title:'年龄', edit: 'text'}, // 年龄 可编辑
            {field:'sex', width:100, title: '性别', edit: 'text'}, // 性别 可编辑
            {field:'height', width:100, title:'身高', sort: true, edit: 'text'}, // 身高 可编辑
            {field:'weight', width:100, title: '体重', sort: true, edit: 'text'}, // 体重 可编辑
            {field:'sign', title: '签名', edit: 'textarea', minWidth: 260}, // 签名 可编辑
            {fixed: 'right', title:'操作', width: 134, minWidth: 125, templet: '#toolDemo'}
        ]],
        done: function(){
            var id = this.id;

            // 下拉按钮测试
            dropdown.render({
                elem: '#dropdownButton',
                data: [{
                    id: 'add',
                    title: '添加'
                },{
                    id: 'update',
                    title: '编辑'
                },{
                    id: 'delete',
                    title: '删除'
                }],
                click: function(obj){
                    var checkStatus = table.checkStatus(id)
                    var data = checkStatus.data;
                    switch(obj.id){
                        case 'add':
                            layer.open({
                                title: '添加',
                                type: 1,
                                area: ['80%','80%'],
                                content: '<div style="padding: 16px;">自定义表单元素</div>'
                            });
                            break;
                        case 'update':
                            if(data.length !== 1) return layer.msg('请选择一行');
                            layer.open({
                                title: '编辑',
                                type: 1,
                                area: ['80%','80%'],
                                content: '<div style="padding: 16px;">自定义表单元素</div>'
                            });
                            break;
                        case 'delete':
                            if(data.length === 0){
                                return layer.msg('请选择一行');
                            }
                            layer.msg('delete event');
                            break;
                    }
                }
            });
        },
        error: function(res, msg){
            console.log(res, msg)
        }
    });

    // 工具栏事件
    table.on('toolbar(test)', function(obj){
        var id = obj.config.id;
        var checkStatus = table.checkStatus(id);
        var othis = lay(this);
        switch(obj.event){
            case 'getCheckData':
                var data = checkStatus.data;
                layer.alert(layui.util.escape(JSON.stringify(data)));
                break;
            case 'getData':
                var getData = table.getData(id);
                console.log(getData);
                layer.alert(layui.util.escape(JSON.stringify(getData)));
                break;
        };
    });

    // 单元格编辑事件
    table.on('edit(test)', function(obj){
        var field = obj.field; // 得到字段
        var value = obj.value; // 得到修改后的值
        var data = obj.data; // 得到所在行所有键值

        // 编辑后续操作，如提交更新请求，以完成真实的数据更新
        layer.msg('编辑成功', {icon: 1});

        var update = {};
        update[field] = value;
        obj.update(update);
    });
});
