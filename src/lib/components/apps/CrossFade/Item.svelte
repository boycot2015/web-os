<script>
	import  { Motion } from 'svelte-motion';
	import  { createEventDispatcher } from 'svelte';
    import { appConfig } from '@/store'
    import { Icon } from '$lib/components'
    import { goto } from '$app/navigation';
	export let item;
	export let modal;
	export let selected;
    const dispatch = createEventDispatcher()
    const onSelect = e => {
        selected = item.i;
        if (modal) {
            return
        }
        item.url && ($appConfig.app = item)
        if (item.url && item.url.includes('http')) goto(`/micro/${item.url}/${item.title||item.text}/${item.icon}`)
        else if (item.url) goto(`${item.url}`)
    }
    const onRemove = (e, app) => {
        e.preventDefault();
        e.stopPropagation();
        $appConfig.dialog = {
            onConfirm: () => {
                item.hidden = true;
                $appConfig.apps[$appConfig.index].totalCount -= (app.row ? app.row + (app.col || 2) : 1)
                const findChild = (apps, app) => {
                    return apps.map(el => {
                        if (el.props && el.props.apps) {
                            el.props.apps = findChild(el.props.apps, app)
                        } else {
                            if (app.index === el.index) {
                                el.hidden = true
                            }
                        }
                        return el
                    }).filter(el => !el.hidden)
                }
                $appConfig.apps = findChild($appConfig.apps, item).filter(el => el.props.apps?.length)
                $appConfig.dialog.props.visible = false;
                $appConfig.modal = '';
            },
            onCancel: () => {
                // $appConfig.dialog = ''
            },
            props: {
                title: '温馨提示',
                content: '确定移除？',
                btnGap: 4,
                // primaryButton: {size: 'md'},
                // secondaryButton: {size: 'md'},
                popup: {
                    px: 16,
                    transparent: false
                },
                visible: true
            }
        }
        dispatch('remove', app)
    }
</script>

<style>
	.item {
        box-sizing: border-box;
		border-radius:20%;
        cursor: pointer;
	}
</style>

<Motion let:motion layoutId={item.i} layout>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div use:motion class='item flex flex-col text-center font-bold {item.component?'p-0':'p-3'} {item.injClass?item.injClass:item.component?'':'mx-1.5'} {item.closable ? 'animate-shake': ''}  text-black {item.injClass||''} {item.bgColor||''} {item.color||''}' style={`transform-origin: ${item.component?'50% 50%':'50% 50% 0px;'}`} on:click={onSelect}>
        {#if (item.closable && !item.props?.items && !item.readOnly) || (item.closable && item.componentName === 'Group')}
            <div role="none" on:click={(e) => onRemove(e, item)} class="!absolute bg-white/80 rounded-2xl p-0 shadow z-[99999] text-gray-500 !top-[-5px] !left-[-5px] text-sm" >
                <Icon size="22" name="ri-close-line"></Icon>
            </div>
        {/if}
        {#if item.icon}
            <Icon name={item.icon} size={item.size||36} injClass={`rounded-xl text-xs`}></Icon>
        {:else if item.component}
        <div>
            <svelte:component this={item.component} {...item.props}></svelte:component>
        </div>
        {/if}
	</div>
    {#if (item.text || item.title) && !item.component && !item.hideTitle}
        <p class="mt-2 text-center text-white">{item.text || item.title}</p>
    {/if}
</Motion>