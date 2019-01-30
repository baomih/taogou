$(function() {
    /*渲染搜索历史*/
    /*点击搜索，更新搜索历史，渲染*/
    /*点击清空历史记录*/
    var historyList = []
    sessionStorage.setItem('historyList', JSON.stringify(historyList))
    var historyArr = JSON.parse(sessionStorage.getItem('historyList'))
    var render = function() {
        var html = ''
        historyArr.forEach(function(item, i) {
            html += '<li><span class="fa fa-clock-o"></span><a href="javascript:;">' + item + '</a><span class="fa fa-times delete" data-index="' + i + '"></span></li>'
        })
        html = html || '<li class="last"><a href="javascript:;">没有搜索记录</a></li>'
        $('.search_list ul').html(html)
    }
    render()
    $('[type="submit"]').on('click', function(e) {
        e.preventDefault();
        var key = $.trim($('[type = "search"]').val())
        if (!key) {
            mui.toast('请输入关键字', { duration: 'short', type: 'div' })
            return false
        }
        historyArr.push(key)
        sessionStorage.setItem('historyList', JSON.stringify(historyArr))
        render()
        location.href = 'searchlist.html?key=' + key + ''
    })
    $('.search_list ul').on('click', '.delete', function() {
        var index = $(this).data('index')
        historyArr.splice(index, 1)
        sessionStorage.setItem('historyList', JSON.stringify(historyArr))
        render()
    })

})
