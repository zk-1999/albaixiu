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
$('#modifyBox').on('submit', '#modifyCategory', function() {
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
    //根据id删除分类功能
$('#categoriesBox').on('click', '.delete', function() {
    if (confirm('确定要删除吗?')) {
        var id = $(this).attr('data-id');
        console.log(id);

        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function(result) {
                location.reload();
            },
            error: function(error) {
                console.log(error)
            }
        })
    }
})
$('#selectAll').on('change', function() {
    var bool = $(this).prop('checked');
    $('#categoriesBox').find('.status').prop('checked', bool);
    if (bool == true) {
        $('#deleteMany').show();
    } else {
        $('#deleteMany').hide();
    }
})

$('#categoriesBox').on('change', '.status', function() {
    if ($('#categoriesBox').find('.status').length == $('#categoriesBox').find('.status').filter(':checked').length) {
        $('#selectAll').prop('checked', true);
    } else {
        $('#selectAll').prop('checked', false);
    }
    if ($('#categoriesBox').find('.status').filter(':checked').length >= 2) {
        $('#deleteMany').show();
    } else {
        $('#deleteMany').hide();
    }
})

$('#deleteMany').on('click', function() {
    if (confirm('您真的要删除用户吗')) {
        var selectAll = $('#categoriesBox').find('.status').filter(':checked');
        var arr = [];
        // console.log(selectAll);
        selectAll.each(function(index, element) {
            // console.log($(element).attr('data-id'));
            arr.push($(element).attr('data-id'));
        })
        $.ajax({
            type: 'delete',
            url: '/categories/' + arr.join('-'),
            success: function(result) {
                location.reload();
            },
            error: function(error) {
                console.log(error)
            }
        })
    }
})