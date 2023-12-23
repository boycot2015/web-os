<script>
    import { register } from 'swiper/element/bundle';
    import { appConfig } from '@/store';
    import { createEventDispatcher, onMount, onDestroy } from 'svelte'
    export let data = $appConfig.apps;
    export let initialSlide = 0;
    export let injClass = 'w-screen h-screen !p-0';
    export let swiperRef = '';
    export let pagination = true;
    let swiperInstance = null
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
        pagination: pagination ? {
            hideOnClick: false,
        }: false
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
    onMount(() => {
        swiperInstance?.destroy()
        onInitSwiper()
    })
    onDestroy(() => {
        swiperInstance?.destroy()
    })
</script>
<!-- Slider main container -->
<swiper-container
{...config}
initial-slide={initialSlide}
on:swiperslidechange|stopPropagation
on:swiperinit|stopPropagation
on:swiperdestroy|stopPropagation
style="transform:translate3d(0,0,0);overflow:hidden;"
class="{injClass}">
    <!-- Slides -->
    {#each data as item }
        <swiper-slide style="transform:translate3d(0,0,0)" >
            {#if item.type === 'component'}
                <div class={`w-full h-full swiper-slide-transform`} style="transform:translate3d(0,0,0);overflow:hidden;">
                    <svelte:component {...item.props || {}} this={item.component} />
                </div>
            {/if}
        </swiper-slide>
    {/each}
</swiper-container>