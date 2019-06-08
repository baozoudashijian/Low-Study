
(function($) {

    $.fn.scrollLoading = function(options) {
        // 默认参数
        var defaults = {
            attr: 'data-url',
            container: window,
            callback: $.noop //你需要传入函数,但是$.noop什么都不做
        };
        //不管有无参数,先合并参数
        var params = $.extend({}, defaults, options || {});
        //把父元素转成jquery对象
        var container = $(params.container);

        // 新建一个数组,然后调用each方法,用于存储每个dom相关的数据;
        params.cache = [];
        $(this).each(function() { // $(this)是什么? $(this)是选中的所有img
            var node = this.nodeName.toLowerCase(), url = $(this).attr(params["attr"]);
            //重组, 把每个dom对象上的属性存为一个对象;
            var data = {
                obj: $(this),
                tag: node,
                url: url
            }
            //把这个对象加到一个数组中;
            params.cache.push(data);
        });
        //回调函数
        var callback = function(call) {
            if($.isFunction(params.callback))  { //isFunction: 判断是否为一个函数
                params.callback.call(call);
            }
        }

        //
        var loading = function() {
            // 获取父元素的高度
            var contHeight = container.outerHeight();
            var contWidth = container.outerWidth();
            
            if(container.get(0) === window) {
                var contop = $(window).scrollTop();
                var conLeft = $(window).scrollLeft();
            }else {
                var contop = container.offset().top;
                var conleft = container.offset().left;
            }
            $.each(params.cache,function(i,data ) {
                var o = data.obj, tag = data.tag, url = data.url, post, posb;
                if(o) {
                    post = o.offset().top - (contop + contHeight);
                    posb = o.offset().top + o.height() - contop;

                    if(o.is(':visible') && (post < 0 && posb > 0) ) {
                        if(url) {
                            if(tag === "img") {
                                callback(o.attr('src',url));
                            }else {
                                callback(o.css("background-image","url("+url+")"));
                            }
                        }else {
                            callback(o);
                        }
                        data.obj = null;
                    }
                }
            })

        }
        loading();
        container.bind("scroll",loading);
 
    }


})(jQuery)