(function($){
  jQuery(document).ready(function(){
    // 所有的内容都写在这里
    var pathname = location.pathname
    var hash = location.hash

    // 当前导航背景
    $(".menu .navbar-nav > li > a[href='" + pathname + "']" ).parent().addClass('active');

    // 页面载入后幻灯片显示设置
    $('.carousel-inner .item').eq(0).addClass('active')

    $('button.submit').click(function(){
      $('#clientTel').value()
      if(value)
        $(this).text('正在提交……')
    })
  })
})(jQuery)
