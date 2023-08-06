import { useState,useEffect } from 'react';
import Header from '../global/header/header';
import Content from './content';
import { useAppSelector, useAppDispatch } from "../../app/hooks"
import { update ,dataLogin } from '../login/LoginSlice';
function Dashboard() {

  const tmpData = useAppSelector(dataLogin)
  const [isLoading, setIsLoading] = useState(1);

  useEffect(()=> {
    if(tmpData['Authtoken'] == null){
      window.location.replace('/login');
    } else {
      setIsLoading(0);
    }
  });

  return (
   <div style={{ display:  isLoading ? 'none': '' }}>
      <Header />
      <Content />
   </div>
  );
}

export default Dashboard;