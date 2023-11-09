import appList from './coms/grid.svelte'
import groupList from './coms/group.svelte'
import Day from './coms/day.svelte'
import Clock from './coms/clock.svelte'
import Weather from './coms/weather.svelte'
import DeviceInfo from './coms/deviceInfo.svelte'
const getDate = () => {
    //获取当前时间
    const date = new Date();
    //获取中文周几
    const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    return {
        weekDay: week[date.getDay()],
        day: date.getDate(),
    }
}
export default {
    apps: [
        {
            index: 0,
            name: '首页',
            type: 'component',
            component: appList,
            props: {
                apps: [
                    { type: 'component', component: DeviceInfo, row: 4, col: 4 },
                    { type: 'component', component: Day, row: 4, col: 2 },
                    { type: 'component', component: Clock, row: 4, col: 2 },
                    { type: 'component', component: Weather, row: 4, col: 2},
                ]
            }
        },
        {
            index: 1,
            name: '自定义页面',
            type: 'component',
            component: appList,
            props: {
                apps: [
                    { type: 'component', component: Clock, row: 4, col: 2 },
                    { type: 'component', component: Weather, row: 4, col: 2, props: {injClass: 'text-white bg-gray-500'}},
                    { icon: 'ri-wechat-fill', text: '微信', bgColor: 'bg-green-600', color: 'text-white' },
                    { icon: 'ri-alipay-line', text: '支付宝', bgColor: 'bg-blue-800', color: 'text-white' },
                    { icon: 'ri-netease-cloud-music-line', url: 'http://m.music.boycot.top', text: '网易云音乐', bgColor: 'bg-red-600', color: 'text-white' },
                    { icon: 'ri-landscape-line', text: '照片', bgColor: 'bg-gray-300', color: 'text-purple-500' },
                    { icon: '', text: '日历', subText: getDate().weekDay, render: () => getDate().day, bgColor: 'bg-white' },
                    { icon: 'ri-navigation-fill', text: '高德地图', bgColor: 'bg-blue-300', color: 'text-blue-700' },
                    { icon: 'ri-music-fill', text: '抖音', bgColor: 'bg-black', size: 42, color: 'text-white' },
                    { icon: 'ri-settings-5-fill', text: '设置', bgColor: 'bg-gray-400', color: 'text-white' },
                    { icon: 'ri-qq-fill', text: 'QQ', bgColor: 'bg-white', color: 'text-red-500' },
                    { icon: 'ri-wallet-line', text: '钱包', bgColor: 'bg-black', color: 'text-gray-300' },
                    { icon: 'ri-app-store-line', text: 'App Store', bgColor: 'bg-blue-500', color: 'text-white' },
                    { icon: 'ri-camera-fill', text: '相机', bgColor: 'bg-gray-400', color: 'text-black' },
                    { icon: '', text: '日历', subText: getDate().weekDay, render: () => getDate().day, bgColor: 'bg-white' },
                    { icon: 'ri-navigation-fill', text: '高德地图', bgColor: 'bg-blue-300', color: 'text-blue-700' },
                    { icon: 'ri-music-fill', text: '抖音', bgColor: 'bg-black', size: 42, color: 'text-white' },
                    { icon: 'ri-settings-5-fill', text: '设置', bgColor: 'bg-gray-400', color: 'text-white' },
                ]
            }
        },
        {
            index: 2,
            name: '自定义页面',
            type: 'component',
            component: appList,
            props: {
                apps: [
                    { type: 'component',
                        component: groupList,
                        row: 4,
                        col: 2,
                        props: {
                            injClass: '',
                            apps: [
                                {
                                    index: 0,
                                    name: '日历',
                                    type: 'component',
                                    component: Day,
                                    props: {
                                        injClass: 'text-white w-full h-full bg-red-500',
                                    }
                                },
                                {
                                    index: 1,
                                    name: '时钟',
                                    type: 'component',
                                    component: Clock,
                                },
                                {
                                    index: 2,
                                    name: '天气',
                                    type: 'component',
                                    component: Weather,
                                }
                            ]
                        }
                    },
                    { type: 'component', component: Weather, row: 4, col: 2, props: {injClass: 'text-white bg-gray-500'}},
                    { icon: 'ri-wechat-fill', text: '微信', bgColor: 'bg-green-600', color: 'text-white' },
                    { icon: 'ri-alipay-line', text: '支付宝', bgColor: 'bg-blue-800', color: 'text-white' },
                    { icon: 'ri-netease-cloud-music-line', url: 'http://m.music.boycot.top', text: '网易云音乐', bgColor: 'bg-red-600', color: 'text-white' },
                    { icon: 'ri-landscape-line', text: '照片', bgColor: 'bg-gray-300', color: 'text-purple-500' },
                    { icon: '', text: '日历', subText: getDate().weekDay, render: () => getDate().day, bgColor: 'bg-white' },
                    { icon: 'ri-navigation-fill', text: '高德地图', bgColor: 'bg-blue-300', color: 'text-blue-700' },
                    { icon: 'ri-music-fill', text: '抖音', bgColor: 'bg-black', size: 42, color: 'text-white' },
                    { icon: 'ri-settings-5-fill', text: '设置', bgColor: 'bg-gray-400', color: 'text-white' },
                ]
            }
        }
    ],
    docks: [
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
    ]
}