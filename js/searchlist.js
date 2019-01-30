$(function() {
    window.page = 1
    window.togle = 0
    mui('.mui-scroll-wrapper').scroll({
            indicators: false
        })
        /*通过url标识符渲染搜索框关键字*/
    var key = decodeURIComponent(location.search)
    key = key.replace('?', '').split('=')
    key = key[1] || ''
    $('[type="search"]').val(key)

    /*用户点击搜索的时候，根据关键字重新搜索*/
    $('[type="submit"]').on('click', function(e) {
            e.preventDefault()
            var key = $.trim($('[type="search"]').val())
            if (!key) {
                mui.toast('请输入关键字')
                return false
            }
            getData({ proName: key, page: 1, pageSize: 4 }, function(data) {
                $('.tg_product_box').html(template('productList', data))
            })
        })
        /*用户点击排序的时候根据排序关键字搜索*/
    $('.category a').on('tap', function() {
        var span = $(this).children('span')
        if (!$(this).hasClass('now')) {
            $(this).addClass('now').siblings().removeClass('now')
        } else {
            if (span.hasClass('fa-angle-down')) {
                span.removeClass('fa-angle-down').addClass('fa-angle-up')
            } else {
                span.addClass('fa-angle-down').removeClass('fa-angle-up')

            }
        }
        var order = $(this).data('order')
        var orderVal = span.hasClass('fa-angle-down') ? 2 : 1
        var key = $('[type="search"]').val()
        if (!key) {
            mui.toast('请输入关键字', { duration: 'short', type: 'div' })
            return false
        }
        getData({ order: orderVal, proName: key, page: 1, pageSize: 4 }, function(data) {
            console.log(data)
            $('.tg_product_box').html(template('productList', data))
        })

    })
    mui.init({
        pullRefresh: {
            container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down: {
                auto: true, //可选,默认false.首次加载自动下拉刷新一次
                callback: function() {
                    var that = this
                    var key = $.trim($('[type="search"]').val())
                    if (!key) {
                        mui.toast('请输入关键字');
                        return false;
                    }
                    /*排序功能重置*/
                    $('.category a').removeClass('now').removeClass('fa-angle-up').addClass('fa-angle-down')
                    getData({ proName: key, page: 1, pageSize: 4 }, function(data) {
                        $('.tg_product_box').html(template('productList', data))
                        that.endPulldownToRefresh()
                        that.refresh(true)
                    })
                }
            },
            up: {
                callback: function() {
                    window.page++;
                    var that = this
                    var key = $.trim($('[type="search"]').val())
                    if (!key) {
                        mui.toast('请输入关键字');
                        return false;
                    }
                    /*获取排序参数*/
                    var order = $('.category a.now').data('order');
                    var orderVal = $('.category a.now').children('span').hasClass('fa-angle-down') ? 2 : 1;

                    getData({ order: orderVal, proName: key, page: window.page, pageSize: 4 }, function(data) {
                        if (data.data.length) {
                            $('.tg_product_box').append(template('productList', data))
                            that.endPullupToRefresh(false)
                        } else {
                            that.endPullupToRefresh(true);
                        }
                    })

                }
            }
        }
    })

    /*getData({ proName: key, page: 1, pageSize: 4 }, function(data) {
           $('.tg_product_box').html(template('productList', data))
       })*/

    /*点击商品跳转详情*/
    mui(".tg_product").on('tap', '.pro_item_box', function(event) {
        var id = $(this).attr('data-id')
        location.href = "product.html?id=" + id + ""
    });
})
var getData = function(params, callback) {
    $.ajax({
        url: ' /product/queryProduct',
        type: 'get',
        data: params,
        dataType: 'json',
        success: function(data) {
            callback && callback(data)
        }
    })
}
