<script>
	import { appConfig } from '@/store';
	import config from '$lib/config';
	import { Cell, CellGroup, Button, Dialog, Avatar, NavBar } from 'stdf';
	import Modal from '$lib/components/Modal.svelte';
    import { goto } from '$app/navigation';
    import { scale } from 'svelte/transition';
    let visible = false
</script>
<div transition:scale class="settings bg-gray-200 w-full h-full p-3 pt-8">
    <NavBar injClass="mb-8 rounded-2xl text-xl !bg-transparent !border-none" on:clickleft={() => goto('/')} title="设置" />
    <Cell left="slot" injClass="!m-0 !mb-8">
        <div slot="left" class="avatar flex justify-start items-center">
            <Avatar injClass="bg-green-300 mr-5" icon="{{ name: 'ri-close-line', theme: true, size: 32 }}" radius="full" size="md" />
            <div class="text-xl">boycot</div>
        </div>
    </Cell>
    <CellGroup mx="0" my="0" radius="2xl">
        <Cell left={{ name: 'ri-flight-takeoff-line', theme: true, size: 20, injClass: 'bg-orange-600 px-1.5 pb-0.5 mr-3 text-white rounded' }} title="飞行模式" injClass="text-lg" mx="0" my="0" shadow="none" line radius="none" />
        <Cell left={{ name: 'ri-wifi-off-line', theme: true, size: 20, injClass: 'bg-blue-600 px-1.5 pb-0.5 mr-3 text-white rounded' }} title="无线局域网" injClass="text-lg" mx="0" my="0" shadow="none" line radius="none" />
        <Cell left={{ name: 'ri-bluetooth-line', theme: true, size: 20, injClass: 'bg-blue-600 px-1.5 pb-0.5 mr-3 text-white rounded' }} title="蓝牙" injClass="text-lg" mx="0" my="0" shadow="none" radius="none" />
        <Cell left={{ name: 'ri-base-station-line', theme: true, size: 20, injClass: 'bg-green-600 px-1.5 pb-0.5 mr-3 text-white rounded' }} title="蜂窝网络" injClass="text-lg" mx="0" my="0" shadow="none" radius="none" />
        <Cell left={{ name: 'ri-link', theme: true, size: 20, injClass: 'bg-green-600 px-1.5 pb-0.5 mr-3 text-white rounded' }} title="个人热点" injClass="text-lg" mx="0" my="0" shadow="none" radius="none" />
    </CellGroup>
    <Button injClass="mt-8 text-lg rounded-xl !px-0" on:click={() => visible = true}>恢复出厂设置</Button>
    <Dialog bind:visible title="温馨提示" size="50" popup={{ px: '10', radius: '2xl' }} btnGap={8} primaryText="重置" primaryButton={{type: 'danger'}} on:primary={() => {appConfig.set({ ...config });goto('/')}} content="确认清除所有数据包括本地用户信息？"></Dialog>
</div>