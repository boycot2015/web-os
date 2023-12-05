import '@brewer/beerui/assets/beer.css';
import '/src/app.css';
export const ssr = true;
/** @type {import('./$types').LayoutLoad} */
export async function load({ params, route }) {
	return { ssr, params, route };
}
