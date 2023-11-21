<script>
	import { goto } from '$app/navigation';
    import { Grids, Grid, Icon, Mask } from 'stdf';
    import { createEventDispatcher } from 'svelte'
    import { appConfig } from '@/store';
    import { cubicInOut } from 'svelte/easing';
    const dispatch = createEventDispatcher()
    export let apps = [];
    export let injClass = '';
    export let gap = 4;
    export let cols = 4;
    export let mx = 0;
    export let my = 0;
    export let path = '';
    export let modal = '';
    let dx = -100;
    let dy = 150;
    const onClick = (e) => {
        e.preventDefault();
        if (path) {
            goto(path)
            return
        }
        dispatch('click', e)
    }
    const slideAndScale = (node, params) => {
		const existingTransform = getComputedStyle(node).transform.replace('none', '');
		return {
			delay: params.delay || 0,
			duration: params.duration || 300,
			easing: params.easing || cubicInOut,
			css: (t, u) => `transform: ${existingTransform} translate(${u * dx}px, ${u * dy}px) scale(${1-t});`
		};
	}
</script>
<!-- <style lang="less" scoped>
    :global(.wrap-content > div) {
        height: 100% !important;
    }
</style> -->
<div class="pb-0 pt-0" role="none" on:click={(e) => onClick(e)}>
    <div class={` px-8 py-4 pt-5 transition-all duration-500 ${injClass}`}>
        <Grids cols={cols} mx="{mx}" my="{my}" gap="{gap}">
            {#each apps.slice(0, 18) as app, i}
                {#if app.type === 'app' || !app.type}
                <Grid row={app.row || 3} col={app.col || 1}>
                    <div class="flex flex-col justify-center text-center" role="none" on:click={(e) => {
                        if (app.reload) return window.location.reload();
                        !modal && e.stopPropagation();
                        if (modal) return
                        if (!app.url) return
                        modal = '';
                        app.url && ($appConfig.app = app)
                        if (app.url && app.url.includes('http')) goto(`/micro/${app.url}/${app.title||app.text}/${app.icon}`);
                        else if (app.url) goto(`${app.url}`);
                    }}>
                        <div
                            class="flex flex-col justify-between {app.bgColor} {app.color} {app.injClass?app.injClass:'mx-1.5'} dark:bg-black {app.subText?'py-1.5':'p-3'} h-full rounded-xl text-md text-center shadow dark:shadow-white/10"
                        >
                        {#if app.subText}
                            <div class="text-xs">{app.subText}</div>
                        {/if}
                        {#if app.render}
                            <div class="text-3xl">{app.render()}</div>
                        {:else if app.icon}
                            <Icon injClass="{app.injClass?'text-xs':'text-xl'}" size="{app.size || 38}" name="{app.icon}"></Icon>
                        {:else}
                            <svelte:component {...app.props || {}} this={app.component}></svelte:component>
                        {/if}
                        </div>
                        {#if app.text && !app.hideTitle}
                        <div class="font-bold text-xs text-white {app.injTitleClass} mt-2">{app.text}</div>
                        {/if}
                    </div>
                </Grid>
                {:else if app.type === 'component' && app.component}
                <Grid row={app.row || 4} col={app.col || 1}>
                    <div class="wrap-content h-full" role="none"
                    on:click={(e) => {
                        var event = event || window.event;  //标准化事件对象
                        dx = (event.pageX > window.screen.width / 2 ? window.screen.width / 2 - event.pageX : event.pageX) || -100;
                        dy = (event.pageY > window.screen.height / 2 ? window.screen.height / 2 - event.pageY : event.pageY) || 150;
                        e.preventDefault();
                        e.stopPropagation();
                        $appConfig.modal = ''
                        modal = ''
                        if (app.props && app.props.modal) {
                            modal = app.props.modal
                            modal.props.visible = true
                            $appConfig.modal = modal
                        }
                        if (app.url && app.url.includes('http')) goto(`/micro/${app.url}/${app.title||app.text}/${app.icon}`);
                        else if (app.url) goto(`${app.url}`);
                        app.url && ($appConfig.app = app)
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