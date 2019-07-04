$('#userForm').on('submit', function() {
    $.ajax({
        type: 'post',
        url: '/users',
        data: $(this).serialize(), //自动收集表单数据以&拼接方式
        dataType: 'json',
        success: function(result) {
            location.reload(); //刷新当前页面
        },
        error: function(error) {
            console.log(error)
        }
    })
    return false;
})
$('#avatar').on('change', function() {
    var formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        contentType: false,
        processData: false,
        data: formData,
        success: function(result) {
            console.log(result)
            $('#preview').attr('src', result[0].avatar);
            $('#hiddenAvatar').val(result[0].avatar);
        },
        error: function(error) {
            console.log(error)
        }
    })
})
$.ajax({
    type: 'get',
    url: '/users',
    success: function(result) {
        var html = template('userTpl', { data: result });
        $('#userBox').html(html);
    },
    error: function(error) {
        console.log(error)
    }
})