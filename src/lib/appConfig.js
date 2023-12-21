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
    sm2: {row: 1, col: 2, size: 24, hideTitle: true, injTitleClass: 'text-white text-sm', injClass: '!p-1 text-sm'},
    xs: {row: 1, col: 1, size: 14, hideTitle: true, injTitleClass: 'text-white text-xs', injClass: '!p-[0.1rem] text-xs !rounded-md'}
}
export const clock = {icon: '', component: 'Clock', text: '时钟', desc: '秒钟', url: '', bgColor: '', color: 'text-black',injClass: '!pt-0 !pb-0 !px-1.5 transition-scale !bg-transparent !shadow-none', closable: false, readOnly: true }
export const taobao = {icon: 'ri-taobao-line', text: '淘宝', desc: '太好逛了吧', url: 'https://m.taobao.com/', bgColor: 'bg-white', color: 'text-orange-500', closable: false}
export const qzone = {icon: 'ri-star-smile-fill', text: 'QQ空间', desc: '分享喜悦，留住感动', url: 'https://qzone.qq.com/', bgColor: 'bg-white', color: 'text-yellow-500', closable: false}
export const news = {icon: 'ri-newspaper-line', text: '新闻头条', desc: '看见更大的世界', url: 'http://news.boycot.top/', bgColor: 'bg-red-500', color: 'text-white', closable: false}
export const weather = {icon: 'ri-sun-cloudy-fill', text: '天气', url: 'https://xw.tianqi.qq.com/', bgColor: 'bg-blue-800', desc: '你若安好，便是晴天~', color: 'text-white', closable: false}
export const shop = {icon: 'ri-shopping-bag-3-fill', text: '品牌推荐', url: '/mall', bgColor: 'bg-white', color: 'text-red-500', closable: false}
export const appleStore = {icon: 'ri-shopping-bag-fill', text: 'Apple Store', url: 'https://www.apple.com.cn/', bgColor: 'bg-white', color: 'text-blue-500', closable: false}
export const phone = { icon: 'ri-phone-line', text: '', bgColor: 'bg-white', color: 'text-red-500', closable: false, readOnly: true }
export const compass = { icon: 'ri-compass-3-line', text: '', bgColor: 'bg-white', color: 'text-red-500', closable: false, readOnly: true }
export const chat = { icon: 'ri-chat-3-line', text: '', bgColor: 'bg-white', color: 'text-red-500', closable: false, readOnly: true }
export const chatFill = { icon: 'ri-chat-3-fill', text: '', bgColor: 'bg-white', color: 'text-red-500', closable: false, readOnly: true }
export const account = { icon: 'ri-account-circle-line', text: '', bgColor: 'bg-white', color: 'text-red-500', readOnly: true }
export const guid = { icon: 'ri-compass-3-fill', url: 'https://www.pmbaobao.com/', text: '', bgColor: 'bg-white', color: 'text-red-500', opacity: 0, closable: false, readOnly: true }
export const qq = { icon: 'ri-qq-fill', text: 'QQ', url: 'https://im.qq.com/', bgColor: 'bg-white', color: 'text-red-500', closable: false }
export const qqMusic = { icon: 'ri-disc-line', text: 'QQ音乐', url: 'https://music.qq.com/', bgColor: 'bg-white', color: 'text-green-500', closable: false }
export const officeWechat = {icon: 'ri-wechat-line', text: '企业微信', desc: '兢兢业业，碌碌无为', url: 'https://work.weixin.qq.com/', bgColor: 'bg-white', color: 'text-blue-700', closable: false}
export const qqMap = { icon: 'ri-compass-fill', text: '腾讯地图', url: 'https://map.qq.com/m/index/map', bgColor: 'bg-blue-200', color: 'text-blue-500', closable: false }
export const wechat = { icon: 'ri-wechat-fill', text: '微信', desc: '发生什么事了，让我先发个朋友圈', url: 'https://weixin.qq.com/', bgColor: 'bg-green-600', color: 'text-white', closable: false }
export const alipay = { icon: 'ri-alipay-line', text: '支付宝', desc: '马爸爸的钱袋子', url: 'https://www.alipay.com/', bgColor: 'bg-blue-800', color: 'text-white', closable: false }
export const picture = { icon: 'ri-landscape-line', text: '照片', desc: '把记忆留在这里', url: '/cates/wallpaper/83', bgColor: 'bg-gray-300', color: 'text-purple-500', closable: false, readOnly: true }
export const netease = { icon: 'ri-netease-cloud-music-line', url: 'https://y.music.163.com/', text: '网易云音乐',desc: '耳朵怀孕了', bgColor: 'bg-red-600', color: 'text-white', closable: false }
export const navigation = { icon: 'ri-navigation-fill', url: 'https://www.amap.com/', text: '高德地图', desc: '缺德导航，出行必备',bgColor: 'bg-blue-300', color: 'text-blue-700', closable: false }
export const music = { icon: 'ri-headphone-fill', text: '我的音乐', desc: '抖音,记录美好生活', url: 'http://m.music.boycot.top', bgColor: 'bg-black', color: 'text-white', closable: false }
export const settings = { icon: 'ri-settings-5-fill', text: '设置', url: '/settings', bgColor: 'bg-gray-400', color: 'text-white', closable: false, readOnly: true, actions: [{text: '电池', icon: 'ri-battery-fill', url: '/settings'},{text: '蜂窝数据', icon: 'ri-base-station-line', url: '/settings'},{text: '蓝牙', icon: 'ri-bluetooth-line', url: '/settings'}] }
export const wallet = { icon: 'ri-wallet-line', text: '钱包', desc: '公交地铁，钱包最铁', bgColor: 'bg-black', color: 'text-gray-300', closable: false, readOnly: true }
export const appStore = { icon: 'ri-app-store-line', url: 'http://m.appchina.com/', text: 'App Store', desc: '想玩的，好逛的，应有尽有', bgColor: 'bg-blue-500', color: 'text-white', closable: false }
export const camera = { icon: 'ri-camera-fill', url: '/camera', text: '相机', desc: '照亮你的美', bgColor: 'bg-gray-400', color: 'text-black', closable: false, readOnly: true  }
export const day = { icon: 'ri-calendar-line', text: '日历', url: 'https://m.rili.com.cn/', desc: '时光如白驹过缝，悄悄溜走', subText: getDate().weekDay, color: 'text-gray-500', render: () => getDate().day, bgColor: 'bg-white', closable: false, readOnly: true }
export const userCenter = { icon: 'ri-user-line', text: '用户中心', url: 'http://user.test.limofang.cn/', desc: '用户中心', color: 'text-gray-500', bgColor: 'bg-white', closable: false }
export const movie = {icon: 'ri-movie-line', text: '神马影视', color: 'text-red-500', bgColor: 'bg-gray-500', url: 'https://www.9shenma.com/', closable: false, readOnly: true }
const editableApps = [
    clock,
    taobao,
    qzone,
    news,
    weather,
    shop,
    appleStore,
    phone,
    compass,
    chat,
    chatFill,
    account,
    guid,
    qqMusic,
    officeWechat,
    qqMap,
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
    day,
    // userCenter,
].filter(el => !el.readOnly)
export default {
    apps: [
        {
            index: 0,
            name: '负一屏',
            type: 'component',
            component: 'GridList',
            props: {
                apps: [
                    { type: 'component', component: 'DeviceInfo', text: '', row: 2, col: 4 },
                    { type: 'component', component: 'Day', ...day, text: '', closable: true, readOnly: false, row: 2, col: 2, props: {injClass: 'text-gray-800 bg-gradient-to-b from-[#ff9900] to-[#ccc]'} },
                    { type: 'component', component: 'Clock', text: '', row: 2, col: 2 },
                    { type: 'component', component: 'Weather', ...weather, text: '', row: 2, col: 2, props: {injClass: 'text-white bg-gradient-to-b from-[#CE9FFC] to-[#7367F0]'}},
                    { type: 'component', component: 'Theme', text: '', row: 2, col: 2, props: {injClass: 'text-white bg-gradient-to-b from-[#00f] to-[#7367F0]'}},
                ]
            }
        },
        {
            index: 1,
            name: '首页',
            type: 'component',
            component: 'GridList',
            props: {
                apps: [
                    { type: 'component', component: 'Clock', row: 2, col: 2, text: '时钟' },
                    { type: 'component', component: 'Weather', ...weather, row: 2, col: 2, props: {injClass: 'text-white bg-gray-500'}},
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
            component: 'GridList',
            props: {
                apps: [
                    { 
                        type: 'component',
                        component: 'Group',
                        row: 2,
                        col: 2,
                        props: {
                            injClass: '',
                            apps: [
                                {
                                    index: 0,
                                    text: '日历',
                                    type: 'component',
                                    component: 'Day',
                                    ...day,
                                    props: {
                                        injClass: 'text-white w-full h-full bg-red-500 !py-5',
                                    }
                                },
                                {
                                    index: 1,
                                    text: '时钟',
                                    type: 'component',
                                    component: 'Clock',
                                },
                                {
                                    index: 2,
                                    text: '天气',
                                    type: 'component',
                                    component: 'Weather',
                                    ...weather,
                                    props: {
                                        injClass: 'text-white w-full h-full bg-blue-500 !py-6',
                                    }
                                }
                            ]
                        }
                    },
                    { type: 'component', component: 'Weather', ...weather, row: 2, col: 2, props: {injClass: 'text-white bg-gray-500'}},
                    clock,
                    news,
                    alipay,
                    netease,
                    picture,
                    { type: 'component', component: 'Day', ...day, closable: false, readOnly: true, props: { row: 1, col: 1 }},
                    navigation,
                    music,
                    movie,
                    qzone,
                    weather,
                    appleStore,
                    // userCenter
                ]
            }
        },
        {
            index: 3,
            name: '自定义页面',
            type: 'component',
            component: 'GridList', // CrossFade
            props: {
                row: 1, col: 1,
                readOnly: true,
                cols: 4,
                injClass: '!bg-transparent px-8 py-4 pt-10',
                apps: [
                    {
                        type: 'component',
                        component: 'GridList', // CrossFade
                        row: 1, col: 1,
                        title: '理财',
                        readOnly: true,
                        cols: 1,
                        props: {
                            readOnly: true,
                            modal: {
                                component: 'Group',
                                type: 'swiper',
                                props: {
                                    title: '理财',
                                    visible: false,
                                    translateZ: 0,
                                    translateX: 0,
                                    loop: false,
                                    autoplay: false,
                                    titleAlign: 'center',
                                    containerWidth: null,
                                    aspectRatio: [1, 1.2],
                                    injClass: '!p-0 h-full',
                                    apps: [
                                        {
                                            type: 'component',
                                            component: 'GridList',
                                            props: {
                                                gap: 8,
                                                mx: 0,
                                                my: 0,
                                                cols: 3,
                                                injClass: '!p-6 !px-4',
                                                apps: [
                                                    { ...music, ...grid['1'] },
                                                    { ...navigation, ...grid['1'] },
                                                    { ...settings, ...grid['1'] },
                                                    { ...netease, ...grid['1'] },
                                                    { ...wechat, ...grid['1'] },
                                                    { ...alipay, ...grid['1'] },
                                                    { ...qq, ...grid['1'] },
                                                    { ...weather, ...grid['1'] },
                                                    { ...wallet, ...grid['1'] },
                                                ]
                                            }
                                        }
                                    ]
                                }
                            },
                            mx: 0,
                            my: 0,
                            gap: 4,
                            cols: 3,
                            injClass: 'text-white bg-white/10  rounded-xl !p-1',
                            apps: [
                                { ...music, ...grid['xs'] },
                                { ...navigation, ...grid['xs'] },
                                { ...weather, ...grid['xs'] },
                                { ...qq, ...grid['xs'] },
                                { ...wechat, ...grid['xs'] },
                                { ...picture, ...grid['xs'] },
                                { ...alipay, ...grid['xs'] },
                                { ...netease, ...grid['xs'] },
                            ]
                        }
                    },
                    navigation,
                    music,
                    settings,
                    qzone,
                    weather,
                    appleStore,
                    {
                        type: 'component',
                        component: 'GridList', // CrossFade
                        row: 1, col: 1,
                        title: '社交',
                        readOnly: true,
                        cols: 1,
                        props: {
                            readOnly: true,
                            modal: {
                                component: 'Group',
                                type: 'swiper',
                                props: {
                                    title: '社交',
                                    visible: false,
                                    translateZ: 0,
                                    translateX: 0,
                                    loop: false,
                                    autoplay: false,
                                    titleAlign: 'center',
                                    containerWidth: null,
                                    aspectRatio: [1, 1.2],
                                    injClass: '!p-0 h-full',
                                    apps: [
                                        {
                                            type: 'component',
                                            component: 'GridList',
                                            props: {
                                                gap: 8,
                                                mx: 0,
                                                my: 0,
                                                cols: 3,
                                                injClass: '!p-6 !px-4',
                                                apps: [
                                                    { ...navigation, ...grid['1'] },
                                                    { ...music, ...grid['1'] },
                                                    { ...wechat, ...grid['1'] },
                                                    { ...netease, ...grid['1'] },
                                                    { ...alipay, ...grid['1'] },
                                                    { ...weather, ...grid['1'] },
                                                    { ...settings, ...grid['1'] },
                                                    { ...qq, ...grid['1'] },
                                                    { ...wallet, ...grid['1'] },
                                                ]
                                            }
                                        },
                                        {
                                            type: 'component',
                                            component: 'GridList',
                                            props: {
                                                gap: 8,
                                                mx: 0,
                                                my: 0,
                                                cols: 3,
                                                injClass: '!p-6 !px-4',
                                                apps: [
                                                    { ...weather, ...grid['1'] },
                                                    { ...qqMap, ...grid['1'] },
                                                    { ...qqMusic, ...grid['1'] },
                                                ]
                                            }
                                        }
                                    ]
                                }
                            },
                            mx: 0,
                            my: 0,
                            gap: 4,
                            cols: 3,
                            injClass: 'text-white bg-white/10 rounded-xl !p-1',
                            apps: [
                                { ...music, ...grid['xs'] },
                                { ...navigation, ...grid['xs'] },
                                { ...weather, ...grid['xs'] },
                                { ...qq, ...grid['xs'] },
                                { ...wechat, ...grid['xs'] },
                                { ...picture, ...grid['xs'] },
                                { ...alipay, ...grid['xs'] },
                                { ...netease, ...grid['xs'] },
                            ]
                        }
                    },
                ]
            }
        },
        {
            index: 4,
            name: '应用列表',
            type: 'component',
            component: 'GridList',
            props: {
                injClass: '!p-6 !pt-8',
                gap: 4,
                apps: [
                    { 
                        type: 'component',
                        component: 'GridList',
                        row: 2, col: 4,
                        full: true,
                        fixed: true,
                        closable: false,
                        props: {
                            cols: 12,
                            injClass: '!p-0 rounded-2xl',
                            apps: [
                                {
                                    fixed: true,
                                    readOnly: true,
                                    closable: false,
                                    type: 'component',
                                    component: 'Input',
                                    row: 2,
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
                        component: 'GridList',
                        row: 2, col: 2,
                        props: {
                            gap: 4,
                            injClass: 'text-white bg-white/30 backdrop-blur-xl !p-3 rounded-2xl',
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
                        component: 'GridList', // CrossFade
                        row: 2, col: 2,
                        title: '理财',
                        readOnly: true,
                        props: {
                            gap: 4,
                            injClass: 'text-white bg-white/30 !p-3  rounded-2xl',
                            apps: [
                                { ...music, ...grid['x2'] },
                                { ...navigation, ...grid['x2'] },
                                { ...settings, ...grid['x2'] },
                                {
                                    row: 1, col: 2,
                                    type: 'component',
                                    component: 'GridList',
                                    props: {
                                        readOnly: true,
                                        modal: {
                                            component: 'GridList',
                                            props: {
                                                title: '理财',
                                                visible: false,
                                                gap: 4,
                                                mx: 0,
                                                my: 0,
                                                cols: 4,
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
                        component: 'GridList', // CrossFade
                        row: 2, col: 2,
                        title: '娱乐',
                        readOnly: true,
                        props: {
                            gap: 4,
                            injClass: 'text-white bg-white/30 !p-3  rounded-2xl',
                            apps: [
                                { ...clock, ...grid['x2'], injClass: '!p-0 text-gray-500 text-sm' },
                                { ...qqMap, ...grid['x2'] },
                                { ...picture, ...grid['x2'] },
                                { 
                                    row: 1, col: 2,
                                    type: 'component',
                                    component: 'GridList',
                                    readOnly: true,
                                    props: {
                                        modal: {
                                            component: 'GridList',
                                            props: {
                                                title: '娱乐',
                                                visible: false,
                                                gap: 4,
                                                mx: 0,
                                                my: 0,
                                                cols: 4,
                                                injClass: '!p-0 h-full',
                                                apps: [
                                                    { ...weather, ...grid['1'] },
                                                    { ...wechat, ...grid['1'] },
                                                    { ...alipay, ...grid['1'] },
                                                    { ...netease, ...grid['1'] },
                                                    { ...clock, ...grid['1'], injClass: '!p-0 !px-1 !bg-transparent !shadow-none' },
                                                    { ...qqMap, ...grid['1'] },
                                                    { ...picture, ...grid['1'] },
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
                        component: 'GridList',
                        row: 2, col: 2,
                        props: {
                            gap: 4,
                            injClass: 'text-white bg-white/30 backdrop-blur-xl !p-3 rounded-2xl',
                            apps: [
                                { ...taobao, ...grid['x2'] },
                                { ...alipay, ...grid['x2'] },
                                { ...wallet, ...grid['x2'] },
                                { type: 'component', component: 'Day', ...day, ...grid['x2'], injClass: '!py-2 text-gray-500 text-sm', hideTitle: true, props: {row: 1, col: 1, injClass: '!mx-0 bg-gray-500'}},
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
    ],
    components: {
        index: 3,
        name: '组件列表',
        type: 'component',
        component: 'GridList',
        props: {
            injClass: '!p-6',
            gap: 4,
            apps: [
                { type: 'component', isComponent: true, text: '设备管理', component: 'DeviceInfo', row: 2, col: 4, props: {  } },
                { type: 'component', isComponent: true, text: '日历', component: 'Day', row: 2, col: 2, props: {injClass: 'text-gray-800 bg-gradient-to-b from-[#ff9900] to-[#ccc]' } },
                { type: 'component', isComponent: true, text: '时钟', component: 'Clock', row: 2, col: 2, props: { } },
                { type: 'component',isComponent: true, text: '天气', component: 'Weather', row: 2, col: 2, props: {injClass: 'text-white bg-gradient-to-b from-[#CE9FFC] to-[#7367F0]'}},
                { type: 'component', isComponent: true, text: '主题设置', component: 'Theme', row: 2, col: 2, props: {injClass: 'text-white bg-gradient-to-b from-[#00f] to-[#7367F0]'}},
                ...editableApps.map(el => ({...el, isComponent: true})),
                // {
                //     type: 'component',
                //     name: taobao.text || '',
                //     component: 'Cell', row: 4, col: 4, cols: 1,
                //     isComponent: true,
                //     props: {
                //         title: taobao.text || '',
                //         injClass: 'text-xl !m-0',
                //         left: { name: taobao.icon, size: grid['x2'].size, injClass: `rounded-lg !mr-3 ${taobao.color} ${taobao.bgColor}` },
                //     }
                // },
                // {
                //     type: 'component',
                //     name: alipay.text || '',
                //     isComponent: true,
                //     component: 'Cell', row: 4, col: 4, cols: 1,
                //     props: {
                //         title: alipay.text || '',
                //         injClass: 'text-xl !m-0',
                //         left: { name: alipay.icon, size: grid['x2'].size, injClass: `rounded-lg !mr-3 ${alipay.color} ${alipay.bgColor}` },
                //     }
                // },
                // {
                //     type: 'component',
                //     isComponent: true,
                //     name: wallet.text || '',
                //     component: 'Cell', row: 4, col: 4, cols: 1,
                //     props: {
                //         title: wallet.text || '',
                //         injClass: 'text-xl !m-0',
                //         left: { name: wallet.icon, size: grid['x2'].size, injClass: `rounded-lg !mr-3 ${wallet.color} ${wallet.bgColor}` },
                //     }
                // }
            ]
        }
    },
}