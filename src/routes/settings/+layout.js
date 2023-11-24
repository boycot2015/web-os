export const ssr = false;
/** @type {import('./$types').LayoutLoad} */
export async function load({ params, route }) {
	return { ssr, params, route };
}
