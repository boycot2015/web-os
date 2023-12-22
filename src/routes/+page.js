import '@brewer/beerui/assets/beer.css';
import '/src/app.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
export const ssr = false;
/** @type {import('./$types').LayoutLoad} */
export async function load({ params, route }) {
	return { params, ssr, route };
}
