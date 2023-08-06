import axios from 'axios';
import { domainBackend } from '../../app/config';
;
export function callUpdate(payload,token) {
    
    let axiosConfig = {
        headers: {
            'Authtoken': token
        }
      };
    const url = domainBackend+'task/updatePosition';
    const options  = payload
    axios.put(url,options,axiosConfig)
}
