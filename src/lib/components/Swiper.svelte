<script>
    import { register } from 'swiper/element/bundle';
    import { appConfig } from '@/store';
    import { createEventDispatcher, onMount, afterUpdate } from 'svelte'
    export let data = $appConfig.apps;
    export let initialSlide = 0;
    export let injClass = 'w-screen h-screen !p-0';
    export let thumbsSwiper = '';
    // init Swiper
    export let config = {
        speed: 500,
        loop: false,
        init: true,
        mousewheel: true,
        'initial-slide': initialSlide,
        'css-mode': true,
        'space-between': 0,
        'centered-slides': true,
        pagination: {
            hideOnClick: false,
        }
    }
    const dispatch = createEventDispatcher();
    const onInitSwiper = () => {
        if (config.init) {
            register()
            return
        }
        const swiperEl = document.querySelector(thumbsSwiper);
        const params = {
            ...config,
            init: true,
            // array with CSS urls
            injectStylesUrls: [
                // 'swiper/element/css/pagination.css',
                // 'swiper/element/css/navigation.css'
            ],
        };
        swiperEl && Object.assign(swiperEl, params);
        swiperEl?.initialize && swiperEl.initialize();
    }
    const onProgress = (e) => {
        const [swiper, progress] = e.detail;
        dispatch('progress', { swiper, progress })
    };
    const onSlideChange = (e) => {
        const [swiper, progress] = e.detail;
        dispatch('change', { swiper, progress })
    }
    onMount(() => {
        onInitSwiper()
    })
</script>
<!-- Slider main container -->
<swiper-container
{...config}
on:swiperprogress|stopPropagation={onProgress}
on:swipertransitionend|stopPropagation={onSlideChange}
style="transform:translate3d(0,0,0);overflow:hidden;"
class="wrap-content {injClass}">
    <!-- Slides -->
    {#each data as item }
        <swiper-slide style="transform:translate3d(0,0,0)" >
            {#if item.type === 'component'}
                <div class={`w-full h-full`} style="transform:translate3d(0,0,0);overflow:hidden;">
                    <svelte:component {...item.props || {}} this={item.component} />
                </div>
            {/if}
        </swiper-slide>
    {/each}
</swiper-container>