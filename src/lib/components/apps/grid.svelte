<script>
	import { goto } from '$app/navigation';
    import { Grids, Grid, Icon, Mask } from 'stdf';
    import { createEventDispatcher } from 'svelte'
    import Modal from '$lib/components/Modal.svelte';
    const dispatch = createEventDispatcher()
    export let apps = [];
    export let injClass = '';
    export let gap = 8;
    export let cols = 4;
    export let mx = 0;
    export let my = 0;
    export let path = '';
    export let modal = '';
    const onClick = (e) => {
        e.preventDefault()
        if (path) {
            goto(path)
            return
        }
        dispatch('click', e)
    }
</script>
<div class="pb-0 pt-0" role="none" on:click={(e) => onClick(e)}>
    <div class={` px-8 py-4 pt-5 transition ${injClass} duration-300`}>
        <Grids cols={cols} mx="{mx}" my="{my}" gap="{gap}">
            {#each apps.slice(0, 14) as app, i}
                {#if app.type === 'app' || !app.type}
                <Grid row={app.row || 3} col={app.col || 1}>
                    <a class="flex flex-col justify-center text-center" href="{app.url}" target="{app.url?.includes('http')?'_blank':''}">
                        <div
                            class="flex flex-col justify-between {app.bgColor} {app.color} {app.injClass} dark:bg-black {app.subText?'py-1.5':'p-3'} h-full rounded-xl text-md text-center shadow dark:shadow-white/10"
                        >
                        {#if app.subText}
                            <div class="text-xs">{app.subText}</div>
                        {/if}
                        {#if app.render}
                            <div class="text-3xl">{app.render()}</div>
                        {:else}
                            <Icon injClass="{app.injClass?'text-xs':'text-2xl'}" size="{app.size || 40}" name="{app.icon}"></Icon>
                        {/if}
                        </div>
                        {#if app.text}
                        <div class="font-bold text-gray-800 {app.injTitleClass} mt-2">{app.text}</div>
                        {/if}
                    </a>
                </Grid>
                {:else if app.type === 'component' && app.component}
                <Grid row={app.row || 4} col={app.col || 1}>
                    <div class="wrap-content" role="none" on:click={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (app.props.modal) {
                            modal = app.props.modal || ''
                            modal.props.visible = true
                        }
                    }}>
                        <svelte:component {...app.props || {}} this={app.component}></svelte:component>
                        {#if app.title}
                        <div class="text-sm text-white text-center mt-2 {app.injTitleClass}">{app.title}</div>
                        {/if}
                    </div>
                </Grid>
                {/if}
            {/each}
        </Grids>
    </div>
</div>
{#if modal}
<div class="modal" on:pointerdown={(e) => e.stopPropagation()}
    on:pointermove={(e) => e.stopPropagation()}
    on:pointerup={(e) => e.stopPropagation()}>
    <Modal bind:visible={modal.props.visible} title="{modal.props.title}" injTitleClass="text-white !text-left text-2xl" showBtn={modal.props.showBtn ||false} contentSlot popup={{size: 40, radiusPosition: 'all',radius: 'xl', transparent: true, position: 'center', px: 6, py: 0, mask: {opacity: 0.2, backdropBlur: 'sm'}, ...modal.props.popup}}>
        {#if modal.component}
            <svelte:component injClass={modal.props.injClass} apps={modal.props.apps} this={modal.component}></svelte:component>
        {:else}
            请传入组件！
        {/if}
    </Modal>
</div>
{/if}