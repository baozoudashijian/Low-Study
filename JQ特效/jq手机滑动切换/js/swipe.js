
var photoSwipe = {
    site: {
        _x_start: 0,
        _y_start: 0,
        _x_move: 0,
        _y_move: 0,
        _x_end: 0,
        _y_end: 0,
        top_val: 0,
        left_val: 0
    },
    index: 0,
    run: true,
    load: false,
    init: function () {
        document.querySelector('#photo_box>div>div').innerHTML = this.imgHtml()
    },
    imgHtml: function () {
        var str = '<div id="ind-' + this.index + '">'
            + '<div class="div1">' + (this.index + 1) + '</div>'
        return str;
    },
    animateMove: function (el, val) {
        if (!this.run) {
            return;
        }
        this.run = false;
        el.css({
            "transform": "translate3d(" + doc_width * val + "px," + photoSwipe.top_val * 2.2 + "px,0px)",
            "transition-duration": "0.3s"
        });
        var moveTime = setTimeout(function () {
            el.remove();
            var ind_el = $("#ind-" + (photoSwipe.index));
            photoSwipe.activeEl(ind_el);
            photoSwipe.index++;
            $("#photo_box>div>div").append(photoSwipe.imgHtml());
            photoSwipe.run = true;
        }, 300)
    },
    animateReset: function (el) {
        el.css({
            "transform": "translate3d(0px,0px,0px)",
            "transition-duration": "0.3s"
        });
        var resetTime = setTimeout(function () {
            el.css("transition-duration", "0s");
        }, 1000)
    },
    activeEl: function (el) {
        el.css("z-index", "2");
    },
    clearLocation: function () {
        this.left_val = 0;
    }

}
photoSwipe.init();

var doc_width = $(document).width(),
    doc_height = $(document).height();

photoSwipe.activeEl($("#ind-0"));
photoSwipe.index++;
$("#photo_box>div>div").append(photoSwipe.imgHtml());

$("#photo_box").on("touchstart", function (e) {
    if (!photoSwipe.load || !photoSwipe.run) {
        return;
    }
    var ev = e || window.event;
    photoSwipe._x_start = ev.touches[0].pageX;
    photoSwipe._y_start = ev.touches[0].pageY;
});

$("#photo_box").on("touchmove", function (e) {
    console.log(1);
    if (!photoSwipe.load || !photoSwipe.run) {
        return;
    }
    var ev = e || window.event;
    var act_el = $("#ind-" + (photoSwipe.index - 1).toString());
    photoSwipe._x_move = ev.touches[0].pageX;
    photoSwipe._y_move = ev.touches[0].pageY;
    photoSwipe.top_val = parseFloat(photoSwipe._y_move) - parseFloat(photoSwipe._y_start);
    photoSwipe.left_val = parseFloat(photoSwipe._x_move) - parseFloat(photoSwipe._x_start);

    act_el.css({ "transform": "translate3d(" + photoSwipe.left_val + "px," + photoSwipe.top_val + "px,0px)", "transition-duration": "0s" })
});

$("#photo_box").on("touchend",function(e) {
    if(!photoSwipe.load || !photoSwipe.run) {
        return;
    }
    var ev = e || window.event;
    var act_el = $("#ind-"+(photoSwipe.index - 1).toString())
    photoSwipe._x_end = ev.changedTouches[0].pageX;
    photoSwipe._y_end = ev.changedTouches[0].pageY;
    if(photoSwipe.left_val > 0 && photoSwipe.left_val > doc_width/2 - doc_width/4.5) {
        photoSwipe.animateMove(act_el,1);
    }else if(photoSwipe.left_val < 0 && photoSwipe.left_val < -doc_width/2 + doc_width/4.5) {
        photoSwipe.animateMove(act_el, -1);
    }else{
        photoSwipe.animateReset(act_el);
    }
});
$(function () {
    photoSwipe.load=true;
});


// 注: jquery版本的问题: jq版本过低导致获得的事件源对象不一致.
