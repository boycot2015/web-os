<script>
	import Card from '$lib/components/Card.svelte';
    import Loading from '$lib/components/Loading.svelte'
    import { BeCarousel, BeCarouselItem } from '@brewer/beerui'
    import { goto } from '$app/navigation'
    import { onMount } from 'svelte';
    import { fly, fade } from 'svelte/transition';
    import axios from 'axios';
    /** @type {import('./$types').PageLoad} */
    export let data;
    const {likeCate, likeList, topList, modelsList } = data
    let activeCate = 0;
    let offsetWidth = 0;
    let coverHeight = 0;
    let fixed = false;
    let loading = true;
    const tabClick = async (e, list, index) => {
        if (index === activeCate) return
        if (index > 2 && index > activeCate) e.target.parentNode.parentNode.scrollLeft += offsetWidth
        else if (index >= 2 && index <= activeCate) e.target.parentNode.parentNode.scrollLeft -= offsetWidth
        else e.target.parentNode.parentNode.scrollLeft = 0
        activeCate = index
        loading = true
        const res = await axios.get('/brand/models', {})
        if (res && res.data) {
            modelsList.data = res.data.data
            setTimeout(() => {
                loading = false
            }, 1000);
        }
    }
    onMount(() => {
        window.addEventListener('scroll', (e) => {
            if (e.target.scrollingElement.scrollTop > coverHeight) {
                fixed = true
            } else {
                fixed = false
            }
        })
        setTimeout(() => {
            loading = false
        }, 1000);
    })
</script>
<style scoped lang="less">
    .main {
        background-color: var(--bg-color);
        margin-bottom: var(--gap-5);
    }
    .cover {
        .img{
            width: 100%;
            height: 18rem;
            img {
                width: 100%;
                height: auto;
            }
        }
    }
    .cate-list {
        top: 0;
        width: 100%;
        background-color: var(--color-fff);
        transition: all .3s;
        z-index: 999;
        &-item {
            padding: 0 var(--padding-gap);
            &.is-active {
                .name {
                    border-bottom: var(--border-width) solid var(--primary-color);
                }
            }
            .name {
                line-height: var(--font-size-48);
                font-size: var(--font-size-18);
                border-bottom: var(--border-width) solid transparent;
                min-width: 8rem;
            }
        }
    }
    .scroll-h-container {
        max-width: 100%;
        overflow: hidden;
        overflow-x: auto;
    }
    .models {
        width: 100vw;
        background-color: var(--bg-color);
        &-item {
            .pic-card {
                img {
                    width: 100%;
                    height: 200px;
                    vertical-align: bottom;
                }
                .title {
                    font-size: var(--font-size-20);
                    padding: 8px var(--padding-gap);
                    border-top: 1px solid var(--border-color);
                    img {
                        width: 40px;
                        height: 40px;
                        border-radius: 40px;
                        margin-right: var(--padding-gap);
                    }
                }
            }
            margin: 0 var(--padding-gap) var(--padding-gap);
            .more {
                font-size: var(--font-size-14);
                color: var(--color-999);
                cursor: pointer;
            }
            .title {
                font-size: var(--font-size-24);
                font-weight: bold;
            }
            .sub-title {
                font-size: var(--font-size-20);
                margin-bottom: var(--padding-gap);
                color: var(--color-333);
                .dot {
                    font-size: var(--font-size-56);
                    color: var(--color-999);
                    margin-right: var(--gap-10);
                    &:last-child {
                        font-size: var(--font-size-36);
                        margin-right: 0;
                        margin-left: var(--gap-10);
                    }
                }
            }
            .slider-list {
                padding: 0 var(--padding-gap);
                .title {
                    border-top: 0;
                    font-weight: bold;
                    padding: 0 0 var(--padding-gap) 0;
                    margin: var(--padding-gap) 0 0;
                }
                .right-content {
                    padding: var(--padding-gap) 0;
                    .nav-bar {
                        border: none;
                        padding: 0;
                    }
                    img {
                        margin-right: var(--gap-10);
                    }
                    .sub-title {
                        color: var(--color-666);
                        font-size: var(--font-size-14);
                        margin-bottom: 0;
                    }
                    .title {
                        line-height: var(--font-size-28);
                        border-top: 0;
                        padding: var(--gap-10) 0 0;
                        margin: 0;
                        font-weight: bold;
                    }
                    .more {
                        color: var(--color-fff);
                        width: 80px;
                        padding: var(--gap-5) 0;
                        text-align: center;
                        align-self: flex-end;
                        cursor: pointer;
                        border-radius: var(--border-radius);
                        background-color: var(--primary-color);
                    }
                    .dot {
                        font-size: var(--font-size-56);
                        color: var(--color-999);
                    }
                }
            }
            .nav-bar {
                padding: var(--gap-5) var(--padding-gap);
                border-top: 1px solid var(--border-color);
                img {
                    position: relative;
                    width: 40px;
                    height: 40px;
                    margin-right: -10px;
                    border-radius: 40px;
                }
            }
            .card-list {
                .title {
                    margin-bottom: var(--gap-5);
                }
                &-item {
                    &:last-child {
                        .text {
                            padding-bottom: 0;
                            border-bottom: 0;
                        }
                    }
                    .text {
                        padding: var(--padding-gap) 0;
                        border-bottom: 1px solid var(--border-color);
                    }
                    img {
                        width: 60px;
                        width: 60px;
                        margin-right: var(--padding-gap);
                        border-radius: var(--border-radius);
                    }
                    .title {
                        font-size: var(--font-size-18);
                        padding-bottom: var(--gap-10);
                    }
                    .desc {
                        font-size: var(--font-size-14);
                        color: var(--color-999);
                    }
                }
                .sub-title {
                    font-size: var(--font-size-16);
                    color: var(--color-999);
                }
            }
        }
    }
    :global(.be-carousel__indicators.be-carousel__indicators--horizontal) {
        display: none;
    }
    :global(.be-carousel--card .be-carousel__item) {
        border-radius: var(--border-radius);
        box-shadow: 0 0 var(--gap-10) var(--bg-color);
    }
    :global(.be-carousel--card .be-carousel__item.is-active.is-in-stage) {
        left: -15%;
        width: 80%;
    }
</style>
<div class="main">
    <div class="cover" bind:offsetHeight={coverHeight}>
        <div class="img">
            <img src="{likeCate.data[0].cover}" alt="">
        </div>
    </div>
    <div class="cate-list scroll-h-container flex-row just-b align-c" class:fixed="{fixed}">
        {#each likeList.data.slice(0, 9) as list, index}
        <div role="none" on:click={(e) => tabClick(e, list, index)} class="cate-list-item flex-column just-c align-c {activeCate===index ?'is-active': ''}" bind:offsetWidth={offsetWidth}>
            <div class="name line-clamp1">{list.name}</div>
        </div>
        {/each}
    </div>
    {#if !loading}
    <div class="models" style="margin-top: {fixed?'var(--gap-60)':'var(--gap-20)'};">
        {#each modelsList.data as model}
        <div class="models-item" in:fly={{x: '100vw', duration: 1000}} out:fade>
            {#if model.type == 1005}
            <div class="pic-card">
                <Card title={model.list[0].name} type="img">
                    <div class="title nav-bar flex-row just-b align-c" slot="title">
                        <div class="left flex-row just-b align-c">
                            <img src="{model.list[0].logo}" alt="{model.list[0].name}">
                            <span class="name">{model.list[0].name}</span>
                        </div>
                        <i class="more" role="none" on:click={() => goto('/mall/brandList')}>去逛逛 ></i>
                    </div>
                    <img src="{model.list[0].logo}" loading="lazy" alt="{model.list[0].name}">
                </Card>
            </div>
            {/if}
            {#if model.type == 1004}
            <Card>
                <div class="card-list" role="none" on:click={() => goto('/mall/brandList')}>
                    <div class="sub-title">甄选{model.subName}小程序推荐</div>
                    <div class="title">{model.name}</div>
                    {#each model.list as item, i}
                        <div class="card-list-item flex-row just-s align-c">
                            <img src="{item.logo}" loading="lazy" alt="{item.name}">
                            <div class="text flex-row flex-1 just-b align-c">
                                <div class="content">
                                    <div class="title line-clamp1">{item.name}</div>
                                    <div class="desc line-clamp1">{item.desc}</div>
                                </div>
                                <i class="more" role="none" on:click={() => goto('/mall/brandList')}>></i>
                            </div>
                        </div>
                    {/each}
                </div>
            </Card>
            {/if}
            {#if model.type == 1001 || model.type == 1002}
            <Card type="img">
                <div class="slider-list {model.type == 1002?'flex-row just-b':''}" role="none" on:click={() => goto('/mall/brandList')}>
                    {#if model.type == 1001}
                    <div class="title">{model.name}</div>
                    {/if}
                    <div class="slider flex-1" style="padding: {model.type == 1001?'0px var(--padding-gap) 0':'0'};width: {model.type == 1001?'100%':'50%'};margin:{model.type == 1001?'0 auto':'auto var(--padding-gap) auto 0'}">
                        <BeCarousel height='{model.type == 1001?'15.71rem': '10.71rem'}' autoplay={model.type == 1001} direction='horizontal' trigger='click' type='card'>
                            {#each model.list as item, i}
                            <BeCarouselItem>
                                <div class='w-full h-full carousel-item' style='background: url({item.logo}) center center / cover no-repeat;'></div>
                            </BeCarouselItem>
                            {/each}
                        </BeCarousel>
                    </div>
                    {#if model.type == 1001}
                    <div class="sub-title tc"><i class="dot">“</i>{model.subName}<i class="dot">”</i></div>
                    {/if}
                    {#if model.type == 1002}
                    <div class="flex-column flex-1 right-content just-c">
                        <div class="nav-bar flex-row just-s align-c">
                            <img src="{model.logo}" loading="lazy" alt="{model.name}">
                            <div class="sub-title">{model.subName}</div>
                        </div>
                        <div class="title">{model.name}</div>
                        <div class="dot tr">”</div>
                        <i class="more tr" role="none" on:click={() => goto('/mall/brandList')}>立即查看</i>
                    </div>
                    {/if}
                </div>
                <div class="nav-bar flex-row just-b align-c" role="none" on:click={() => goto('/mall/brandList')} style="display: {model.type == 1001?'':'none'};" slot="title">
                    {#if model.type == 1001}
                    <div class="flex-row just-b align-c" style="padding: 6px 0;">
                        {#each model.list as item, i}
                        <img src="{item.logo}" loading="lazy" style="z-index: {model.list.length - i};" alt="{item.name}">
                        {/each}
                    </div>
                    <i class="more">立即查看 ></i>
                    {/if}
                </div>
            </Card>
            {/if}
        </div>
        {/each}
    </div>
    {/if}
    <Loading text={'加载中...'} loading />
</div>