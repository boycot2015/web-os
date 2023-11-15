
/** @type {import('./$types').LayoutLoad} */
export async function load({ fetch, params, route }) {
    let url = params.params.split('/').filter(el => el).slice(0, 2).join('//');
    let title = params.params.split('/').filter(el => el).slice(2,3);
    let logo = params.params.split('/').filter(el => el).slice(-1);
	return { url, title, logo };
}
export const ssr = false