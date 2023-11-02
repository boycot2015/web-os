<style lang="less" scoped>
    .list {
        padding: var(--padding-gap);
        &-item {
            flex-wrap: nowrap;
            width: 100%;
            margin-bottom: var(--padding-gap);
            .title {
                font-size: 16px;
                margin-bottom: var(--padding-gap);
            }
            .desc {
                font-size: 14px;
                color: var(--color-666);
            }
            img {
                width: auto;
                height: 78px;
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