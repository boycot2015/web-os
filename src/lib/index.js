// place files you want to import through the `$lib` alias in this folder.
import { baseApiUrl } from './request/base'
const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
/**
 * 对一个对象进行深拷贝
 * @param object
 * @returns {*}
 *
 */
export const deepClone = (object) => {
    let str
    let newobj = object.constructor === Array ? [] : {}
    if (typeof object !== 'object') {
        return object
    } else if (window.JSON) {
        str = JSON.stringify(object)
        newobj = JSON.parse(str)
    } else {
        for (const i in object) {
            if (Object.prototype.hasOwnProperty.call(object, i)) {
                newobj[i] = typeof object[i] === 'object' ? deepClone(object[i]) : object[i]
            }
        }
    }
    return newobj
}
// 拖拽运动
export function drag (obj,opt={},passive){
    //提取非行间样式
    function getStyle(obj,attr) {
        if(obj.currentStyle) { return obj.currentStyle[attr];}
        else { return getComputedStyle(obj,false)[attr];}
    }
    // 默认配置选项
    const option={
        direction:'auto',//方向 lr(左右)  tb(上下)
        // 运动范围 默认父级边界
        top:0,
        bottom:0,
        left:0,
        right:0,
        //parent:'warp', // 为页面唯一元素，id 名称，例如 warp ,默认body整个页面
        scroll:false // 拖拽元素是否随 页面滚动 false 不随页面滚动，true 随页面滚动
    }
        // 合并对象参数
    Object.assign(option,opt)

    // let lastX=0;
    // let lastY=0;
    let parent_width=0,parent_height=0,parent_left=0,parent_top=0;
    let ele_position='relative'
    if(option.scroll){
        ele_position='absolute'
    }else{
        // 如果不跟随页面滚动，并且元素父级不是body,父元素定位,
        if(option.parent)
            document.getElementById(option.parent).style.position='fixed'
    }

    // 设置元素的定位，需要放置获取 parent_* 值之前
    obj.style.position=ele_position

    if(option.parent){
        const parent_ele=document.getElementById(option.parent)
        parent_width=parent_ele.clientWidth;
        parent_height=parent_ele.clientHeight;
        parent_left=parent_ele.offsetLeft;
        parent_top=parent_ele.offsetTop;
    }else{
            if(option.scroll){
                parent_width=document.documentElement.scrollWidth
                parent_height=document.documentElement.scrollHeight
            }else{
                parent_width=document.documentElement.clientWidth
                parent_height=document.documentElement.clientHeight
            }
    }

    // 设置元素位置
    obj.style.left=option.left+parent_left+'px'
    obj.style.top=option.top+parent_top+'px'

    // 手指按下
    obj.addEventListener('touchstart',touchStartEvent,passive);

    function touchStartEvent(ev)
    {
       const Ev=ev||event; // FF || IE
       const touch = Ev.targetTouches[0];
       let disX=0,disY=0;

       if(option.direction=='lr'){
                 disX=touch.clientX-parseInt(getStyle(obj,'left'));
       }else if(option.direction=='tb'){
                disY=touch.clientY-parseInt(getStyle(obj,'top'));
       }else{
             disX=touch.clientX-parseInt(getStyle(obj,'left'));
             disY=touch.clientY-parseInt(getStyle(obj,'top'));
       }

       if(obj.setCapture)//设置事件捕获  针对IE
       {
            obj.addEventListener('touchmove',touchMoveEvent,passive);
               obj.addEventListener('touchend',touchEndEvent,passive);
            obj.setCapture();
       }else
       {
            obj.addEventListener('touchmove',touchMoveEvent,passive);
               obj.addEventListener('touchend',touchEndEvent,passive);
       }
           // 鼠标移动
        function touchMoveEvent(ev)
        {
               const Ev=ev||event; // FF || IE
               const touch = Ev.targetTouches[0];

            let left=0,top=0,move_left=0,move_top=0
            if(option.direction=='lr'){
                   // 可移动的最大左边距离
                   move_left=parent_width-parseInt(getStyle(obj,'width'))-option.right+parent_left
                      if(left>=move_left){
                          left=move_left
                      }else if(left<=option.left+parent_left){
                          left=option.left+parent_left
                      }else{
                          left=touch.clientX-disX;
                      }
                    //   lastX=left;
                      obj.style.left=left+'px';

               }else if(option.direction=='tb'){
                   // 可以移动的最大上边距
                   move_top=parent_height-parseInt(getStyle(obj,'height'))-option.top+parent_top
                   if(top>=move_top){
                    top=move_top
                   }else if(top<=option.bottom+parent_top){
                    top=option.bottom
                   }else{
                           top=touch.clientY-disY;
                   }
                //    lastY=top;
                   obj.style.top=top+'px';
               }else{
                left=touch.clientX-disX;
                top=touch.clientY-disY;

                move_left=parent_width-parseInt(getStyle(obj,'width'))-option.right+parent_left
                move_top=parent_height-parseInt(getStyle(obj,'height'))-option.bottom+parent_top

                if(left>=move_left){
                          left=move_left
                      }else if(left<=option.left+parent_left){
                          left=option.left+parent_left
                      }
                      if(top>=move_top){
                    top=move_top
                    }else if(top<=option.bottom+parent_top){
                    top=option.bottom+parent_top
                    }

                // lastX=left;
                // lastY=top; // 当前的点赋给一个变量（上一个点）
                obj.style.left=left+'px';
                  obj.style.top=top+'px'; //移动物体
               }
        }
        // 鼠标抬起
        function touchEndEvent()
          {
            obj.addEventListener('touchmove',touchMoveEvent,passive);
               obj.addEventListener('touchend',touchEndEvent,passive);
            //释放事件捕获
            if(obj.releaseCapture)
            { obj.releaseCapture(); }

          }
        // 拖拽元素时，阻止页面跟随滚动问题
        // 由于 {passive: false} ，如果不阻止默认事件，chrome 浏览器会有警告
          Ev.preventDefault()
        return false;
    }
}
export {
    week,
    baseApiUrl
}
