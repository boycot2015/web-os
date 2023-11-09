<script>
    import { Divider } from 'stdf';
    import Icon from './Icon.svelte';
    import { goto } from '$app/navigation'
    // ri-arrow-go-back-line
    export let icon = 'ri-close-circle-line';
    export let path = '/';
    export let title = '超级app'
</script>
<style scoped lang="less">
    .actions {
        top: 0;
        right: 0;
        left: 0;
        padding: var(--gap-10) var(--padding-gap);
        z-index: 9999;
        background-color: var(--color-fff);
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
            top: -1px !important;
        }
    }
</style>
<div class="actions fixed flex items-center left-0 right-0 justify-between">
    <div class="flex-1">
        {title}
    </div>
    <div class="sups flex items-center justify-around border rounded-2xl border-black/10 border-gray-300 px-2 py-1">
        <Icon injClass="more text-gray-800" on:click={() => goto(path)} name="{'ri-more-fill'}" size={26} />
        <i class="line text-gray-300">|</i>
        <Icon injClass="back text-gray-800" on:click={() => goto(path)} name="{icon}" size={26} />
    </div>
</div>
