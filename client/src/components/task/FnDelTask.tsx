import axios from 'axios';
import { domainBackend } from '../../app/config';
;
export const deleteTask = (id,token) => async (e) => {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this task",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            let axiosConfig = {
                headers: {
                    'Authtoken': token
                }
              };
            const url = domainBackend+'task/del/'+id;
     
            const promise = axios.delete(url,axiosConfig)
            promise.then((response) => {
                if(response.data.status == 1) {
                    swal("Success","Task Deleted!", "success").then(function() {
                      // await dispatch(tasktAsync(token))
                      window.location.replace('/');
                    });
                }
            })
          
        }
    });
}


