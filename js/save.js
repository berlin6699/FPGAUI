layui.use(['jquery'], function(){
    const $ = layui.jquery;

    $('#saveButton').on('click', function() {
        const selectElement = $('#exampleSelect');
        const selectedPerson = selectElement.find('option:selected').text();

        if (selectedPerson !== '请选择测量人') {
            const recordsDiv = $('#records');
            const newRecord = $('<div></div>').text(`测量人: ${selectedPerson}`);
            recordsDiv.append(newRecord);
        } else {
            layer.alert('请选择一个测量人');
        }
    });
});