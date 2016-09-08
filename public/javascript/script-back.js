(function($){
  $(document).ready(function(){
    // 所有的内容都写在这里
    var pathname = location.pathname
    var hash = location.hash

    // 当前导航背景

    $("#sidebar_left .nav.sidebar-menu>li>a[href='" + pathname + "']" ).parent().addClass('active');

    // 提交
    $('button[type="submit"]').on('submit', function() {
      $(this).prop("disabled", true)
    })

    // 删除
    $('.del').click(function(e) {
      var target = $(e.target)
      var id = target.data('id')
      var item = $('.item-id-' + id.split('.')[0])
      var delUrl = pathname + '?id='

      $.ajax({
        type: 'DELETE',
        url: delUrl + id
      }).done(function(result){
        if (result.success == 1) {
            if(item.length > 0) {
              item.remove()
            }
        }
      })
    })

    // 修改
    $('.change').click(function(e) {
      var target = $(e.target)
      var id = target.data('id')
      location.search = "?id=" + id
    })
    // 查看
    $('.view_blog').click(function(e) {
      var target = $(e.target)
      var id = target.data('id')
      var url = "/blog/article" + "?id=" + id
      window.open(url)
    })

    // 博客类别点击显示
    // $('.mt-checkbox>span').click(function(){
    //   $(this).parent().addClass('after')
    //   console.log('f');
    // })

    // 登录页面用户名不存在事件
    if (pathname == "/login")
        if (hash == "#err") {
          $('.alert-danger').show();
          $(".alert-danger .close").click(function() {
            location.hash = ""
          })
        }

  // js这里结束
  })
})(jQuery)
