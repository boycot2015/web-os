<script>
    import { Grids, Grid, Icon } from 'stdf';
    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher()
    let color = false;
    $: colorCss = `${color ? ' bg-gradient-to-tr from-extend0/70 to-extend2/70' : ' bg-gray dark:bg-gray-700'}`;
    export let apps = [];
    export let injClass = '';
    const onClick = (e) => {
        e.preventDefault()
        dispatch('click', e)
    }
</script>
<div class="pb-0 pt-0" style="height: 100%;" role="none" on:click={(e) => onClick(e)}>
    <div class={`rounded-xl px-8 py-4 transition ${injClass} duration-300 ${colorCss}`}>
        <Grids cols={4} mx="0" my="0" gap="8">
            {#each apps as app, i}
                {#if app.type === 'app' || !app.type}
                <Grid row={app.row || 3} col={app.col || 1}>
                    <a class="flex flex-col justify-center text-center" href="{app.url}" target="{app.url?.includes('http')?'_blank':''}">
                        <div
                            class="flex flex-col justify-between {app.bgColor} {app.color} dark:bg-black {app.subText?'py-1':'p-2'} h-full rounded-xl text-md text-center shadow dark:shadow-white/10"
                        >
                        {#if app.subText}
                            <div class="text-xs">{app.subText}</div>
                        {/if}
                        {#if app.render}
                            <div class="text-3xl">{app.render()}</div>
                        {:else}
                            <Icon injClass="text-4xl" size="{app.size || 40}" name="{app.icon}"></Icon>
                        {/if}
                        </div>
                        <div class="font-bold text-gray-800 mt-2">{app.text}</div>
                    </a>
                </Grid>
                {:else if app.type === 'component' && app.component}
                <Grid row={app.row || 4} col={app.col || 1}>
                    <svelte:component {...app.props || {}} this={app.component}></svelte:component>
                </Grid>
                {/if}
            {/each}
        </Grids>
    </div>
</div>