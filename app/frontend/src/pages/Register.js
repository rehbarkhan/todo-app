import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
    const [loading,setLoading] = useState(false); 
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('');
    const [success,setSuccess] = useState(false)
    function register(e){
        e.preventDefault();
        setLoading(true);

        axios.post('http://localhost:8080/api/register/',{username,email,password})
        .then((response)=>{
            setUsername('');
            setPassword('');
            setEmail('');
            setSuccess(true)

        })
        .catch((error)=>{console.log(error)})
        setLoading(false);

    }
    return (
        <div>
                   {
                    success?<center>
                    <div class="alert alert-success mt-5" style={{width:"500px"}} role="alert">
                     You account has been register succesfully.
                     </div>
                    </center>:null
                   }
        <div className='container' style={{marginTop:"170px"}}>
            <div className='card mx-auto px-5 pt-3 shadow' style={{width:"450px"}}>
                <center><h1 className='display-5'>Register</h1></center>
                <hr className='mb-5'></hr>
            <form onSubmit={register}>
                <input type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} className='form-control mx-auto' style={{width:"300px"}}/>
                <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className='form-control mx-auto mt-3' style={{width:"300px"}}/>
                <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className='form-control mx-auto my-3' style={{width:"300px"}}/>
                <center className='mt-5 mb-5'>
                    {
                        loading?<div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>:<><button type="submit" className='btn btn-success'>Register</button> <Link className='ml-2' to="/login">Login</Link></>
                    }
                   </center> 
            </form>
            </div>
        </div>
    </div>
    );
}

export default Register;
