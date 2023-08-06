import axios from 'axios';
import { domainBackend } from '../../app/config';
;
export async function createTask(payload,token) {
    let axiosConfig = {
        headers: {
            'Authtoken': token
        }
      };
    const url = domainBackend+'task/create';
    const options  = payload
    const promise = axios.post(url,options,axiosConfig)
    return promise.then((response) => response.data)
}