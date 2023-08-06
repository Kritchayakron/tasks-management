// A mock function to mimic making an async request for data
import axios from 'axios';
import { domainBackend } from '../../app/config';
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { update ,dataLogin } from '../login/LoginSlice';
export function fetchData(token,id = false) {
   let searchId  = '';
   if(id) {
    searchId = id;
   }
   const url = domainBackend+'task/data/'+searchId;
   const promise = axios.get(url,{
        headers: {
            'authtoken':token,
        }
    })
    return promise.then((response) => response.data)
  }
  