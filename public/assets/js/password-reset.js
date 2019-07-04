$('#modifyForm').on('submit', function() {
    $.ajax({
        type: 'put',
        url: '/users/password',
        data: $(this).serialize(),
        dataType: 'json',
        success: function(result) {
            console.log(result)
            location.href = 'login.html'
        },
        error: function(error) {
            console.log(error)
        }
    })
    return false;
})