<script>
    import { Grid, Modal } from 'stdf';
    import Swiper from '$lib/components/Swiper.svelte'
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
    export let apps = []
</script>
<Grid row={4} col={2}>
    {#if type === 'swiper'}
    <div class="group {injClass}">
        <Swiper {autoplay} translateZ={400}
        translateX={-200} indicatePosition="none" containerWidth={document.body.clientWidth/2 - 50} initActive={0} {loop} duration={500} aspectRatio={[1, 1]} triggerSpeed={0.5} data={apps} {innerInjClass} {notActiveInjClass} {indicateStyle} {indicateInjClass}/>
    </div>
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