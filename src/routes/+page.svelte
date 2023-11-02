<script>
	import Card from '$lib/components/Card.svelte';
    import { BeInput } from '@brewer/beerui';
    import { BeCarousel, BeCarouselItem } from '@brewer/beerui'
    /** @type {import('./$types').PageLoad} */
    export let data;
    const {likeCate, likeList, topList, modelsList } = data
</script>
<div class="main">
    <div class="top" style="background: linear-gradient(190deg, {likeList.data[0].color}, {likeList.data[1].color});">
        <div class="search flex-row just-b align-c">
            <BeInput placeholder="输入品牌名称" class="flex-1"></BeInput>
            <div class="more">
                <i class="icon-more"></i>全部品牌
            </div>
        </div>
        <div class="like-section">
            <div class="nav-bar flex-row just-b align-c">
                <div class="title">大家都在逛</div>
                <div class="more">更多 ></div>
            </div>
            <div class="like-list scroll-h-container flex-row just-b align-c">
                {#each likeList.data.slice(0, 9) as list}
                <div class="like-list-item flex-column just-c align-c">
                    <img class="logo" src="{list.logo}" alt="{list.name}" />
                    <div class="name line-clamp1">{list.name}</div>
                    <a href="http://">去逛逛</a>
                </div>
                {/each}
            </div>
        </div>
    </div>
    <div class="cus-top-section">
        <div class="nav-bar flex-row just-b align-c">
            <div class="title">小程序消费榜</div>
            <div class="more">更多 ></div>
        </div>
        <div class="top-list scroll-h-container flex-row just-s align-c">
            {#each topList.data.slice(0, 6) as list}
            <div class="top-list-card">
                <Card>
                    <div class="title flex-row just-b align-c" slot="title" style="background: linear-gradient(190deg, {list.color}, {list.color});">
                        {list.name}
                        <div class="more">></div>
                    </div>
                    {#each list.list.slice(0, 3) as item, i}
                        <div class="list-item flex-row align-c">
                            <i class="order">{i+1}</i>
                            <img src="{item.logo}" alt="{item.name}" />
                            <div class="name line-clamp1">{item.name}</div>
                        </div>
                    {/each}
                </Card>
            </div>
            {/each}
        </div>
    </div>
    <div class="models">
        {#each modelsList.data as model}
        <div class="models-item">
            {#if model.type == 1005}
            <div class="pic-card">
                <Card title={model.list[0].name} type="img">
                    <div class="title nav-bar flex-row just-b align-c" slot="title">
                        <div class="left flex-row just-b align-c">
                            <img src="{model.list[0].logo}" alt="{model.list[0].name}">
                            <span class="name">{model.list[0].name}</span>
                        </div>
                        <i class="more">去逛逛 ></i>
                    </div>
                    <img src="{model.list[0].logo}" loading="lazy" alt="{model.list[0].name}">
                </Card>
            </div>
            {/if}
            {#if model.type == 1004}
            <Card>
                <div class="card-list">
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
                                <i class="more">></i>
                            </div>
                        </div>
                    {/each}
                </div>
            </Card>
            {/if}
            {#if model.type == 1001 || model.type == 1002}
            <Card type="img">
                <div class="slider-list {model.type == 1002?'flex-row just-b':''}">
                    {#if model.type == 1001}
                    <div class="title">{model.name}</div>
                    {/if}
                    <div class="slider flex-1" style="padding: {model.type == 1001?'0px var(--padding-gap) 0':'0'};width: {model.type == 1001?'70%':'50%'};margin:{model.type == 1001?'0 auto':'auto var(--padding-gap) auto 0'}">
                        <BeCarousel height='{model.type == 1001?'170px': '150px'}' autoplay={model.type == 1001} direction='horizontal' trigger='click' type='card'>
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
                        <i class="more tr">立即查看</i>
                    </div>
                    {/if}
                </div>
                <div class="nav-bar flex-row just-b align-c" style="display: {model.type == 1001?'':'none'};" slot="title">
                    {#if model.type == 1001}
                    <div class="flex-row just-b align-c" style="padding: 6px 0;">
                        {#each model.list as item, i}
                        <img src="{item.logo}" loading="lazy" style="z-index: {model.list.length - i};margin-right: -10px;" alt="{item.name}">
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
</div>
<style scoped lang="less">
    .main {
        background-color: var(--bg-color);
    }
    .nav-bar {
        font-size: 18px;
        font-weight: bold;
        padding: var(--padding-gap);
        .more {
            font-size: 14px;
            font-weight: normal;
            color: var(--color-999);
        }
    }
    .scroll-h-container {
        max-width: 100%;
        overflow: hidden;
        overflow-x: auto;
        padding-left: var(--padding-gap);
    }
    .top {
        background: linear-gradient(190deg, skyblue, purple);
        position: relative;
        z-index: 1;
        filter: blur(0.2);
        padding-bottom: var(--padding-gap);
        .search {
            height: 48px;
            line-height: 48px;
            padding: var(--padding-gap) var(--padding-gap) 0;
            margin-bottom: var(--padding-gap);
            .more {
                font-size: 14px;
                margin-left: var(--padding-gap);
            }
        }
        .nav-bar,.more {
            color: var(--color-fff);
        }
        .like-section {
            color: var(--color-fff);
            .like-list-item {
                padding-bottom: var(--padding-gap);
                margin-right: var(--padding-gap);
                &:last-child {
                    padding-right: var(--padding-gap);
                    margin-right: 0;
                }
                img {
                    width: 60px;
                    height: 60px;
                    border-radius: 60px;
                    margin-bottom: 5px;
                }
                .name {
                    font-size: 12px;
                }
                a {
                    font-size: 12px;
                    margin-top:5px;
                }
            }
        }
    }
    .cus-top-section {
        position: relative;
        z-index: 2;
        top: -16px;
        background-color: var(--bg-color);
        border-radius: var(--border-radius) var(--border-radius) 0  0;
        overflow: hidden;
    }
    .top-list-card {
        padding-right: var(--padding-gap);
        // padding-bottom: var(--padding-gap);
        .title {
            color:var(--color-fff);
            line-height: 48px;
            font-size: 18px;
            font-weight: bold;
            padding: 0 var(--padding-gap);
        }
        .list-item {
            width: 200px;
            margin-bottom: var(--padding-gap);
            color: var(--color-333);
            .order {
                font-weight: bold;
                font-size: 24px;
                color: var(--color-333);
                margin-right: 10px;
            }
            img {
                width: 45px;
                height: 45px;
                border-radius: 45px;
                margin-right: var(--padding-gap);
            }
        }
    }
    .models {
        padding-bottom: 4px;
        background-color: var(--bg-color);
        &-item {
            .pic-card {
                img {
                    width: 100%;
                    height: 200px;
                    vertical-align: bottom;
                }
                .title {
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
                font-size: 14px;
                color: var(--color-999);
            }
            .title {
                font-size: 18px;
                font-weight: bold;
            }
            .sub-title {
                font-size: 20px;
                margin-bottom: var(--padding-gap);
                color: var(--color-333);
                .dot {
                    font-size: 56px;
                    color: var(--color-999);
                    margin-right: 10px;
                    &:last-child {
                        font-size: 36px;
                        margin-right: 0;
                        margin-left: 10px;
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
                        margin-right: 10px;
                    }
                    .sub-title {
                        color: var(--color-666);
                        font-size: 14px;
                        margin-bottom: 0;
                    }
                    .title {
                        line-height: 24px;
                        border-top: 0;
                        padding: 10px 0 0;
                        margin: 0;
                        font-weight: bold;
                    }
                    .more {
                        color: var(--color-fff);
                        width: 80px;
                        padding: 5px 0;
                        text-align: center;
                        align-self: flex-end;
                        border-radius: var(--border-radius);
                        background-color: var(--primary-color);
                    }
                    .dot {
                        font-size: 56px;
                        color: var(--color-999);
                    }
                }
            }
            .nav-bar {
                padding: 5px var(--padding-gap);
                border-top: 1px solid var(--border-color);
                img {
                    position: relative;
                    width: 40px;
                    height: 40px;
                    border-radius: 40px;
                }
            }
            .card-list {
                &-item {
                    &:last-child {
                        .text {
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
                        padding-bottom: 10px;
                    }
                    .desc {
                        font-size: 14px;
                        color: var(--color-999);
                    }
                }
                .sub-title {
                    font-size: 16px;
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
        box-shadow: 0 0 10px var(--bg-color);
    }
    :global(.be-carousel--card .be-carousel__item.is-active.is-in-stage) {
        left: -15%;
        width: 80%;
    }
</style>