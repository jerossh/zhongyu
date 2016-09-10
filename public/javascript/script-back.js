(function($){
  $(document).ready(function(){

    // 所有的内容都写在这里
    // 地址栏变量放在这里
    var pathname = location.pathname
    var hash = location.hash
    var local_search = location.search

    // 登陆页
    // 登录页面用户名不存在事件
    if (pathname == "/login")
        if (hash == "#err") {
          $('.alert-danger').show();
          $(".alert-danger .close").click(function() {
            location.hash = ""
          })
        }
    // 密码事件
    var inputPass = $('.form-password-1')
    var relPass = $('.form-password-2')

    // keyup keycode输出都是大写，charcode都是0
    inputPass.keypress(function(e){
      var charCode = e.charCode;
      e.preventDefault();
      if(charCode >= 48 && charCode <= 122){
        inputPass.val(inputPass.val() + '*');
        relPass.val(relPass.val()+String.fromCharCode(charCode))
      }
    })
    //登陆页结束


    // 导航部分
    // 当前导航激活状态
    $("#sidebar_left .nav.sidebar-menu>li>a[href='" + pathname + "']" ).parent().addClass('active');

    // 导航宽度缩放
    function changeNav(){
      var panelWidth = $('#panel-wrap').width();
      var countNav = $('.sidebar-left-content>.nav>li').length;
      console.log(countNav);
      $('.nav>li>a').css('width', panelWidth/countNav);
      $('body.sb-top #sidebar_left .sidebar-menu > li > ul').css('width', panelWidth/countNav);
    }
    // 函数节流
    function throtle(method, context) {
      setTimeout(method.tid)
      method.tid = setTimeout(function(){
        method.call(context)
      }, 200)
    }
    $(window).resize(function(){
      throtle(changeNav)
    })
    // 加载的时候执行一次
    changeNav()
    // 导航部分结束


    // 表格列表功能
    // 提交功能

    $('button[type="submit"]').on('submit', function() {
      $(this).prop("disabled", true)
    })
    // 修改功能界面文字
    if (local_search) {
      
    }




    // 表格内事件委托
    var arr = ['del', 'change', 'view_blog']
    // 这里开始委托
    $('.chute-bin').on('click', 'button', function(e) {
      var that = this
      arr.forEach(function(val){
        console.log(val);
        if($(that).hasClass(val)) {
          console.log(val);
          switch (val) {
            case 'del':
              del(e)
              break;
            case 'change':
              change(e)
              break;
            case 'view_blog':
              view_blog(e)
              break;

          }
        }
      })
      $(this).hasClass('.change')
    })
    // 删除功能
    function del(e){
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
    }

    function change(e){
      var target = $(e.target)
      var id = target.data('id')
      location.search = "?id=" + id
    }

    function view_blog(e) {
      var target = $(e.target)
      var id = target.data('id')
      var url = "/blog/article" + "?id=" + id
      window.open(url)
    }
    // 表格内事件委托结束



    //   // 删除功能
    // $('.del').click(function(e) {
    //   var target = $(e.target)
    //   var id = target.data('id')
    //   var item = $('.item-id-' + id.split('.')[0])
    //   var delUrl = pathname + '?id='
    //
    //   $.ajax({
    //     type: 'DELETE',
    //     url: delUrl + id
    //   }).done(function(result){
    //     if (result.success == 1) {
    //         if(item.length > 0) {
    //           item.remove()
    //         }
    //     }
    //   })
    // })
    //
    //
    //
    //
    // // 修改功能
    // $('.change').click(function(e) {
    //   var target = $(e.target)
    //   var id = target.data('id')
    //   location.search = "?id=" + id
    // })
    //
    // // 查看博客
    // $('.view_blog').click(function(e) {
    //   var target = $(e.target)
    //   var id = target.data('id')
    //   var url = "/blog/article" + "?id=" + id
    //   window.open(url)
    // })





    // 博客类别点击显示，用 css 兄弟选择服解决了
    // $('.mt-checkbox>span').click(function(){
    //   $(this).parent().addClass('after')
    //   console.log('f');
    // })


  // js这里结束
  })
})(jQuery)
