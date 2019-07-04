//用户添加功能
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
    //文件上传功能
$('#modifyBox').on('change', '#avatar', function() {
        var formData = new FormData();
        formData.append('avatar', this.files[0]);
        $.ajax({
            type: 'post',
            url: '/upload',
            contentType: false,
            processData: false,
            data: formData,
            success: function(result) {
                $('#preview').attr('src', result[0].avatar);
                $('#hiddenAvatar').val(result[0].avatar);
            },
            error: function(error) {
                console.log(error)
            }
        })
    })
    //用户显示功能
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
    //根据id查询用户功能
$('#userBox').on('click', '.edit', function() {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'get',
            url: '/users/' + id,
            success: function(result) {
                // console.log(result)
                var html = template('modifyTpl', result);
                $('#modifyBox').html(html);
            },
            error: function(error) {
                console.log(error)
            }
        })

    })
    //用户修改功能
$('#modifyBox').on('submit', '#userForm', function() {
        var id = $(this).attr('data-id');
        // var formData = $(this).serialize();

        $.ajax({
            type: 'put',
            url: '/users/' + id,
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
    //用户删除功能
$('#userBox').on('click', '.delete', function() {
    if (confirm('您真的要删除用户吗?')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function(result) {
                location.reload();
            },
            error: function(error) {
                console.log(error)
            }
        })
    }

})