<style lang="less" scoped>
    .list {
        padding: var(--padding-gap);
        flex-wrap: wrap;
        &-item {
            flex-wrap: nowrap;
            width: 100%;
            margin-bottom: var(--padding-gap);
            .title {
                font-size: var(--font-size-18);
                line-height: var(--font-size-24);
                margin-bottom: var(--padding-gap);
            }
            .desc {
                font-size: var(--font-size-16);
                line-height: var(--font-size-20);
                color: var(--color-666);
            }
            img {
                width: auto;
                height: 6rem;
                background-color: rgba(0, 0, 0, 0.4);
                margin-right: var(--padding-gap);
            }
        }
    }
</style>
<script>
    // @ts-nocheck
    /** @type {import('./$types').LayoutData} */
	export let data;
    import Loading from '$lib/components/Loading.svelte'
    const promise = new Promise((call) => {
        setTimeout(() => {
            call(data)
        }, 300);
    })
</script>
<div class="list flex-row">
    {#await promise}
    <Loading text={'加载中...'} />
    {:then data}
    {#each data.dataList as list}
    <div class="list-item flex-row">
        <img src="{list.img}" alt="{list.title}" title="{list.title}">
        <div class="text">
            <span class="title line-clamp2">{list.title}</span>
            <div class="desc line-clamp2">{list.desc}</div>
        </div>
    </div>
    {/each}
    {:catch error}
    <p>{error.message}</p>
    {/await}
</div>