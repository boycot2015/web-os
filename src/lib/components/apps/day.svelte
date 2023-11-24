<script>
    import { Grid } from 'stdf';
    import { day as dayApp } from '$lib/appConfig';
    import { appConfig } from '@/store';
    import { goto } from '$app/navigation';
    import { Icon } from '$lib/components';
    export let injClass = 'text-purple-600 bg-gray-200';
    export let row = 3;
    export let col = 1;
    export let closeable = false;
    //获取当前时间
    const date = new Date();
    const day = date.getDate();
    //获取中文周几
    const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    //获取当前月份转为汉字
    const monthArr = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    const monthIndex = date.getMonth();
    $: month = monthArr[monthIndex];
    $: weekDay = week[date.getDay()];
    const handleClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        $appConfig.app = dayApp;
        goto(`/micro/${dayApp.url}/${dayApp.text}/${dayApp.icon}`)
    }
</script>
<Grid {row} {col}>
    <div
        role="none"
        on:click={handleClick}
        class="relative flex {closeable && 'animate-shake'} {injClass} h-full flex-col justify-between dark:bg-black py-5 h-full rounded-xl text-xs text-center shadow dark:shadow-white/10"
    >
        {#if closeable}
        <Icon on:click={(e) => {e.stopPropagation();}} injClass="!absolute bg-white/80 rounded-2xl p-0 shadow z-99 text-gray-500 !top-[-5px] !left-[-5px] text-sm" size="22" name="ri-close-line"></Icon>
        {/if}
        <div>{weekDay}</div>
        <div class="text-5xl py-5">{day}</div>
        <div class="text-md">{month}</div>
    </div>
</Grid>