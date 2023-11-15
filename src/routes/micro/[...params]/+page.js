
/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	return { ...params };
}
export const ssr = false