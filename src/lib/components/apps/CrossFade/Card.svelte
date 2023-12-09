<script>
    import { Motion } from "svelte-motion";
    import Item from "./Item.svelte";
    import { Icon, GridList, Grids, Grid } from '$lib/components'
    import { appConfig } from '@/store'
    export let selected;
    export let item;
    const textscale = {
        initial: {
            scale: 0,
        },
        animate: {
            scale: 1,
            transition: { duration: 0.3, delay: 0 },
        },
        exit: {
            scale: 0,
        },
    };
    let clientHeight = 0;
    let offsetHeight = 0;
    $: offsetTop = clientHeight/2-offsetHeight;
</script>

<style>
    .overlay{
        top:0;
        left:0;
        right:0;
        bottom:0;
        background: rgba(0, 0, 0, 0.4);
    }
</style>
{#if item.props && item.props.modal }
<Motion let:motion initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="overlay fixed z-[9] w-screen h-screen backdrop-blur-xl" use:motion on:click|preventDefault={_=>{selected=undefined}} bind:clientHeight={clientHeight} />
</Motion>
<Motion layoutId={item.i} let:motion initial={{borderRadius:"30px"}} animate={{borderRadius:"30px"}} exit={{borderRadius:"30px"}}>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
        use:motion
        class="container z-[10] fixed left-0 top-[10rem] {item.props.modal.component?'px-8':''}"
        on:pointerdown|stopPropagation
        on:click|stopPropagation
       >
        <div class="w-full"  bind:clientHeight={offsetHeight} layout>
            <Motion let:motion={g} {...textscale}>
                <div use:g class="add-text">
                    <div class="title text-white text-2xl text-center mb-10">{item.props.modal.props.title}</div>
                    {#if item.props.modal.component}
                        <div class="{item.props.modal.componentName=='Group'?'!bg-white/30 rounded-2xl':''}">
                            <svelte:component this={item.props.modal.component} {...item.props.modal.props}></svelte:component>
                        </div>
                    {:else}
                    <Grids cols={item.props.modal.props.cols} gap={item.props.modal.props.gap} mx={item.props.modal.props.mx} my={item.props.modal.props.my}>
                        {#each item.props.modal.props.apps as app}
                            <Grid col={item.props.modal.props.col||4} row={item.props.modal.props.row}>
                                <div on:click|stopPropagation>
                                    {#if app.component}
                                    <div class="w-full h-full flex flex-col items-center justify-center">
                                        <svelte:component this={app.component} {...app.props}></svelte:component>
                                    </div>
                                    {:else}
                                        <Item item={app} bind:selected />
                                    {/if}
                                </div>
                            </Grid>
                        {/each}
                    </Grids>
                    {/if}
                </div>
            </Motion>
        </div>
    </div>
</Motion>
{/if}