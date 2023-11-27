<script>
	import { appConfig } from '@/store';
	import config from '$lib/config';
	import { Cell, CellGroup, Button, Dialog, Avatar, NavBar, Badge } from 'stdf';
	import { Icon } from '$lib/components';
    import { goto } from '$app/navigation';
    import { scale } from 'svelte/transition';
    import settings from './config' 
    let visible = false
    let component = ''
    const onCellClick = (cell, i) => {
        component = ''
        if (cell.dialog && cell.props) {
            cell.props.visible = true
            component = cell
            return
        }
        cell.url && goto(`/micro/${cell.url}/${cell.title}/${cell.icon?.name}`);
        appConfig.set({app: { ...cell, text: cell.title, icon: cell.icon.name, from: '/settings' }})
    }
</script>
<div transition:scale class="settings bg-gray-200 w-full h-full p-4 pt-8" style="max-width: 1200px;margin: auto;">
    <NavBar injClass="mb-8 rounded-2xl text-2xl !bg-transparent !border-none" on:clickleft={() => goto('/')} title="设置" />
    {#each settings as item}
        {#if item.type === 'single'}
            {#each item.list as cell}
                <Cell left="slot" detail={cell.detailSlot ? 'slot': ''} radius="{cell.radius || '2xl'}" injClass="!m-0 !mb-8" on:click={() => cell.url && goto(cell.url)}>
                    <div slot="left" class="avatar flex justify-start items-center">
                        {#if cell.avatar}
                            <Avatar injClass="bg-green-300 mr-5" icon="{cell.icon}" radius="full" size="md" />
                        {:else if cell.icon}
                            <Icon {...cell.icon}></Icon>
                        {/if}
                        <div class="text-xl">
                            {cell.title}
                            {#if cell.desc}
                                <div class="text-sm">{cell.desc}</div>
                            {/if}
                        </div>
                    </div>
                    <span slot="detail">
                        {#if cell.detail && cell.detail.component}
                        <svelte:component {...cell.detail.props} this={cell.detail.component}></svelte:component>
                        {:else}
                        <div class="text-black text-xl">请传入组件！</div>
                        {/if}
                    </span>
                </Cell>
            {/each}
        {:else}
            <div class="mb-8">
                <CellGroup mx="{item.mx || 0}" my="{item.my || 0}" radius="{item.radius || '2xl'}">
                    {#each item.list as cell, i}
                        {#if cell.component}
                            <svelte:component {...cell.props} this={cell.component}></svelte:component>
                        {:else}
                            <Cell left="{cell.icon}" title="{cell.title}" injClass="{cell.injClass || 'text-lg'}" mx="{cell.mx || '0'}" my="{cell.my || '0'}" shadow="{cell.shadow || 'none'}" detail="{cell.detailSlot ? 'slot': ''}" line={i < item.list.length - 1} radius="{cell.radius || 'none'}" on:click={() => onCellClick(cell, i)}>
                                <span slot="detail">
                                    {#if cell.detail && cell.detail.component}
                                    <svelte:component {...cell.detail.props} this={cell.detail.component}></svelte:component>
                                    {:else}
                                    <div class="text-black text-xl">请传入组件！</div>
                                    {/if}
                                </span>
                            </Cell>
                        {/if}
                    {/each}
                </CellGroup>
            </div>
        {/if}
    {/each}
    <Button state="error" injClass="mt-8 text-lg rounded-xl !px-0" on:click={() => visible = true}>恢复出厂设置</Button>
    <Dialog bind:visible title="温馨提示" popup={{ px: '10', radius: '2xl' }} btnGap={8} primaryText="重置" primaryButton={{state: 'warning'}} on:primary={() => {appConfig.set({ ...config });goto('/')}} content="确认清除所有数据包括本地用户信息？"></Dialog>
</div>