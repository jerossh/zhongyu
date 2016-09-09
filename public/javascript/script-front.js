(function($){
  jQuery(document).ready(function(){
    // 所有的内容都写在这里
    var pathname = location.pathname
    var hash = location.hash

    // 当前导航背景
    $(".menu .navbar-nav > li > a[href='" + pathname + "']" ).parent().addClass('active');
    if(pathname == '/blog' || pathname == '/article')
      $('.menu .navbar-nav > li > a[href="/blog?p=0"]' ).parent().addClass('active');

    // 公司核名
    $('a[data-target="#signinModal"]').click(function(){
      var $q = $('.heming_content').val();
      var warn = $('.alert-warning');
      if (!$q) {
        if(warn.is(':hidden')){
          warn.slideDown();
        }
        return false
      }else {
        if(warn.is(':visible')){
          $('.alert-warning').slideUp()
        }
        $('#clientquery').val($q)
      }
    })
    $('button.close').click(function(){
      $('.alert-warning').slideUp()
    })

    // 页面载入后幻灯片显示设置
    $('.carousel-inner .item').eq(0).addClass('active')

    // 首页公司核对提交
    $('button.submit').click(function(){
      $('#clientTel').value()
      if(value)
        $(this).text('正在提交……')
    })
  })
})(jQuery)
