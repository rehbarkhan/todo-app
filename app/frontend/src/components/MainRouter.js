
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';

const MainRouter = ({Component}) => {
    const navigate = useNavigate();
    const [state,setState] = useState(false)
    useEffect(()=>{
           if(Cookies.get('_auth') !== undefined && Cookies.get('_token') !== undefined){
            navigate('/');
           }else{
            setState(true)
            Cookies.remove('_auth');
            Cookies.remove('_token');
           }
    },[]);
    if(state){
        return <Component />;
    }
}

export default MainRouter;

