<script>
    import { register } from 'swiper/element/bundle';
    import { appConfig } from '@/store';
    import { createEventDispatcher, onMount, onDestroy } from 'svelte'
    export let data = $appConfig.apps;
    export let injClass = 'w-screen h-screen !p-0';
    export let swiperRef = '';
    let swiperInstance = null;
    let currentSwiper = null;
    // init Swiper
    export let config = {
        speed: 500,
        loop: false,
        init: true,
        'css-mode': false,
        // virtual: true,
        mousewheel: true,
        'space-between': 0,
        'centered-slides': true,
        'initial-slide': 0,
        pagination: false
    }
    const dispatch = createEventDispatcher();
    const onInitSwiper = () => {
        if (config.init) {
            register()
            return
        }
        const swiperEl = document.querySelector(swiperRef);
        const params = {
            ...config,
            init: true,
            // array with CSS urls
            injectStylesUrls: [
                'swiper/element/css/pagination.css',
                // 'swiper/element/css/navigation.css'
            ],
        };
        swiperEl && Object.assign(swiperEl, params);
        swiperEl?.initialize && swiperEl.initialize();
    }
    const swiperslidechange = (e) => {
        dispatch('swiperslidechange', [...e.detail, swiperRef])
    }
    onMount(() => {
        swiperInstance?.destroy()
        onInitSwiper()
    })
    onDestroy(() => {
        swiperInstance?.destroy()
    })
    $: isEdge = config['initial-slide'] === 0 || config['initial-slide'] === data.length - 1
</script>
<!-- Slider main container -->
<swiper-container
{...config}
bind:this={currentSwiper}
on:swiperslidechange|stopPropagation={swiperslidechange}
on:swiperinit|stopPropagation
on:swiperdestroy|stopPropagation
style="transform:translate3d(0,0,0);overflow:hidden;"
class="{injClass} {isEdge ?'is-edge':''}">
    <!-- Slides -->
    {#each data as item }
        <swiper-slide style="transform:translate3d(0,0,0)" >
            <div class={`w-full h-full swiper-slide-transform`} style="transform:translate3d(0,0,0);overflow:hidden;">
                <slot {item}></slot>
            </div>
        </swiper-slide>
    {/each}
</swiper-container>