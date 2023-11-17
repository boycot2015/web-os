
import axios from 'axios';
import { dev } from '$app/environment';
import data from '@/mock';
/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    if (dev) {
        let cate = await axios.get('/brand/like/cate', {})
        let list = await axios.get('/brand/like/list', {})
        let top = await axios.get('/brand/top', {})
        let models = await axios.get('/brand/models', {})
        return { likeCate: cate.data, likeList: list.data, topList: top.data,modelsList: models.data };
    }
    return { likeCate: data[0].response(), likeList: data[1].response(), topList: data[2].response(), modelsList: data[3].response() }
}
export const ssr = false