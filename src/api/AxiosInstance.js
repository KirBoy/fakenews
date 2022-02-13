import * as axios from "axios";

export let instance = axios.create({
    baseURL: 'https://fakenews-kirboy.herokuapp.com',
    headers: {"Authorization": localStorage.getItem('token')}
})

export function getCurrentAxiosInstance() {
    instance = axios.create({
        baseURL: 'https://fakenews-kirboy.herokuapp.com',
        headers: {"Authorization": localStorage.getItem('token')}
    })
}


