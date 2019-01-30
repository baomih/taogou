$(function() {
    /*初始化区域滚动插件*/
    mui('.lala').scroll();
    mui('.haha').scroll({
        scrollY: false, //是否竖向滚动
        scrollX: true,
        indicators: false
    });
    mui('.mui-slider').slider({
        interval: 2000
    });
    downTime()
})
var downTime = function() {
    var time = 4 * 60 * 60
    var spans = $('.time span')

    var timer = setInterval(function() {
        time--
        var h = Math.floor(time / 3600)
        var m = Math.floor(time % 3600 / 60)
        var s = Math.floor(time % 60)

        spans[0].innerHTML = Math.floor(h / 10)
        spans[1].innerHTML = h % 10
        spans[3].innerHTML = Math.floor(m / 10)
        spans[4].innerHTML = m % 10
        spans[6].innerHTML = Math.floor(s / 10)
        spans[7].innerHTML = s % 10
    }, 1000)

    if (time <= 0) {
        clearInterval(timer)
    }
    $('.pro_item_box').on('click', function() {
        console.log(111)
    })
}
