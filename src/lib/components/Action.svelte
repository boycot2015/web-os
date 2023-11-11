<script>
  import { onMount } from 'svelte';
    import Icon from './Icon.svelte';
    export let icon = 'ri-close-circle-line';
    export let path = '/';
    export let title = '超级app'
    let scrollTop = 100;
    export let opacity = 0;
    onMount(() => {
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
        z-index: 9999;
        // background-color: var(--color-fff);
        // box-shadow: 0 0 var(--gap-20) var(--color-ccc);
        // border: 1px solid var(--border-color);
        font-size: var(--font-size-20);
        // &.left {
        //     right: auto;
        //     left: var(--padding-gap);
        // }
        :global(.more) {
            padding-right: .8rem;
        }
        // &.middle {
        //     left: auto;
        //     top: auto;
        //     right: var(--padding-gap);
        //     bottom: 50%;
        // }
        :global(.back) {
            padding-left: .8rem;
            position: relative;
            top: -2px !important;
        }
    }
</style>
<div style="background: rgba(255, 255, 255, {opacity})" class="actions fixed transition-all flex items-center left-0 right-0 justify-between">
    <div class="flex-1 {opacity <1?'!text-white':''}">
        {title}
    </div>
    <div class="sups flex items-center justify-around border rounded-3xl bg-gray-300/10 border-black/10 border-gray-300 px-2 py-0.5">
        <Icon injClass="more text-gray-800 {opacity <1?'!text-white':''}" name="{'ri-more-fill'}" size={26} />
        <i class="line text-gray-300 {opacity <1?'!text-white':''}">|</i>
        <!-- <Icon injClass="back text-gray-800" on:click={() => goto(path)} name="{icon}" size={26} /> -->
            <a href="{path}">
                <Icon injClass="back text-gray-800 {opacity <1?'!text-white':''}" name="{icon}" size={26} />
            </a>
    </div>
</div>
