import appList from '$lib/components/apps/grid.svelte'
import groupList from '$lib/components/apps/group.svelte'
import Day from '$lib/components/apps/day.svelte'
import Clock from '$lib/components/apps/clock.svelte'
import Weather from '$lib/components/apps/weather.svelte'
import Theme from '$lib/components/apps/theme.svelte'
import DeviceInfo from '$lib/components/apps/deviceInfo.svelte'
import { Input } from 'stdf';
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
const grid = {
    1: {row: 1, col: 1, size: 32, injTitleClass: 'text-white text-sm', injClass: '!p-4 !px-3 text-sm'},
    2: {row: 1, col: 2, size: 24, text: '', injTitleClass: 'text-white'},
    x2: {row: 1, col: 2, size: 36, text: '', injClass: 'p-4 text-sm'},
    sm2: {row: 1, col: 2, size: 24, text: '', injTitleClass: 'text-white text-sm', injClass: '!p-1 text-sm'}
}
const phone = { icon: 'ri-phone-line', text: '', bgColor: 'bg-white', color: 'text-red-500' }
const phoneFill = { icon: 'ri-phone-fill', text: '', bgColor: 'bg-white', color: 'text-red-500' }
const compass = { icon: 'ri-compass-3-line', text: '', bgColor: 'bg-white', color: 'text-red-500' }
const compassFill = { icon: 'ri-compass-3-fill', text: '', bgColor: 'bg-white', color: 'text-red-500' }
const discuss = { icon: 'ri-discuss-line', text: '', bgColor: 'bg-white', color: 'text-red-500' }
const discussFill = { icon: 'ri-discuss-fill', text: '', bgColor: 'bg-white', color: 'text-red-500' }
const account = { icon: 'ri-account-circle-line', text: '', bgColor: 'bg-white', color: 'text-red-500' }
const accountFill = { icon: 'ri-account-circle-fill', text: '', bgColor: 'bg-white', color: 'text-red-500' }
const qq = { icon: 'ri-qq-fill', text: 'QQ', bgColor: 'bg-white', color: 'text-red-500' }
const wechat = { icon: 'ri-wechat-fill', text: '微信', bgColor: 'bg-green-600', color: 'text-white' }
const alipay = { icon: 'ri-alipay-line', text: '支付宝', bgColor: 'bg-blue-800', color: 'text-white' }
const picture = { icon: 'ri-landscape-line', text: '照片', bgColor: 'bg-gray-300', color: 'text-purple-500' }
const netease = { icon: 'ri-netease-cloud-music-line', url: 'http://m.music.boycot.top', text: '网易云音乐', bgColor: 'bg-red-600', color: 'text-white' }
const navigation = { icon: 'ri-navigation-fill', text: '高德地图', bgColor: 'bg-blue-300', color: 'text-blue-700' }
const music = { icon: 'ri-music-fill', text: '抖音', bgColor: 'bg-black', color: 'text-white' }
const settings = { icon: 'ri-settings-5-fill', text: '设置', bgColor: 'bg-gray-400', color: 'text-white' }
const wallet = { icon: 'ri-wallet-line', text: '钱包', bgColor: 'bg-black', color: 'text-gray-300' }
const appStore = { icon: 'ri-app-store-line', text: 'App Store', bgColor: 'bg-blue-500', color: 'text-white'  }
const camera = { icon: 'ri-camera-fill', text: '相机', bgColor: 'bg-gray-400', color: 'text-black'  }
const day = { icon: '', text: '日历', subText: getDate().weekDay, render: () => getDate().day, bgColor: 'bg-white' }
export default {
    apps: [
        {
            index: 0,
            name: '负一屏',
            type: 'component',
            component: appList,
            props: {
                apps: [
                    { type: 'component', component: DeviceInfo, row: 4, col: 4 },
                    { type: 'component', component: Day, row: 4, col: 2, props: {injClass: 'text-gray-800 bg-gradient-to-b from-[#ff9900] to-[#ccc]'} },
                    { type: 'component', component: Clock, row: 4, col: 2 },
                    { type: 'component', component: Weather, row: 4, col: 2, props: {injClass: 'text-white bg-gradient-to-b from-[#CE9FFC] to-[#7367F0]'}},
                    { type: 'component', component: Theme, row: 4, col: 2, props: {injClass: 'text-white bg-gradient-to-b from-[#00f] to-[#7367F0]'}},
                ]
            }
        },
        {
            index: 1,
            name: '首页',
            type: 'component',
            component: appList,
            props: {
                apps: [
                    { type: 'component', component: Clock, row: 4, col: 2 },
                    { type: 'component', component: Weather, row: 4, col: 2, props: {injClass: 'text-white bg-gray-500'}},
                    qq,
                    wechat,
                    alipay,
                    picture,
                    netease,
                    navigation,
                    music,
                    settings,
                    wallet,
                    appStore,
                    camera,
                    navigation,
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
                    wechat,
                    alipay,
                    netease,
                    picture,
                    day,
                    navigation,
                    music,
                    settings,
                ]
            }
        },
        {
            index: 3,
            name: '应用列表',
            type: 'component',
            component: appList,
            props: {
                injClass: '!p-6',
                gap: 4,
                apps: [
                    { 
                        type: 'component',
                        component: Input,
                        row: 2,
                        col: 4,
                        props: {
                            radius: 'full',
                        }
                    },
                    {
                        title: '社交',
                        type: 'component',
                        component: appList,
                        row: 4, col: 2,
                        props: {
                            gap: 4,
                            injClass: 'text-white bg-trnsparent backdrop-blur-xl !p-3 rounded-xl',
                            apps: [
                                { ...wechat, ...grid['x2'] },
                                { ...alipay, ...grid['x2'] },
                                { ...netease, ...grid['x2'] },
                                { ...picture, ...grid['x2'] },
                            ]
                        }
                    },
                    {
                        type: 'component',
                        component: appList,
                        row: 4, col: 2,
                        title: '理财',
                        props: {
                            gap: 4,
                            injClass: 'text-white bg-transparent !p-3 backdrop-blur-xl rounded-xl',
                            apps: [
                                { ...day, row: 1, col: 2, size: 36, text: '', injClass: 'py-2 text-gray-500 text-sm' },
                                { ...navigation, ...grid['x2'] },
                                { ...music, ...grid['x2'] },
                                {
                                    row: 1, col: 2,
                                    type: 'component',
                                    component: appList,
                                    props: {
                                        modal: {
                                            component: appList,
                                            props: {
                                                title: '理财',
                                                visible: false,
                                                injClass: '!p-0 h-full',
                                                apps: [
                                                    { ...settings, ...grid['1'] },
                                                    { ...wechat, ...grid['1'] },
                                                    { ...alipay, ...grid['1'] },
                                                    { ...netease, ...grid['1'] },
                                                ]
                                            }
                                        },
                                        gap: 1,
                                        cols: 4,
                                        injClass: 'text-white bg-transparent !p-0 rounded-xl',
                                        apps: [
                                            { ...settings, ...grid['sm2'] },
                                            { ...wechat, ...grid['sm2'] },
                                            { ...alipay, ...grid['sm2'] },
                                            { ...netease, ...grid['sm2'] },
                                        ]
                                    }
                                },
                            ]
                        }
                    },
                    {
                        type: 'component',
                        component: appList,
                        row: 4, col: 2,
                        title: '娱乐',
                        props: {
                            gap: 4,
                            injClass: 'text-white bg-transparent !p-3 backdrop-blur-xl rounded-xl',
                            apps: [
                                { ...day, ...grid['2'], injClass: 'py-2 text-gray-500 text-sm' },
                                { ...navigation, ...grid['2'], injClass: 'p-5 text-gray-500 text-sm' },
                                { ...music, ...grid['2'], injClass: 'p-5 text-gray-500 text-sm' },
                                { 
                                    row: 1, col: 2,
                                    type: 'component',
                                    component: appList,
                                    props: {
                                        modal: {
                                            component: appList,
                                            props: {
                                                title: '娱乐',
                                                visible: false,
                                                injClass: '!p-0 h-full',
                                                apps: [
                                                    { ...settings, ...grid['1'] },
                                                    { ...wechat, ...grid['1'] },
                                                    { ...alipay, ...grid['1'] },
                                                    { ...netease, ...grid['1'] },
                                                ]
                                            }
                                        },
                                        gap: 1,
                                        cols: 4,
                                        injClass: 'text-white bg-transparent !p-0 rounded-xl',
                                        apps: [
                                            { ...settings, ...grid['sm2'] },
                                            { ...wechat, ...grid['sm2'] },
                                            { ...alipay, ...grid['sm2'] },
                                            { ...netease, ...grid['sm2'] },
                                        ]
                                    }
                                },
                            ]
                        }
                    },
                    {
                        title: '购物',
                        type: 'component',
                        component: appList,
                        row: 4, col: 2,
                        props: {
                            gap: 4,
                            injClass: 'text-white bg-trnsparent backdrop-blur-xl !p-3 rounded-xl',
                            apps: [
                                { ...wechat, ...grid['x2'] },
                                { ...alipay, ...grid['x2'] },
                                { ...netease, ...grid['x2'] },
                                { ...picture, ...grid['x2'] },
                            ]
                        }
                    },
                ]
            }
        }
    ],
    docks: [
        { text: '', icon: { name: phone.icon, size: 50 }, activeIcon: { name: phoneFill.icon, size: 50 } },
        {
            text: '',
            icon: { name: compass.icon, size: 50 },
            activeIcon: { name: compassFill.icon, size: 50 },
        },
        {
            text: '',
            icon: { name: discuss.icon, size: 50 },
            activeIcon: { name: discussFill.icon, size: 50 },
        },
        {
            text: '',
            icon: { name: account.icon, size: 50 },
            activeIcon: { name: accountFill.icon, size: 50 },
        },
    ]
}