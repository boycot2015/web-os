<script>
    import { Icon } from 'stdf';
    import { goto } from '$app/navigation'
    export let icon = 'ri-arrow-go-back-line';
    export let position = '';
    export let path = '/';
</script>
<style scoped lang="less">
    .back-home {
        position: fixed;
        left: auto;
        bottom: var(--gap-60);
        right: var(--padding-gap);
        padding: var(--gap-10);
        border-radius: 100%;
        z-index: 9999;
        background-color: var(--color-fff);
        box-shadow: 0 0 var(--gap-20) var(--color-ccc);
        &.left {
            right: auto;
            left: var(--padding-gap);
        }
        &.middle {
            left: auto;
            right: var(--padding-gap);
            bottom: 50%;
        }
    }
</style>
<div class="back-home  {position}" role="none" on:click={() => goto(path)}><Icon name="{icon}" /></div>
