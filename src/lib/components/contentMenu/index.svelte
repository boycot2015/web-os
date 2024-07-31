<script>
    import { onMount,createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
    $: contextmenu = [
    {
        name: '刷新',
        event: 'refresh'
    },
    {
        name: '打印',
        event: 'print'
    },
    {
        name: '另存为',
        event: 'saveHtml'
    },
    {
        name: '编辑',
        event: 'editApp',
        hide: true
    },
    {
        name: '移除',
        event: 'removeApp',
        hide: true
    },
    {
        name: '+添加',
        event: 'addApp'
    },
    {
        name: '随机壁纸',
        event: 'randomWallpaper'
    },
    {
        name: '换主题',
        event: 'changeTheme'
    }]
    const onMenuClick =  (event, menu) =>  {
        switch (menu.event) {
        case 'refresh':
            window.location.reload()
            break
        case 'print':
            window.print()
            break
        case 'saveHtml':
           exportHtml(document.title + '.html', document.getElementsByTagName('html')[0].outerHTML)
            break
        default:
            break
        }
        dispatch('menuClick', menu)
        document.querySelector('#contextmenu').style.display = 'none'
    }
    const getBase64Image  =  (imgurl) =>   {
        var img = new Image()
        img.src = imgurl
        img.setAttribute('crossOrigin', 'anonymous')
        img.onload = function () {
            var canvas = document.createElement('canvas')
            canvas.width = 300// 这个设置不能丢，否者会成为canvas默认的300*150的大小
            canvas.height = 300// 这个设置不能丢，否者会成为canvas默认的300*150的大小
            var ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0, 300, 300)
            var dataURL = canvas.toDataURL('image/png')
            console.log(dataURL)
        }
    }
    const fakeClick  =  (obj)  =>  {
        var ev = document.createEvent('MouseEvents')
        ev.initMouseEvent(
            'click', true, false, window, 0, 0, 0, 0, 0
            , false, false, false, false, 0, null
        )
        obj.dispatchEvent(ev)
    }
    const exportHtml  =  (name, data) => {
        var urlObject = window.URL || window.webkitURL || window
        var exportblob = new Blob([data])
        var savelink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
        savelink.href = urlObject.createObjectURL(exportblob)
        savelink.download = name
        fakeClick(savelink)
    }
    onMount(() => {
        window.addEventListener('contextmenu', (e) => {
            // 取消默认的浏览器自带右键 很重要！！
            e.preventDefault()
            const getAppCont = (node) => {
                if (node.parentNode && !node.querySelectorAll('.app-title').length) return getAppCont(node.parentNode);
                return node.querySelectorAll('.app-title').length === 1 ? node.querySelector('.app-title') : null;
            }
            let currentIsApp = getAppCont(e.target);
            contextmenu = contextmenu.map(el => {
                if (el.event === 'editApp' || el.event === 'removeApp') {
                    el.hide = true
                }
                return el
            })
            if (currentIsApp) {
                contextmenu = contextmenu.map(el => {
                    if (el.event === 'editApp' || el.event === 'removeApp') {
                        el.hide = Boolean(currentIsApp.getAttribute('data-affix'))
                        el.app = {
                            text: currentIsApp.getAttribute('data-text'),
                            url: currentIsApp.getAttribute('data-url'),
                            icon: currentIsApp.getAttribute('data-icon')
                        }
                    }
                    return el
                })
            }
            // 获取我们自定义的右键菜单
            var menu = document.querySelector('#contextmenu')
            if (!menu) return
            // 根据事件对象中鼠标点击的位置，进行定位
            menu.style.left = e.clientX + 'px'
            menu.style.top = e.clientY + 'px'

            // 改变自定义菜单的宽，让它显示出来
            menu.style.display = 'block'
        })
        // 关闭右键菜单，很简单
        window.onclick = function (e) {
            var menu = document.querySelector('#contextmenu')
            if (!menu) return
            // 用户触发click事件就可以关闭了，因为绑定在window上，按事件冒泡处理，不会影响菜单的功能
            menu.style.display = 'none'
            e.preventDefault()
        }
    })

</script>
<div id="contextmenu" role="none" on:click|preventDefault>
    {#each contextmenu.filter(el => !el.hide) as menu}
        <div class="menu" role="none" key="{menu.name}" on:click|stopPropagation={(event) => onMenuClick(event, menu)}>{menu.name}</div>
    {/each}
</div>
<style lang="less" scoped>
#contextmenu {
    position: absolute;
    // height: 160px;
    z-index: 999999999;
    background: var(--color-fff);
    color: var(--color-333);
    border-radius: 5px;
    width: 120px;
    display: none;
    overflow: hidden;
    box-shadow: 0 5px 10px var(--color-333);
    user-select: none;
    .menu {
        padding: 0 10px;
        line-height: 32px;
        font-size: 14px;
        color: var(--color-333);
        &:hover {
            background: var(--primary-color);
            color: var(--color-fff);
        }
    }
}
</style>
