$.ajax({
    type: 'get',
    url: '/categories',
    success: function(result) {
        var html = template('categoryTpl', {
            data: result
        })
        $('#category').html(html);
    },
    error: function(error) {
        console.log(error)
    }
})
$('#feature').on('change', function() {
    var formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        contentType: false,
        processData: false,
        data: formData,

        success: function(result) {
            $('.thumbnail').attr('src', result[0].avatar).show();
            $('#hiddenImg').attr('value', result[0].avatar);
        },
        error: function(error) {
            console.log(error)
        }
    })
})
$('#addForm').on('submit', function() {
    $.ajax({
        type: 'post',
        url: '/posts',
        data: $(this).serialize(),
        success: function(result) {
            location.href = 'posts.html'
        },
        error: function(error) {
            console.log(error)
        }
    })
    return false;
})