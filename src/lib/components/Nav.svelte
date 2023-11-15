<style lang="less" scoped>
    .nav {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        line-height: var(--gap-60);
        background-color: var(--bg-color);;
        &-item {
            font-size: var(--font-size-20);
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
    export let style = '';
    export let offsetHeight = 0;
</script>
<div class="nav" {style} bind:offsetHeight={offsetHeight}>
    <div class="wrap">
        { #each navs.slice(0,4) as item }
            <div class="nav-item {current.value === item.value ? 'active': ''}"  role={'button'} on:click={() => onNavClick(item)}>{item.label}</div>
        {/each}
    </div>
</div>