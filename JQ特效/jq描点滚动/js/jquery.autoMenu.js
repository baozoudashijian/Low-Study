/*
*锚点: 2019-4-24 by zh
*说明: 自动根据标签 (h3,h4) 生成博客目录
*
*/

(function ($) {

    var Menu = (function () {

        var Plugin = function (element, options) {

            this.$element = $(element); // 实例化后.p.$element就是传进来的dom; $('#autoMenu');

            //将插件的 [默认参数] 及 [用户定义的参数] 合并到一个新的obj里
            this.settings = $.extend({}, $.fn.autoMenu.defaults, typeof options === 'object' && options)

            //调用init()方法,实例话就调用这个方法.
            this.init();
        }

        /* 
         *将插件的所有函数放在prototype上
         * 插件的公用方法,相当于接口,用于给外部调用
         */
        Plugin.prototype = {
            init: function () {

                //根据传入的参数 && 默认参数 首先生成html框架
                this.$element.html(this.createHtml()); // $('foo').html 外面一个盒子包裹生成的html;
                this.setActive();
                this.bindEvent();

            },
            createHtml: function () {
                var that = this;
                var opts = that.settings;
                var width = typeof opts.width === 'number' && opts.width; //获得宽度
                var height = typeof opts.height === 'number' && opts.height; //获得高度
                var padding = typeof opts.padding === 'number' && opts.padding; //获得padding值.
                that.$element.width(width + padding * 2); //设置容器宽度
                var html = '<ul style="height:' + height + 'px;padding:' + padding + 'px">'; //先设置ul一边 然后拼接,最后ul封口
                var num = 0;
                $('*').each(function () {
                    var _this = $(this);
                    if (_this.get(0).tagName == opts.levelOne.toUpperCase()) { //_this.get(0)是获得当前元素 //循环判断从上至下如果
                        _this.attr('id', num); // 给当前 加上id属性
                        var nodetext = that.handleText(_this.html()); // 一简洁的javascript框架
                        html += '<li name="' + num + '"><a href="#' + num + '">' + nodetext + '</a></li>'; //<a href="#0">
                        num++;
                    } else if (_this.get(0).tagName == opts.levelTwo.toUpperCase()) {
                        _this.attr('id', num);
                        var nodetext = that.handleText(_this.html());
                        html += '<li class="sub" name="' + num + '"><a href="#' + num + '">' + nodetext + '</a></li>';
                        num++;

                    }
                });
                //添加锚点的框
                html += '</ul><a href="javascript:void(0);" class="btn-box">'
                    + '<span class="icon-minus-sign"></span>'
                    + '</a>';
                
                return html;
            },
            handleText: function(txt) {
                //正则表达式去除HTML的标签
                return txt.replace(/<\/?[^>]+>/g,"").trim();
            },
            setActive: function() {
                var $el = this.$element,
                    opts = this.settings,
                    items = opts.levelOne + ',' + opts.levelTwo,
                    $items = $(items), //选中所有的h3 h4 标签
                    offTop = opts.offTop,
                    top = $(document).scrollTop(),//滚动条滚动的高度
                    currentId;
                //滚动条高度为0 第一个li加上active;
                if($(document).scrollTop() == 0) {
                    $el.find('li').removeClass('active').eq(0).addClass('active');
                    return;
                }
                $items.each(function() {
                    var m = $(this),
                        itemTop = m.offset().top;
                        console.log(itemTop,top);
                    if(top > itemTop-offTop) {
                        currentId = m.attr('id');
                    }else {
                        return false;
                    }
                });
                //左边滑动 右边对应显示active
                var currentLink = $el.find('.active');
                if(currentId && currentLink.attr('name') != currentId) {
                    currentLink.removeClass('active');
                    $el.find('[name='+currentId+']').addClass('active');
                }
            },
            //绑定事件可以放在一个方法中学到了.
            bindEvent: function() {
                var _this = this;
                //绑定滑动事件
                $(window).scroll(function() {
                    _this.setActive();
                });
                
                _this.$element.on('click','.btn-box',function() {
                    if($(this).find('span').hasClass('icon-minus-sign')) {
                        $(this).find('span').removeClass('icon-minus-sign').addClass('icon-plus-sign');
                        _this.$element.find('ul').fadeOut();
                    }else {
                        $(this).find('span').removeClass('icon-plus-sign').addClass('icon-minus-sign');
                        _this.$element.find('ul').fadeIn();
                    }
                })
            }
        };
        
        return Plugin;

    })();
    
    //将Plugin对象 转换成jq插件的形式进行调用
    
    //将这个方法 挂载到jQuery对象上去使用
    // $.fn.autoMenu = function(options) {
    //     return this.each(function() {
    //         var $el = $(this), //谁调用这个方法他this就指向谁 $('#autoMenu').autoMenu//此时this指向$('#autoMenu')
    //             menu = $el.data('autoMenu'), //获取data-autoMenu属性
    //             option = $.extend({}, $.fn.autoMenu.defaults, typeof options === 'object' && options);//传入的参数和默认参数合并
    //         if(!meun) {
    //             $el.data('autoMenu', new Menu(this,option)); //如果没写data-autoMen属性就加上这个属性并且实例化Menu
    //         }

    //         if($.type(options) === 'string') menu[option]();
    //     });
    // };
    $.fn.autoMenu = function() {};
    //插件默认值
    $.fn.autoMenu.defaults = {
        levelOne: 'h3',
        levelTwo: 'h4',
        width: 200,
        height: 400,
        padding: 20,
        offTop: 100
    }
    console.dir($.fn);
    $(function() {
        if($('[data-autoMenu]').length > 0) {
            new Menu($('[data-autoMenu]'));
            console.dir(new Menu($('[data-autoMenu]')));
        }
    })

})(jQuery)

///1. 在jq对象上 [定义方法] 和 在jq对象上定义的 [方法上去定义属性] 
        // eg: $.fn.autoMenu = function() {};  //一般都定义在$.fn上;
        //     $.fn.autoMenu.defaults = {};  //可以不传参数的默认值定义在这个地方;

///2.最后就是新增一种调用方法,属性方式的调用和在script标签中去调用.