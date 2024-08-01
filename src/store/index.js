import { writable } from 'svelte/store';
import { http } from '$lib/request';
import config from '@/lib/config';
import appsConf, { editableApps } from '$lib/appConfig';
import { baseApiUrl } from '$lib';
const { apps = [], docks = [] } = appsConf
export const setBgColor = (bgUrl) => {
    document.body.style.backgroundImage = `url(${bgUrl})`;
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundSize = 'contain';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundAttachment = 'fixed';
}
const sortAppData = (apps, props) => {
    return apps.map((app, index) => {
        if (app.props) {
            if (app.props && app.props.modal && app.props.modal.props) {
                if (app.props.modal.props.apps && app.props.modal.props.apps.length) {
                    app.props.modal.props.apps = sortAppData(app.props.modal.props.apps, {...props, index: (props.index||0) + '' + index})
                }
            }
            if (app.props.apps && app.props.apps.length) {
                app.props.apps = sortAppData(app.props.apps, {...props, index: (props.index||0) + '' + index, closable: props.closable && !app.props.modal })
            }
            for (const key in props) {
                if (Object.hasOwnProperty.call(app.props, key)) {
                    app.props[key] = props[key]
                }
            }
        }
        return { ...app, ...props, index: (props.index||0) + '' + index }
    })
}
function weatherData () {
    let requestTimes = 0
	const { subscribe, set } = writable({});
    const fetchData = async () => {
        const res = await http(baseApiUrl + '/weather', { location: '深圳' })
        set(res.data || {})
        requestTimes = 0
    }
    fetchData()
	return {
		subscribe,
		refresh: () => {
            requestTimes++
            requestTimes === 1 && fetchData()
        }
	};
}
function appData () {
    let local = {}
    try {
        local = localStorage.getItem('_boycot_os_') || '{}'
        local = JSON.parse(local)
        if (location.pathname === '/' && local.app) {
            local.app.name = ''
        }
    } catch (error) {
        // console.log(error);
    }
	const { subscribe, update } = writable({ ...config || {}, apps: apps.map((el, index) => {
        if (el.props) {
            el.props.apps = sortAppData(el.props.apps, { index })
        }
        return el
    }), docks, winApps: [...editableApps.filter(el => el.affix && el.text)], ...local  });
	return {
		subscribe,
		set: async (res) => {
            update((data) => {
                try {
                    if (location.pathname === '/' && res.app) {
                        res.app.name = ''
                    }
                    localStorage.setItem('_boycot_os_', JSON.stringify({
                        ...data,
                        ...res
                    }))
                } catch (error) {
                    // console.log(error);
                }
                return ({
                    ...data,
                    ...res
                })
            })
            // res.bgUrl && setBgColor(res.bgUrl)
        }
	};
}

export const appConfig = appData();
export const weather = weatherData();