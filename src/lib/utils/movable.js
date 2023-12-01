export default function movable(node) {
    let moving = false
    let x, y, left, top
      
    // Note: 发送自定义事件
    function fire(type, option) {
      node.dispatchEvent(new CustomEvent(type, option))
    }
      
    function handleMove(e) {
      if (moving) {
        node.style.left = (e.clientX - x + left) + 'px'
        node.style.top = (e.clientY - y + top) + 'px'
              
        // Note: 发送 moving
        fire('moving', {
          detail: { x: e.clientX - x + left, y: e.clientY - y + top }
        })
      }
    }
   
    function startMove(e) {
    console.log(node, e, '1232');
      moving = true
          
      x = e.clientX
      y = e.clientY
          
      left = parseInt(node.style.left) || 0
      top = parseInt(node.style.top) || 0
          
      // Note: 发送 movestart
      fire('movestart', { detail: {x:left, y:top}})
    }
      
    function endMove() {
      moving = false
          
      // Note: 发送 moveend
      fire('moveend')
    }
      
    node.addEventListener('mousemove', handleMove)
    node.addEventListener('mouseup', endMove)
    node.addEventListener('mousedown', startMove)
      
    return {
      destroy() {
        node.removeEventListener('mousemove', handleMove)
        node.removeEventListener('mouseup', endMove)
        node.removeEventListener('mousedown', startMove)
      }
    }
}
export function longpress(node, duration) {
    let timer;
      
    const handleMousedown = () => {
      timer = setTimeout(() => {
        node.dispatchEvent(
          new CustomEvent('longpress')
        );
      }, duration * 1000);
    };
      
    const handleMouseup = () => clearTimeout(timer);
   
    node.addEventListener('mousedown', handleMousedown);
    node.addEventListener('mouseup', handleMouseup);
   
    return {
      destroy() {
        node.removeEventListener('mousedown', handleMousedown);
        node.removeEventListener('mouseup', handleMouseup);
      },
      update(newDuration) {
        duration = newDuration;
      }
    };
}