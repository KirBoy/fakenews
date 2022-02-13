import * as axios from "axios";

export let instance = axios.create({
    baseURL: 'http://localhost:5656',
    headers: {"Authorization": localStorage.getItem('token')}
})

export function getCurrentAxiosInstance() {
    instance = axios.create({
        baseURL: 'http://localhost:5656',
        headers: {"Authorization": localStorage.getItem('token')}
    })
}


