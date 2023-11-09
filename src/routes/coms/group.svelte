<script>
    import { Grids, Grid, Icon } from 'stdf';
    import Swiper from '$lib/components/Swiper.svelte'
    export let innerInjClass = '';
    export let injClass = '';
    export let notActiveInjClass = '';
    export let indicateInjClass = '';
    export let indicateStyle = 'pointLine';
    export let apps = []
</script>
<Grid row={4} col={2}>
    <div class="group {injClass}">
        <Swiper autoplay={true} indicatePosition="none" containerWidth={document.body.clientWidth/2 - 50} initActive={0} loop={false} duration={500} aspectRatio={[1, 1]} triggerSpeed={0.5} data={apps} {innerInjClass} {notActiveInjClass} {indicateStyle} {indicateInjClass}/>
    </div>
</Grid>