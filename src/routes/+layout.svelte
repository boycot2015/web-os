<style lang="less" scoped>
    .layout {
        height: 100%;
    }
</style>
<script>
    import { appConfig } from '@/store';
    import { onMount, onDestroy } from 'svelte';
    // const setPageZoom = () => {
    //     var percentage, appHeight = 1000;//设置默认屏幕大小
    //     percentage = window.innerHeight *100 / appHeight;
    //     percentage = Math.floor(percentage) / 100;
    //     document.documentElement.style.zoom= percentage;
    // }
    onMount(() => {
        window.addEventListener('mousewheel', function(event){
            if (event.ctrlKey === true || event.metaKey) {
                event.preventDefault();
            }
        },{ passive: false});
        //firefox
        window.addEventListener('DOMMouseScroll', function(event){
            if (event.ctrlKey === true || event.metaKey) {
                event.preventDefault();
            }
        },{ passive: false});
        //+_
        document.addEventListener('keydown', function (event) {
            if ((event.ctrlKey === true || event.metaKey === true)
                && (event.which === 61 || event.which === 107
                || event.which === 173 || event.which === 109
                || event.which === 187  || event.which === 189))
            {
                event.preventDefault();
            }
        }, false);
    })
    // onDestroy(() => {
    //     window.removeEventListener('resize', setPageZoom)
    // })
</script>
<div class="layout {$appConfig.bgColor} h-full w-full"  style="background: url({$appConfig.bgUrl}) center/cover no-repeat fixed;">
    <slot></slot>
</div>