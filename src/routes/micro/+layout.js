
/** @type {import('./$types').LayoutLoad} */
export async function load({ fetch, params, route }) {
    return { ...params, route }
}
export const ssr = false