(function (doc,win){
    var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ?'orientationchange':'resize'
    //recalc 改变font-size值的大小
    recalc = function () {
        //获取我设备的宽度
        var clientWidth = docEl.clientWidth;
        console.log(clientWidth, 'clientWidth');
        if (!clientWidth) return;
            //如果设备宽度大于750超出移动端返回.
        if (clientWidth > 750){
            docEl.style.fontSize ='50px';
        } else {
            //把fontSize值大小设置成大小/750*100
            docEl.style.fontSize = 100 * (clientWidth / 750) +'px';
        }
    }
    if (!doc.addEventListener)return;
    //在你屏幕发生旋转，或者是放大缩小时执行上面的函数
    win.addEventListener(resizeEvt, recalc, false);
    //在你的页面初始化的时候执行上面的函数
    doc.addEventListener('DOMContentLoaded', recalc, false);
    /*D0 MContentLoaded文档加载完成不包含图片资源onload包含图片资源*/
    })(document,window);