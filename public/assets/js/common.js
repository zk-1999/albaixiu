$('#logout').on('click', function() {
    var isconfirm = confirm('你确定要退出吗？');
    if (isconfirm == true) {
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function() {
                location.href = 'login.html';
            },
            error: function() {
                alert('退出失败！')
            }
        })
    }

})