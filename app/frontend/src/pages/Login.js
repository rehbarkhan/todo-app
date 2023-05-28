import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const Login = () => {
    const [loading,setLoading] = useState(false);
    const [username,setUser] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState(false);
    const navigate = useNavigate();

    function login(e){
        e.preventDefault();
        setLoading(true);

        axios.post('http://localhost:8080/api/login/',{username,password})
        .then((response)=>{
            Cookies.set('_auth',username);
            Cookies.set('_token',response.data.token);
            navigate('/');
        }).catch((error)=>{
            setError(true);
        });
        setLoading(false)
    }
    return (
        <div>
            {
                    error?<center>
                    <div class="alert alert-success mt-5" style={{width:"500px"}} role="alert">
                     Unabel to login, kindly check your credentials.
                     </div>
                    </center>:null
                   }
            <div className='container' style={{marginTop:"200px"}}>
                <div className='card mx-auto px-5 pt-3 shadow' style={{width:"450px"}}>
                    <center><h1 className='display-5'>Todo List / Login</h1></center>
                    <hr className='mb-5'></hr>
                <form onSubmit={login}>
                    <input type="text" placeholder="Username" value={username} onChange={(e)=>setUser(e.target.value)} className='form-control mx-auto' style={{width:"300px"}}/>
                    <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className='form-control mx-auto my-3' style={{width:"300px"}}/>
                    <center className='mt-5 mb-5'>
                    {
                        loading?<div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>:<><button type="submit" className='btn btn-success'>Login</button><Link className='mx-5' to="/register">Register</Link></>
                    }    
                    </center>
                </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
