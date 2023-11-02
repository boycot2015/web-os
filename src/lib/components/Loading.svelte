<style lang="less" scoped>
    .loading {
        width: 100%;
        margin: 20px 0;
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
</style>
<script>
    export let text = '加载中...';
</script>
<div class="loading flex-row just-c align-c tc">
    <div class="loading-icon"></div>
    <div class="text">{text}</div>
</div>