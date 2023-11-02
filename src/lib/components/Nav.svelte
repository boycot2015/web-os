<style lang="less" scoped>
    .nav {
        // position: fixed;
        // top: 0;
        // left: 0;
        // width: 100%;
        height: 48px;
        line-height: 48px;
        // padding: 0 var(--padding-gap);
        background-color: var(--bg-color);;
        &-item {
            font-size: 20px;
            padding: 0 var(--padding-gap);
            color: var(--color-333);
            cursor: pointer;
            &.active,
            &:hover {
                color: var(--primary-color);
            }
        }
    }
</style>
<script>
    import { goto } from '$app/navigation'
    /**
   * @type {{ label: string;url: string; value: number|string|undefined;id:number }[]}
   */
    export let navs;
    /**
   * @type {{ id: string; }}
   */
     export let route;
    /** @type any*/ $:current = {value: route.id.split('/')[2]};
    const onNavClick = (/** @type {{ label: string;url: string; value: number|string|undefined;id:number }} */ item) => {
        current = item
        goto(`/cates/${item.value}/${item.id || ''}`, { state: item })
    };
</script>
<div class="nav">
    <div class="wrap">
        { #each navs.slice(0,4) as item }
            <div class="nav-item {current.value === item.value ? 'active': ''}"  role={'button'} on:click={() => onNavClick(item)}>{item.label}</div>
        {/each}
    </div>
</div>