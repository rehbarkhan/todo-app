
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';

const PrivateRoute = ({Component}) => {
    const navigate = useNavigate();
    const [state,setState] = useState(false); 
    useEffect(()=>{
            if((Cookies.get('_auth') === null || Cookies.get('_auth') === undefined) && (Cookies.get('_token') === null || Cookies.get('_token') === undefined)){
                navigate('/login');
            }
            setState(true)
    },[]);
    if(state){
        return (<Component />);
    }
}

export default PrivateRoute;

