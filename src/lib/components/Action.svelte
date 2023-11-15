<script>
    import { onMount } from 'svelte';
    import Icon from './Icon.svelte';
    import { Popup, Button } from 'stdf';
    import Links from '$lib/components/apps/grid.svelte'
    export let icon = 'ri-close-circle-line';
    export let path = '/';
    export let injClass = '';
    export let title = '超级app';
    export let offsetHeight = 0;
    export let opacity = 0;
    export let info = {};
    let scrollTop = 100;
    let visible = false;
    let links = []
    onMount(() => {
        links = [
            {icon: 'ri-share-forward-line',text: '转发给朋友', color: '!mx-4 text-white', size: 30, bgColor: '!bg-green-600', injTitleClass: '!text-black !text-xs'},
            {icon: 'ri-camera-lens-fill', color: '!mx-4 !text-green-600', size: 30, bgColor: '!bg-transparent',text: '分享到朋友圈', injTitleClass: '!text-black !text-xs'},
            {icon: 'ri-restart-line', color: '!mx-4 text-white', size: 30, bgColor: '!bg-gray-600',text: '重新进入小程序', reload: true, injTitleClass: '!text-black !text-xs'},
        ]
        if (opacity === 1) return
        window.addEventListener('scroll', (e) => {
            scrollTop = e.target.scrollingElement.scrollTop
            scrollTop = scrollTop >= 100 ? 100 : parseInt(scrollTop)
            opacity = parseFloat(scrollTop / 100).toFixed(1)
        })
    })
</script>
<style scoped lang="less">
    .actions {
        top: 0;
        right: 0;
        left: 0;
        padding: var(--gap-10) var(--padding-gap);
        z-index: 99;
        font-size: var(--font-size-18);
        :global(.back) {
            position: relative;
            top: -2px !important;
        }
    }
</style>
<div style="background: rgba(255, 255, 255, {opacity})" class="actions fixed transition-all flex items-center left-0 right-0 justify-between {injClass}" bind:offsetHeight={offsetHeight}>
    {#if path && path !=='/'}
    <a href="{path}">
        <Icon injClass="pr-4 text-gray-800 {opacity <1?'!text-white':''}" name="ri-arrow-left-s-line" size={30} />
    </a>
    {/if}
    <div class="flex-1 {opacity <1?'!text-white':''}">
        {title}
    </div>
    <div class="sups flex items-center justify-around border rounded-3xl bg-gray-300/10 border-black/10 border-gray-300 px-2 py-0.5">
        <Icon on:click={() => visible = true} injClass="text-gray-800 {opacity <1?'!text-white':''}" name="{'ri-more-fill'}" size={26} />
        <i class="line px-3 text-gray-300 {opacity <1?'!text-white':''}">|</i>
        <a href="/">
            <Icon injClass="back text-gray-800 {opacity <1?'!text-white':''}" name="{icon}" size={26} />
        </a>
    </div>
</div>
<Popup radius={'2xl'} size={70} zIndex={9999} bind:visible={visible}>
    <div class="flex items-center py-2 px-4 border-b text-sm">
        <Icon injClass="back text-gray-800" name="{info.logo || 'ri-product-hunt-line'}" size={30} />
        <div class="title text-xl text-gray pl-2 font-bold">{title}</div>
        <Icon injClass="back text-gray-800" name="ri-arrow-right-s-line" size={30} />
    </div>
    <div class="mini-info">
        <Links apps={links} injClass={'!px-0'} cols={4} mx={2} />
    </div>
    <div class="flex fixed w-full bottom-2 border-t flex-col justify-center">
        <Button fill="text" injClass="text-xl" on:click={() => visible = false}>取消</Button>
    </div>
</Popup>
