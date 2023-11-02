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
                line-height: 20px;
                color: var(--color-666);
            }
            img {
                width: auto;
                height: 100px;
                background-color: rgba(0, 0, 0, 0.4);
                margin-right: var(--padding-gap);
            }
        }
    }
</style>
<script>
    import Loading from '$lib/components/Loading.svelte'
    import { baseApiUrl } from '$lib'
    export async function load () {
        const response = await fetch(baseApiUrl+'?tab=teleplay');
        const data = await response.json();
        return { ...data }
    }
    const promise = new Promise((call) => {
        setTimeout(() => {
            call(load())
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
                <div class="desc line-clamp4">{list.desc}</div>
            </div>
        </div>
        {/each}
    {:catch error}
        <p style="color: red">{error.message}</p>
    {/await}
</div>