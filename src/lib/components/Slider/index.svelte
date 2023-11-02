{#if list.length}
<div
    role="none"
    class="slider-container"
    style="{sliderStyle}"
    >
    <!-- on:mouseover="{pause()}"
    on:mouseout="{play()}" -->
    <div ref="content" class="slider-content {mask ? 'mask' : ''}">
        {#each list as  item, index}
        <div
            role="{index}"
            class="slider {methods.setClass(index)}"
            on:click="{() => methods.onClick(index, item)}"
            style="background-image: url({item.src || item.pic || item.imageUrl});height: {height}px;"
        >
            <div class="badge" style="background:{item.titleColor || 'var(--primary-color)'}">{item.typeTitle}</div>
        </div>
        {/each}
        {#if arrow}
        <i
            type="left"
            role="none"
            class="icon-music-left icon-left"
            on:click="{methods.prev()}"
        ></i>
        <i
            type="right"
            role="none"
            class="icon-music-right icon-right"
            on:click="{methods.next()}"
        ></i>
        {/if}
    </div>
    {#if dots}
    <div class="dots">
        {#each list as  item, index}
        <span
            v-for="(item, index) in list"
            key="{index}"
            style="{methods.setActiveDot(index)}"
            ></span>
            <!-- on:mouseover="{currentIndex = index}" -->
        {/each}
    </div>
    {/if}
</div>
{/if}

<script>
  import { onMount } from "svelte";

    let currentIndex = 0;
    let timer =null;
    /**@type array*/
    export let list;
    /**@type number*/
    export let width;
    /**@type number*/
    export let height = 200;
    /**@type string*/
    export let imgType = 'percentage';
    /**@type boolean*/
    export let autoPlay = true;
    export let mask = true;
    export let interval = 4000;
    export let dots = true;
    export let arrow = true;
    export let color = 'var(--primary-color)';
    $:sliderStyle = {
        width: width ? width + 'px' : '100%',
        height: height === 0 ? '240px' : height + 'px',
        perspective: width + 'px',
        backgroundSize:
            imgType === 'percentage' ? '100% 100%' : imgType
    }
    const h =
        document.querySelector('.slider-container') &&
        document
            .querySelector('.slider-container')
            .getBoundingClientRect().height
    $:sliderHeight = `${h * 0.37}px`
    const methods = {
        setClass (i) {
            const next =
                currentIndex === list.length - 1
                    ? 0
                    : currentIndex + 1
            const prev =
                currentIndex === 0
                    ? list.length - 1
                    : currentIndex - 1
            switch (i) {
            case currentIndex:
                return 'active'
            case next:
                return 'next'
            case prev:
                return 'prev'
            default:
                return ''
            }
        },
        setBGImg (src) {
            return {
                backgroundImage: `url(${src})`
            }
        },
        setActiveDot (index) {
            return index === currentIndex
                ? {
                    backgroundColor: color
                }
                : {
                    backgroundColor: '#ccc'
                }
        },
        play () {
            methods.pause()
            if (autoPlay) {
                timer = setInterval(() => {
                    methods.next()
                }, interval)
            }
        },
        pause () {
            clearInterval(timer)
        },
        next () {
            currentIndex = ++currentIndex % list.length
        },
        prev () {
            currentIndex =
                currentIndex === 0
                    ? list.length - 1
                    : currentIndex - 1
        },
        onClick (i, item) {
            // if (i === currentIndex) {
            //     $emit('slider-click', i, item)
            // } else {
            //     const currentClickClassName = $refs['slider' + i].classList[1]
            //     if (currentClickClassName === 'next') {
            //         next()
            //     } else {
            //         prev()
            //     }
            // }
        }
    }
    onMount(() => {
        methods.play()
    })
</script>

<style lang="less" scoped>
.slider-container {
    box-sizing: content-box;
    width: 100%;
    height: 100%;
    min-height: 160px;
    text-align: center;
    padding-bottom: 20px;
    margin: auto;
    position: relative;
    .slider-content {
        position: relative;
        width: 100%;
        height: 100%;
        left: 0%;
        top: 0%;
        margin: 0px;
        padding: 0px;
        background-size: inherit;
        perspective: 1000px;
        .slider {
            position: absolute;
            margin: 0;
            padding: 0;
            top: 0;
            left: 50%;
            width: 70%;
            height: 100%;
            transition: 0.4s transform ease-out,
                0.35s filter cubic-bezier(0.32, 0.04, 0.87, 0.65);
            background-color: #fff;
            background-repeat: no-repeat;
            background-position: center;
            background-size: inherit;
            transform: translate3d(-50%, 1px, -80px) scale3d(0.9, 0.9, 1);
            transform-origin: center;
            z-index: 1;
            filter: brightness(0.6);
            cursor: pointer;
            border-radius: var(--box-radius);
            // box-shadow: 0 0 10px var(--c-ccc);
            .badge {
                position: absolute;
                right: -2px;
                bottom: 10px;
                min-width: 20px;
                padding: 0 6px;
                line-height: 20px;
                background: #ddd;
                color: #fff;
                border-radius: 9px 0 0 9px;
                font-size: 12px;
                filter: brightness(0.93);
            }
            &:before {
                position: absolute;
                content: "";
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                background-color: rgba(0, 0, 0, 0);
                transition-delay: 0.1s !important;
                transition: all 0.5s;
            }
            &.active {
                transform: translate3d(-50%, 0, 0);
                filter: brightness(1);
                z-index: 20;
            }
            &.prev {
                transform: translate3d(-76.5%, 0, 0) scale3d(0.9, 0.9, 1);
                z-index: 18;
            }
            &.next {
                transform: translate3d(-23.5%, 0, 0) scale3d(0.9, 0.9, 1);
                z-index: 18;
            }
        }
        // &.mask .slider &.prev,
        // &.next &:before {
        //     background-color: rgba(0, 0, 0, 0.5);
        // }
        i {
            display: none;
            position: absolute;
            top: 55%;
            transform: translateY(-50%);
            color: rgba(255, 255, 255, 0.5);
            z-index: 21;
            cursor: pointer;
            &:hover::after {
                color: #fff;
            }
            &.icon-left::after,
            &.icon-right::after {
                font-size: 30px;
            }
            &.icon-left {
                left: 11px;
            }
            &.icon-right {
                right: 11px;
            }
            // &.mask .slider &.prev,
            // &.next &:before {
            //     background-color: rgba(0, 0, 0, 0.5);
            // }
        }
        &:hover i {
            padding: 7px;
            border-radius: 50%;
            color: rgba(255, 255, 255, 0.8);
            display: block;
        }
    }

    .dots {
        width: 100%;
        height: 20px;
        span {
            display: inline-block;
            width: 20px;
            height: 2px;
            margin: 1px 3px;
            cursor: pointer;
        }
    }
}
</style>
