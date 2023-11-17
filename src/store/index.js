import { readable, writable } from 'svelte/store';
import { http } from '$lib/request';
import config from '@/lib/config';
export const setBgColor = (bgUrl) => {
    document.body.style.backgroundImage = `url(${bgUrl})`;
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
}
function weatherData () {
    let requestTimes = 0
	const { subscribe, set, update } = writable({});
    const fetchData = async () => {
        let res = await http('http://api.boycot.top/api/weather', { location: '深圳' })
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
	const { subscribe, set, update } = writable({ ...config || {}, ...local });
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
            res.bgUrl && setBgColor(res.bgUrl)
        }
	};
}

export const appConfig = appData();
export const weather = weatherData();