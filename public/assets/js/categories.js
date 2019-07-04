//添加分类
$('#addCategory').on('submit', function() {
        $.ajax({
            type: 'post',
            url: '/categories',
            data: $(this).serialize(),
            dataType: 'json',
            success: function(result) {
                location.reload();
            },
            error: function(error) {
                console.log(error)
            }
        })
        return false;
    })
    //展示分类列表数据
$.ajax({
        type: 'get',
        url: '/categories',
        success: function(result) {
            var html = template('catcategoriesTpl', { data: result });
            $('#categoriesBox').html(html);
        },
        error: function(error) {
            console.log(error)
        }
    })
    //当点击编辑按钮的时候，让当前这一行的内容展示在左侧的表单上
$('#categoriesBox').on('click', '.edit', function() {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'get',
            url: '/categories/' + id,
            success: function(result) {
                var html = template('modifyFormTpl', result);
                $('#modifyBox').html(html);
            },
            error: function(error) {
                console.log(error)
            }
        })
    })
    //分类列表修改数据
$('#modifyBox').on('submit', '#addCategory', function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: $(this).serialize(),
        dataType: 'json',
        success: function(result) {
            location.reload();
        },
        error: function(error) {
            console.log(error)
        }
    })
})