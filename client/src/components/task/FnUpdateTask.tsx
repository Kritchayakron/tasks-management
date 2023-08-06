import axios from 'axios';
import { domainBackend } from '../../app/config';
;
export async function updateTask(payload,token,id) {
    
    let axiosConfig = {
        headers: {
            'Authtoken': token
        }
      };
    
    const url = domainBackend+'task/update/'+id;
    //console.log(url);
    const options  = payload
    const promise = axios.put(url,options,axiosConfig)
    return promise.then((response) => response.data)
}