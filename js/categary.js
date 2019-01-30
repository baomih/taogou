$(function() {
        mui('.mui-scroll-wrapper').scroll();
        getFirstCategoryData(function(data) {
            $('.category_list ul').html(template('listTemplate', data))
        })
        getSecondCategoryData({ id: 1 },
            function(data) {
                $('.product_list ul').html(template('secondTemplate', data))
            })
        $('.category_list').on('tap', 'a', function() {
            var id = $(this).attr('data-id')
            getSecondCategoryData({ id: id },
                function(data) {
                    $('.product_list ul').html(template('secondTemplate', data))
                })
        })

    })
    /*获取一级分类数据*/
var getFirstCategoryData = function(callback) {
        $.ajax({
            url: '/category/queryTopCategory',
            type: 'get',
            data: '',
            dataType: 'json',
            success: function(data) {
                callback && callback(data)
            }
        })
    }
    /*获取二级分类数据*/
var getSecondCategoryData = function(params, callback) {
    $.ajax({
        url: '/category/querySecondCategory',
        type: 'get',
        data: params,
        dataType: 'json',
        success: function(data) {
            callback && callback(data)
        }
    })
}
