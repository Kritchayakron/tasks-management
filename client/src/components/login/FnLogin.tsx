import axios from 'axios';
import { domainBackend } from '../../app/config';
export async function loginUser(payload) {
    const url = domainBackend+'login/';
    const options  = payload
    const promise = axios.post(url,options)
    return promise.then((response) => response.data)
}
