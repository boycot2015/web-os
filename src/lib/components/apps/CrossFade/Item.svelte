<script>
	import  { Motion } from 'svelte-motion';
    import { appConfig } from '@/store'
    import { Icon } from '$lib/components'
    import { goto } from '$app/navigation';
	export let item;
	export let modal;
	export let selected;
    const onSelect = e => {
        selected = item.i;
        if (modal) {
            return
        }
        item.url && ($appConfig.app = item)
        if (item.url && item.url.includes('http')) goto(`/micro/${item.url}/${item.title||item.text}/${item.icon}`)
        else if (item.url) goto(`${item.url}`)
    }
</script>

<style>
	.item {
		border-radius:20%;
        cursor: pointer;
	}
</style>

<Motion let:motion layoutId={item.i} layout>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div use:motion class='item flex flex-col w-full text-center font-bold {item.component?'p-0':'p-4'} text-black {item.injClass} {item.bgColor} {item.color}' on:click={onSelect}>
        {#if item.icon}
            <Icon name={item.icon} size={item.size||36} injClass={`rounded-xl text-xs`}></Icon>
        {:else if item.component}
        <div>
            <svelte:component this={item.component} {...item.props}></svelte:component>
        </div>
        {/if}
	</div>
    {#if (item.text || item.title) && !item.hideTitle}
        <p class="mt-2 text-center text-white">{item.text || item.title}</p>
    {/if}
</Motion>