<script>
    export let title = '';
    export let type = '';
    
</script>
<style scoped lang="less">
    .card {
        background-color: var(--color-fff);
        box-shadow: 0 0 10px var(--border-color);
        border-radius: var(--border-radius);
        overflow: hidden;
        .title {
            line-height: 58px;
            font-size: 18px;
            color: var(--color-fff);
            padding: 0 var(--padding-gap);
            background: linear-gradient(190deg, skyblue, purple);
            border-bottom: 1px solid var(--border-color);
        }
        .body {
            font-size: 16px;
            padding: var(--padding-gap);
        }
        &.pic-card {
            .body {
                padding: 0;
            }
        }
    }
</style>
<div class="card {type === 'img'? 'pic-card':''}">
    {#if type != 'img'}
    <slot name="title">
        {#if title}
        <div class="title flex-row just-b">{title} <i class="more">></i></div>
        {/if}
    </slot>
    {/if}
    <div class="body">
        <slot></slot>
    </div>
    {#if type == 'img'}
    <slot name="title">
        {#if title}
        <div class="title flex-row just-b">{title} <i class="more">></i></div>
        {/if}
    </slot>
    {/if}
</div>