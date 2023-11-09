<script>
    import { onMount, onDestroy } from 'svelte';
    import { Grids, Grid, Switch, Icon, Button, TabBar } from 'stdf';
    import appList from './coms/grid.svelte'
    import Swiper from '$lib/components/Swiper.svelte'
    import Day from './coms/day.svelte'
    
    let devices = ['iOS', 'Android', 'Windows', 'macOS', 'Ubuntu'];
    let curentIndex = 0;
    $: currentDevice = devices[curentIndex];
    const changeDeviceFun = () => {
        curentIndex === devices.length - 1 ? (curentIndex = 0) : curentIndex++;
    };
    let color = false;
    $: colorCss = `${color ? ' bg-gradient-to-tr from-extend0/70 to-extend2/70' : ' bg-gray dark:bg-gray-700'}`;
    const changeColorFun = e => {
        color = e.detail;
    };
    //获取当前时间
    const date = new Date();
    //获取当前月份转为汉字
    const monthArr = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    const monthIndex = date.getMonth();
    $: month = monthArr[monthIndex];
    const day = date.getDate();
    const getTime = () => {
        const date = new Date();
        const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        return `${hour}:${minute}`;
    }
    $: time = getTime();
    //获取中文周几
    const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    $: weekDay = week[date.getDay()];
    let weather = {};
    let weatherIcons = {'晴': 'ri-sun-line','多云': 'ri-sun-cloudy-line', '阴': 'ri-cloud-line', '雨': 'ri-rainy-line'};
    fetch('http://api.boycot.top/api/weather?location=深圳').then(async res => {
        weather = await res.json()
        weather = weather.data
    })
    let timer = [];
    onMount(() => {
        timer.map(el => el && clearInterval(el))
        timer.push(setInterval(() => {
            fetch('http://api.boycot.top/api/weather?location=深圳').then(async res => {
                weather = await res.json()
                weather = weather.data
            })
            time = getTime();
        }, 60000))
        timer.push(setInterval(() => {
            time = getTime();
        }, 1000))
    })
    onDestroy(() => {
        timer.map(el => clearInterval(el))
    })
    const componentData = [
        {
            index: 0,
            name: '首页',
            type: 'component',
            component: appList,
            props: {
                apps: [
                    { type: 'component', component: Day },
                    { icon: 'ri-wechat-fill', type: 'app', text: '微信', bgColor: 'bg-green-600', color: 'text-white' },
                    { icon: 'ri-alipay-line', text: '支付宝', bgColor: 'bg-blue-800', color: 'text-white' },
                    { icon: 'ri-netease-cloud-music-line', url: 'http://m.music.boycot.top', text: '网易云音乐', bgColor: 'bg-red-600', color: 'text-white' },
                    { icon: 'ri-landscape-line', text: '照片', bgColor: 'bg-gray-300', color: 'text-purple-500' },
                    { icon: '', text: '日历', subText: week[date.getDay()], render: () => date.getDate(), bgColor: 'bg-white' },
                    { icon: 'ri-navigation-fill', text: '高德地图', bgColor: 'bg-blue-300', color: 'text-blue-700' },
                    { icon: 'ri-music-fill', text: '抖音', bgColor: 'bg-black', size: 42, color: 'text-white' },
                    { icon: 'ri-settings-5-fill', text: '设置', bgColor: 'bg-gray-400', color: 'text-white' },
                    { icon: 'ri-qq-fill', text: 'QQ', bgColor: 'bg-white', color: 'text-red-500' },
                    { icon: 'ri-wallet-line', text: '钱包', bgColor: 'bg-black', color: 'text-gray-300' },
                    { icon: 'ri-app-store-line', text: 'App Store', bgColor: 'bg-blue-500', color: 'text-white' },
                    { icon: 'ri-camera-fill', text: '相机', bgColor: 'bg-gray-400', color: 'text-black' },
                ]
            }
        },
        {
            index: 0,
            name: '首页',
            type: 'component',
            component: appList,
            props: {
                apps: [
                    { icon: 'ri-wechat-fill', text: '微信', bgColor: 'bg-green-600', color: 'text-white' },
                    { icon: 'ri-alipay-line', text: '支付宝', bgColor: 'bg-blue-800', color: 'text-white' },
                    { icon: 'ri-netease-cloud-music-line', url: 'http://m.music.boycot.top', text: '网易云音乐', bgColor: 'bg-red-600', color: 'text-white' },
                    { icon: 'ri-landscape-line', text: '照片', bgColor: 'bg-gray-300', color: 'text-purple-500' },
                    { icon: '', text: '日历', subText: week[date.getDay()], render: () => date.getDate(), bgColor: 'bg-white' },
                    { icon: 'ri-navigation-fill', text: '高德地图', bgColor: 'bg-blue-300', color: 'text-blue-700' },
                    { icon: 'ri-music-fill', text: '抖音', bgColor: 'bg-black', size: 42, color: 'text-white' },
                    { icon: 'ri-settings-5-fill', text: '设置', bgColor: 'bg-gray-400', color: 'text-white' },
                    { icon: 'ri-qq-fill', text: 'QQ', bgColor: 'bg-white', color: 'text-red-500' },
                    { icon: 'ri-wallet-line', text: '钱包', bgColor: 'bg-black', color: 'text-gray-300' },
                    { icon: 'ri-app-store-line', text: 'App Store', bgColor: 'bg-blue-500', color: 'text-white' },
                    { icon: 'ri-camera-fill', text: '相机', bgColor: 'bg-gray-400', color: 'text-black' },
                ]
            }
        }
    ]
    const labels = [
		{ text: '', icon: { name: 'ri-phone-line', size: 40 }, activeIcon: { name: 'ri-phone-fill', size: 40 } },
		{
			text: '',
			icon: { name: 'ri-compass-3-line', size: 40 },
			activeIcon: { name: 'ri-compass-3-fill', size: 40 },
		},
		{
			text: '',
			icon: { name: 'ri-discuss-line', size: 40 },
			activeIcon: { name: 'ri-discuss-fill', size: 40 },
		},
		{
			text: '',
			icon: { name: 'ri-account-circle-line', size: 40 },
			activeIcon: { name: 'ri-account-circle-fill', size: 40 },
		},
	];
</script>
<style scoped lang="less">
</style>
<div class="demo pb-20">
    <div class="pb-0 pt-2">
        <div class={`mx-2 rounded-xl p-2 transition duration-300${colorCss}`}>
            <Grids cols={5} mx="0" my="0">
                <Grid row={3}>
                    <div
                        class="flex flex-col justify-between bg-white dark:bg-black p-1 h-full rounded-xl text-xs text-center shadow dark:shadow-white/10"
                    >
                        <div>{weekDay}</div>
                        <div class="text-4xl">{day}</div>
                        <div class="text-gray-600">{month}</div>
                    </div>
                </Grid>
                <Grid row={2}>
                    <div
                        class="bg-white dark:bg-black p-1 h-full rounded-xl text-xl font-bold text-center flex flex-col justify-center shadow dark:shadow-white/10"
                    >
                        {time}
                    </div>
                </Grid>
                <Grid row={2}>
                    <div
                        class="bg-white dark:bg-black p-1 h-full rounded-xl text-xs text-center flex flex-col justify-around shadow dark:shadow-white/10"
                    >
                        <div class="flex justify-center">
                            <Switch inside="slot" radius="full" on:change={changeColorFun}>
                                <div slot="false">
                                    <Icon name="ri-paint-brush-line" size={12} />
                                </div>
                                <div slot="true">
                                    <Icon name="ri-paint-brush-fill" size={12} theme />
                                </div>
                            </Switch>
                        </div>
                        <div>彩 色</div>
                    </div>
                </Grid>
                <Grid row={2} col={2}>
                    <div class="bg-white dark:bg-black h-full rounded-xl text-xs text-center flex flex-col justify-center shadow dark:shadow-white/10">
                        <Button fill="lineTheme" radius="full" on:click={changeDeviceFun}>切换设备</Button>
                    </div>
                </Grid>
                <Grid row={2} col={2}>
                    <div class="bg-white dark:bg-black p-1 h-full rounded-xl text-xs text-center flex justify-around shadow dark:shadow-white/10 py-1">
                        <div class="flex flex-col justify-center">
                            {#if currentDevice === 'iOS'}
                                <Icon name="ri-apple-fill" size={30} />
                            {:else if currentDevice === 'Android'}
                                <Icon name="ri-android-fill" size={30} />
                            {:else if currentDevice === 'Windows'}
                                <Icon name="ri-windows-fill" size={30} />
                            {:else if currentDevice === 'macOS'}
                                <Icon name="ri-command-fill" size={30} />
                            {:else}
                                <Icon name="ri-ubuntu-fill" size={30} />
                            {/if}
                        </div>
                        <div class="flex flex-col justify-around">
                            <div class="text-sm">
                                {#if currentDevice === 'iOS'}
                                    A15 Bionic
                                {:else if currentDevice === 'Android'}
                                    骁龙8 Gen1
                                {:else if currentDevice === 'Windows'}
                                    AMD YES
                                {:else if currentDevice === 'macOS'}
                                    M1 Ultra
                                {:else}
                                    Intel
                                {/if}
                            </div>
                            <div>
                                {#if currentDevice === 'iOS'}
                                    iPhone
                                {:else if currentDevice === 'Android'}
                                    Android
                                {:else if currentDevice === 'Windows'}
                                    Windows
                                {:else if currentDevice === 'macOS'}
                                    MacBook Pro
                                {:else}
                                    Ubuntu
                                {/if}
                            </div>
                        </div>
                    </div>
                </Grid>
                <Grid row={2}>
                    <div
                        class="bg-white dark:bg-black p-1 h-full rounded-xl text-xs text-center flex flex-col justify-around shadow dark:shadow-white/10"
                    >
                        <div class="flex justify-center">
                            <Switch inside="slot" radius="full">
                                <div slot="false">
                                    <Icon name="ri-bluetooth-line" size={12} top={-1} />
                                </div>
                                <div slot="true">
                                    <Icon name="ri-bluetooth-connect-line" size={12} theme top={-1} />
                                </div>
                            </Switch>
                        </div>
                        <div>蓝 牙</div>
                    </div>
                </Grid>
                <Grid row={4}>
                    <div class="bg-white dark:bg-black h-full rounded-xl text-xs text-center flex flex-col justify-around shadow dark:shadow-white/10">
                        <div>92%</div>
                        <div class="animate-pulse">
                            <Icon name="ri-battery-2-charge-line" size={30} injClass="text-extend1" />
                        </div>
                        <div>充电中</div>
                    </div>
                </Grid>
                <Grid row={3}>
                    <div
                        class="bg-white dark:bg-black h-full rounded-xl text-xs text-center flex flex-col justify-around items-center shadow dark:shadow-white/10"
                    >
                        <div class="location">{weather.location?.name||''}</div>
                        <Icon name="{weatherIcons[weather.now?.text]||''}" />
                        {weather.now?.temperature||0}℃
                    </div>
                </Grid>
                <Grid row={2}>
                    <div class="bg-white dark:bg-black h-full rounded-xl text-xs text-center flex flex-col justify-center shadow dark:shadow-white/10">
                        {#if currentDevice === 'iOS'}
                            <Icon name="ri-smartphone-line" size={30} />
                        {:else if currentDevice === 'Android'}
                            <Icon name="ri-tablet-line" size={30} />
                        {:else if currentDevice === 'Windows'}
                            <Icon name="ri-computer-line" size={30} />
                        {:else if currentDevice === 'macOS'}
                            <Icon name="ri-macbook-fill" size={30} />
                        {:else}
                            <Icon name="ri-ubuntu-line" size={30} />
                        {/if}
                    </div>
                </Grid>
                <Grid row={2}>
                    <div
                        class="bg-white dark:bg-black h-full rounded-xl text-xs text-center flex flex-col justify-around items-center shadow dark:shadow-white/10 py-1"
                    >
                        <div>
                            <Icon name="ri-sun-line" size={20} />
                        </div>
                        <div>
                            <div>68%</div>
                        </div>
                    </div>
                </Grid>
                <Grid row={2}>
                    <div
                        class="bg-white dark:bg-black p-1 h-full rounded-xl text-xs text-center flex flex-col justify-around shadow dark:shadow-white/10"
                    >
                        <div class="flex justify-center">
                            <Switch inside="slot" radius="full">
                                <div slot="false">
                                    <Icon name="ri-wifi-off-line" size={12} />
                                </div>
                                <div slot="true">
                                    <Icon name="ri-wifi-line" size={12} theme />
                                </div>
                            </Switch>
                        </div>
                        <div>Wi-Fi</div>
                    </div>
                </Grid>
                <Grid row={4} col={2}>
                    <a href="/mall" class="bg-white dark:bg-black p-1 h-full rounded-xl text-xl font-bold text-center text-gray-800 flex justify-around justify-center shadow dark:shadow-white/10 items-center">
                        <Icon name="ri-award-line" />
                        <span>品牌推荐</span>
                    </a>
                </Grid>
                <Grid row={4} col={1}>
                    <a href="/cates/wallpaper/83" class="bg-white dark:bg-black p-1 h-full rounded-xl text-md font-bold text-center text-gray-800 flex flex-col items-center justify-around shadow dark:shadow-white/10">
                        <Icon name="ri-folder-image-line" />
                        <span>在线壁纸</span>
                    </a>
                </Grid>
                <Grid row={2} col={2}>
                    <a href="/cates/movie" class="bg-white dark:bg-black p-1 h-full rounded-xl text-md font-bold text-center text-gray-800 flex justify-around items-center shadow dark:shadow-white/10">
                        <Icon name="ri-movie-2-line" />
                        <span>最新电影</span>
                    </a>
                </Grid>
                <Grid row={2} col={2}>
                    <a href="/cates/realtime" class="bg-white dark:bg-black p-1 h-full rounded-xl text-md font-bold text-center text-gray-800 flex justify-around items-center shadow dark:shadow-white/10">
                        <Icon name="ri-newspaper-line" />
                        <span
                        >新闻动态</span>
                    </a>
                </Grid>
            </Grids>
        </div>
    </div>
    <Swiper autoplay={false} indicatePosition="out" loop={false} duration={300} aspectRatio={[8, 8]} triggerSpeed={0.8} data={componentData} />
    <TabBar {labels} tabInjClass="text-extend0 dark:text-extend2" activeTabInjClass="!text-primary dark:!text-dark" injClass="px-2  left-3 right-3 bottom-3 rounded-full !fixed shadow dark:shadow-white/10" />
</div>