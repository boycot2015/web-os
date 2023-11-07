<style lang="less" scoped>
    .loading {
        width: 100%;
        margin: var(--padding-gap) 0;
        padding: 0 var(--padding-gap);
        &-icon {
            width: 20px;
            height: 20px;
            border-radius: 100px;
            border: 2px solid #000;
            border-top-color: transparent;
            animation: rotate linear .75s infinite;
        }
        @keyframes rotate {
            0% {
                transform: rotate(0deg);
            }
            50% {
                transform: rotate(180deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
        .text {
            margin-left: var(--padding-gap);
            font-size: 16px;
        }
    }
    :global(.no-more) {
        font-size: var(--font-size-16);
    }
</style>
<script>
    import { Divider } from 'stdf';
    export let text = '加载中...';
    export let loading = true;
</script>
<div class="loading {loading?'flex-row':''} just-c align-c tc">
    {#if loading}
    <div class="loading-icon"></div>
    <div class="text">{text}</div>
    {:else}
    <Divider line="dashed" injClass="no-more" text="我是有底线的"></Divider>
    {/if}
</div>