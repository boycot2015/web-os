import { writable } from 'svelte/store';
import type { appsConfig } from '@/store/apps-config';
import { editableApps } from '$lib/appConfig';
import { createAppConfig } from '$lib/helpers/create-app-config';
export type AppID = keyof typeof appsConfig;

// export const openApps = writable({
//   wallpapers: null,
//   finder: null,
//   vscode: null,
//   calculator: null,
//   // safari: false,
//   appstore: null,
//   calendar: null,
//   // 'system-preferences': false,

//   'purus-twitter': null,
//   'view-source': null,

//   vercel: null,
//   micro: null,
// });

export const appsStore = () => {
    let local:any
    try {
        local = localStorage.getItem('_boycot_os_windows') || '{}'
        local = JSON.parse(local as any)
    } catch (error) {
        console.log(error);
    }
	const { subscribe, update } = writable({
        wallpapers: null,
        finder: null,
        vscode: null,
        calculator: null,
        // safari: false,
        appstore: null,
        calendar: null,
        // 'system-preferences': false,
      
        'purus-twitter': null,
        'view-source': null,
      
        vercel: null,
        micro: null, ...local.apps || {} });
	return {
		subscribe,
		set: async (res) => {
            update((data) => {
                try {
                    localStorage.setItem('_boycot_os_windows', JSON.stringify({
                        ...local,
                        apps: {
                            ...data,
                            ...res
                        }
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
/** Which apps are currently open */
export const openApps = appsStore()

/** Which app is currently focused */
export const activeApp = writable<AppID>('finder');

/**
 * Maximum zIndex for the active app
 * Initialize with -2, so that it becomes 0 when initialised
 */
export const activeAppZIndex = writable(-2);

export const appZIndices = writable({
  wallpapers: 0,
  finder: 0,
  vscode: 0,
  calculator: 0,
  // safari: 0,
  appstore: 0,
  calendar: 0,
  // 'system-preferences': 0,

  'purus-twitter': 0,
  'view-source': 0,

  vercel: 0,
  micro: 0,
});

export const isAppBeingDragged = writable(false);

export const appsInFullscreen = writable({
  wallpapers: false,
  finder: false,
  vscode: false,
  calculator: false,
  // safari: false,
  appstore: false,
  calendar: false,
  // 'system-preferences': false,

  'purus-twitter': false,
  'view-source': false,

  vercel: false,
  micro: false,
});
