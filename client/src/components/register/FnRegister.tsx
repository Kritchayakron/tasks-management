import axios from 'axios';
import { domainBackend } from '../../app/config';
export async function RegisterAccount(payload) {
    const url = domainBackend+'register/';
    const options  = payload
    const promise = axios.post(url,options)
    return promise.then((response) => response.data)
}
