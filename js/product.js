$(function() {
    var id = parseInt(location.search.replace('?', '').split('=')[1])
        /*渲染数据*/
    $.ajax({
            url: '/product/queryProductDetail',
            type: 'get',
            data: { id: id },
            dataType: 'json',
            success: function(data) {
                console.log(data)
                $('#tg_container').append(template('detailTemplate', { data: data }))
            }
        })
        /*点击尺码*/
    mui("#tg_container").on('tap', '.p_size span', function(event) {
        $(this).addClass('now').siblings().removeClass('now')
    });
    /*点击数量加减*/
    var num = 0
    $("#tg_container").on('tap', '.p_number span', function(event) {
        var max = parseInt($(this).siblings('input').attr('data-max'))
        if ($(this).hasClass('jian')) {
            num--
            if (num <= 0) {
                num = 0
            }
        } else if ($(this).hasClass('jia')) {
            num++
            if (num >= max) {
                num = max
            }
        }
        $(this).siblings('input').val(num)
    });
})
