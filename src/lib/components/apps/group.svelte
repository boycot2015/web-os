<script>
    import { Grid, Modal } from 'stdf';
    // import Swiper from '$lib/components/Swiper.svelte';
    import { Swiper } from '$lib/components';
    import { appConfig } from '@/store';
    // export let innerInjClass = '';
    export let injClass = '';
    // export let notActiveInjClass = '';
    // export let indicateInjClass = '';
    // export let indicateStyle = 'pointLine';
    // export let loop = true;
    // export let autoplay = true;
    export let type = 'swiper';
    export let component = '';
    export let props = '';
    export let modal = '';
    export let col = '';
    export let row = '';
    export let gap = '';
    export let cols = '';
    export let titleAlign = '';
    export let title = '';
    export let visible = false;
    export let apps = [];
    let initActive = 0;
    $: title = apps[initActive]?.text || apps[initActive]?.title || '';
</script>
<Grid row={col||2} col={row||2}>
    {#if type === 'swiper'}
    <div class={`flex flex-col overflow-hidden ${cols} ${gap} ${visible} items-center justify-center group h-[auto] ${injClass}`}>
        <Swiper config={{direction: 'vertical', init: true, loop: true, autoplay: true}} injClass='{injClass ? injClass + ' w-full h-full' : 'w-[10rem] h-[10rem]'} group-swiper' data={apps.map(el => ({...el, props: el.props && {...el.props, cols: ($appConfig.md || $appConfig.xl || $appConfig.lg) ? $appConfig.xl ? 8 : 6 : el.props.cols}}))} on:change={(e) => initActive = e.detail.swiper.activeIndex} />
    </div>
    {#if title}
    <p class="text-sm text-white text-center mt-2 {titleAlign}">{title}</p>
    {/if}
    {:else if type === 'component'}
        <svelte:component injClass={injClass} {...props} apps={apps} this={component}></svelte:component>
        {#if modal}
        <Modal bind:visible={modal.props.visible} title="{modal.props.title}" injTitleClass="text-white !text-left text-2xl" showBtn={modal.props.showBtn ||false} contentSlot popup={{size: 40, radiusPosition: 'all',radius: 'xl', transparent: true, position: 'center', easeType: 'backOut', px: 6, py: 0, mask: {opacity: 0.2, backdropBlur: 'sm'}, ...modal.props.popup}}>
            {#if modal.component}
                <svelte:component injClass={modal.props.injClass} apps={modal.props.apps} this={modal.component}></svelte:component>
            {:else}
                请传入组件！
            {/if}
        </Modal>
        {/if}
    {/if}
</Grid>