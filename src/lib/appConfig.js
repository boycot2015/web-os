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
    1: {row: 1, col: 1, size: 40, injTitleClass: 'text-white text-sm', injClass: '!p-0 !py-3.5 mx-1'},
    2: {row: 1, col: 2, size: 24, hideTitle: true, injTitleClass: 'text-white'},
    x2: {row: 1, col: 2, size: 36, hideTitle: true, injClass: 'p-4 text-sm'},
    sm2: {row: 1, col: 2, size: 24, hideTitle: true, injTitleClass: 'text-white text-sm', injClass: '!p-1 text-sm'}
}
export const taobao = {icon: 'ri-taobao-line', text: '淘宝', desc: '太好逛了吧', url: 'https://m.taobao.com/', bgColor: 'bg-white', color: 'text-orange-500'}
export const qzone = {icon: 'ri-star-smile-fill', text: 'QQ空间', desc: '分享喜悦，留住感动', url: 'https://qzone.qq.com/', bgColor: 'bg-white', color: 'text-yellow-500'}
export const news = {icon: 'ri-newspaper-line', text: '新闻头条', desc: '看见更大的世界', url: 'http://news.boycot.top/', bgColor: 'bg-red-500', color: 'text-white'}
export const weather = {icon: 'ri-sun-cloudy-fill', text: '天气', url: 'https://xw.tianqi.qq.com/', bgColor: 'bg-blue-800', desc: '美好的一天从查看天气开始', color: 'text-white'}
export const shop = {icon: 'ri-shopping-bag-3-fill', text: '品牌推荐', url: '/mall', bgColor: 'bg-white', color: 'text-red-500'}
export const appleStore = {icon: 'ri-shopping-bag-fill', text: 'Apple Store', url: 'https://www.apple.com.cn/', bgColor: 'bg-white', color: 'text-blue-500'}
export const phone = { icon: 'ri-phone-line', text: '', bgColor: 'bg-white', color: 'text-red-500' }
export const phoneFill = { icon: 'ri-phone-fill', text: '', bgColor: 'bg-white', color: 'text-red-500' }
export const compass = { icon: 'ri-compass-3-line', text: '', bgColor: 'bg-white', color: 'text-red-500' }
export const compassFill = { icon: 'ri-compass-3-fill', text: '', bgColor: 'bg-white', color: 'text-red-500' }
export const chat = { icon: 'ri-chat-3-line', text: '', bgColor: 'bg-white', color: 'text-red-500' }
export const chatFill = { icon: 'ri-chat-3-fill', text: '', bgColor: 'bg-white', color: 'text-red-500' }
export const account = { icon: 'ri-account-circle-line', text: '', bgColor: 'bg-white', color: 'text-red-500' }
export const accountFill = { icon: 'ri-account-circle-fill', text: '', bgColor: 'bg-white', color: 'text-red-500' }
export const guid = { icon: 'ri-compass-3-fill', url: 'https://www.pmbaobao.com/', text: '', bgColor: 'bg-white', color: 'text-red-500', opacity: 0 }
export const qq = { icon: 'ri-qq-fill', text: 'QQ', url: 'https://im.qq.com/', bgColor: 'bg-white', color: 'text-red-500' }
export const qqMusic = { icon: 'ri-disc-line', text: 'QQ音乐', url: 'https://music.qq.com/', bgColor: 'bg-white', color: 'text-green-500' }
export const officeWechat = {icon: 'ri-wechat-line', text: '企业微信', desc: '兢兢业业，碌碌无为', url: 'https://work.weixin.qq.com/', bgColor: 'bg-white', color: 'text-blue-700'}
export const qqMap = { icon: 'ri-compass-fill', text: '腾讯地图', url: 'https://map.qq.com/m/index/map', bgColor: 'bg-blue-200', color: 'text-blue-500' }
export const wechat = { icon: 'ri-wechat-fill', text: '微信', desc: '发生什么事了，让我先发个朋友圈', url: 'https://weixin.qq.com/', bgColor: 'bg-green-600', color: 'text-white' }
export const alipay = { icon: 'ri-alipay-line', text: '支付宝', desc: '马爸爸的钱袋子', url: 'https://www.alipay.com/', bgColor: 'bg-blue-800', color: 'text-white' }
export const picture = { icon: 'ri-landscape-line', text: '照片', desc: '把记忆留在这里', url: '/cates/wallpaper/83', bgColor: 'bg-gray-300', color: 'text-purple-500' }
export const netease = { icon: 'ri-netease-cloud-music-line', url: 'https://y.music.163.com/', text: '网易云音乐',desc: '耳朵怀孕了', bgColor: 'bg-red-600', color: 'text-white' }
export const navigation = { icon: 'ri-navigation-fill', url: 'https://www.amap.com/', text: '高德地图', desc: '缺德导航，出行必备',bgColor: 'bg-blue-300', color: 'text-blue-700' }
export const music = { icon: 'ri-headphone-fill', text: '我的音乐', desc: '抖音,记录美好生活', url: 'http://m.music.boycot.top', bgColor: 'bg-black', color: 'text-white' }
export const settings = { icon: 'ri-settings-5-fill', text: '设置', bgColor: 'bg-gray-400', color: 'text-white' }
export const wallet = { icon: 'ri-wallet-line', text: '钱包', desc: '公交地铁，钱包最铁', bgColor: 'bg-black', color: 'text-gray-300' }
export const appStore = { icon: 'ri-app-store-line', url: 'http://m.appchina.com/', text: 'App Store', desc: '想玩的，好逛的，应有尽有', bgColor: 'bg-blue-500', color: 'text-white' }
export const camera = { icon: 'ri-camera-fill', url: '/camera', text: '相机', desc: '照亮你的美', bgColor: 'bg-gray-400', color: 'text-black'  }
export const day = { icon: 'ri-calendar-line', text: '日历', url: 'https://m.rili.com.cn/', desc: '时光如白驹过缝，悄悄溜走', subText: getDate().weekDay, color: 'text-gray-500', render: () => getDate().day, bgColor: 'bg-white' }
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
                    taobao,
                    qqMap,
                    music,
                    qqMusic,
                    wallet,
                    appStore,
                    camera,
                    officeWechat,
                    netease,
                    navigation,
                    shop,
                    settings,
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
                                        injClass: 'text-white w-full h-full bg-red-500 !py-5',
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
                                    props: {
                                        injClass: 'text-white w-full h-full bg-blue-500 !py-6',
                                    }
                                }
                            ]
                        }
                    },
                    { type: 'component', component: Weather, row: 4, col: 2, props: {injClass: 'text-white bg-gray-500'}},
                    news,
                    alipay,
                    netease,
                    picture,
                    day,
                    navigation,
                    music,
                    settings,
                    qzone,
                    weather,
                    appleStore
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
                        component: appList,
                        row: 4, col: 4,
                        props: {
                            cols: 12,
                            injClass: '!py-1 !px-0 bg-black/30 rounded-2xl',
                            apps: [
                                { 
                                    type: 'component',
                                    component: Input,
                                    row: 4,
                                    col: 12,
                                    url: '/apps',
                                    props: {
                                        placeholder: 'App资源库',
                                        py: '0',
                                        radius: '2xl'
                                    }
                                }
                            ]
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
                                { ...officeWechat, ...grid['x2'] },
                                { ...qzone, ...grid['x2'] },
                                { ...news, ...grid['x2'] },
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
                                { ...music, ...grid['x2'] },
                                { ...navigation, ...grid['x2'] },
                                { ...settings, ...grid['x2'] },
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
                                                gap: 4,
                                                injClass: '!p-0 h-full',
                                                apps: [
                                                    { ...music, ...grid['1'] },
                                                    { ...navigation, ...grid['1'] },
                                                    { ...settings, ...grid['1'] },
                                                    { ...netease, ...grid['1'] },
                                                    { ...wechat, ...grid['1'] },
                                                    { ...alipay, ...grid['1'] },
                                                ]
                                            }
                                        },
                                        gap: 1,
                                        cols: 4,
                                        injClass: 'text-white bg-transparent !p-0 rounded-xl',
                                        apps: [
                                            { ...music, ...grid['sm2'] },
                                            { ...navigation, ...grid['sm2'] },
                                            { ...settings, ...grid['sm2'] },
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
                                { ...day, ...grid['x2'], injClass: '!py-2 text-gray-500 text-sm' },
                                { ...qqMap, ...grid['x2'] },
                                { ...picture, ...grid['x2'] },
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
                                                gap: 4,
                                                injClass: '!p-0 h-full',
                                                apps: [
                                                    { ...weather, ...grid['1'] },
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
                                            { ...weather, ...grid['sm2'] },
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
                                { ...taobao, ...grid['x2'] },
                                { ...alipay, ...grid['x2'] },
                                { ...wallet, ...grid['x2'] },
                                { ...day, ...grid['x2'], injClass: '!py-2 text-gray-500 text-sm' },
                            ]
                        }
                    },
                ]
            }
        }
    ],
    docks: [
        {  ...grid['1'], ...phone, text: '', size: 48, injClass: '!py-1.5 !px-0 text-white bg-gradient-to-t from-[#10c910] to-[#99e599]' },
        {  ...grid['1'], ...guid, text: '', size: 48, injClass: '!py-1.5 !px-0 bg-white !text-blue-500' },
        { ...grid['1'], ...chatFill, text: '', size: 48, injClass: '!py-1.5 !px-0 text-white bg-gradient-to-t from-[#10c910] to-[#99e599]' },
        { ...grid['1'], ...account, text: '', size: 48, injClass: '!py-1.5 !px-0 !text-gray-400 !bg-gray-300'},
        { ...grid['1'], ...picture, text: '', size: 48, injClass: '!py-1.5 !px-0'},
        { ...grid['1'], ...netease, text: '', size: 48, injClass: '!py-1.5 !px-0'},
        { ...grid['1'], ...qq, text: '', size: 48, injClass: '!py-1.5 !px-0'},
        { ...grid['1'], ...camera, text: '', size: 48, injClass: '!py-1.5 !px-0'},
        { ...grid['1'], ...music, text: '', size: 48, injClass: '!py-1.5 !px-0'},
        { ...grid['1'], ...navigation, text: '', size: 48, injClass: '!py-1.5 !px-0'},
        { ...grid['1'], ...weather, text: '', size: 48, injClass: '!py-1.5 !px-0'},
        { ...grid['1'], ...wallet, text: '', size: 48, injClass: '!py-1.5 !px-0'},
    ]
}