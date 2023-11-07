
import axios from 'axios';
import { baseApiUrl } from '$lib';
import '@brewer/beerui/assets/beer.css';
/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    let cate = await axios.get('/brand/like/cate', {})
    let list = await axios.get('/brand/like/list', {})
    let top = await axios.get('/brand/top', {})
    let models = await axios.get('/brand/models', {})
	return { likeCate: cate.data, likeList: list.data, topList: top.data,modelsList: models.data };
}
export const ssr = false