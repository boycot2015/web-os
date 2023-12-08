<script>
    import { Grid, Modal } from 'stdf';
    import Swiper from '$lib/components/Swiper.svelte';
    import { appConfig } from '@/store';
    export let innerInjClass = '';
    export let injClass = '';
    export let notActiveInjClass = '';
    export let indicateInjClass = '';
    export let indicateStyle = 'pointLine';
    export let loop = true;
    export let autoplay = true;
    export let type = 'swiper';
    export let component = '';
    export let props = '';
    export let modal = '';
    export let apps = [];
    export let translateZ = 400;
    export let translateX = -200;
    export let containerWidth = '';
    export let aspectRatio = [1, 1];
    let initActive = 0;
    let title = '';
    $: title = apps[initActive]?.text || apps[initActive]?.title || '';
</script>
<Grid row={2} col={2}>
    {#if type === 'swiper'}
    <div class={`group ${containerWidth === null ? 'h-full !p-4': 'h-[10.5rem]'} ${injClass}`}>
        <Swiper {autoplay} translateZ={translateZ}
        translateX={translateX} indicatePosition="none" containerWidth={containerWidth === null ? document.body.clientWidth - 100 : document.body.clientWidth/($appConfig.cols/2) - 30} bind:initActive={initActive} {loop} duration={500} aspectRatio={aspectRatio} triggerSpeed={0.5} data={apps} {innerInjClass} {notActiveInjClass} {indicateStyle} {indicateInjClass} on:change={(e) => initActive = e.detail} />
    </div>
    {#if title}
    <p class="text-sm text-white text-center mt-2">{title}</p>
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