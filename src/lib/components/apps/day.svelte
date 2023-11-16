<script>
    import { Grid } from 'stdf';
    import { day as dayApp } from '$lib/appConfig';
    export let injClass = 'text-purple-600 bg-gray-200';
    export let row = 3;
    export let col = 1;
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
</script>
<Grid {row} {col}>
    <a
        on:click={(e) => e.stopPropagation()}
        href="/micro/{dayApp.url}/{dayApp.text}/{dayApp.icon}"
        class="flex {injClass} flex-col justify-between dark:bg-black py-5 h-full rounded-xl text-xs text-center shadow dark:shadow-white/10"
    >
        <div>{weekDay}</div>
        <div class="text-5xl py-5">{day}</div>
        <div class="text-md">{month}</div>
    </a>
</Grid>