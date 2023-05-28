import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
const Home = () => {
    const [data,setData] = useState([]);
    const [postData,updatePostData] = useState(true)
    const navigate = useNavigate();
    function fetch_data(){
        const headers = {
            Authorization:`Token ${Cookies.get('_token')}`
        }
        axios.get('http://localhost:8080/api/todo/',{headers})
        .then((response)=>{
            setData(response.data)
        })
        .catch((error)=>{
            console.log(error);
        })
    }
    useEffect(()=>{
        fetch_data();
        console.log("first time")
    },[postData])

    function sendData(){
        const headers = {
            Authorization:`Token ${Cookies.get('_token')}`
        }
        axios.post('http://localhost:8080/api/todo/',{"title":"coolworld","description":"data cool"},{headers})
        .then((response)=>{
            updatePostData(!postData);
        }).catch((error)=>{
            console.log(error)
        })
    }

    function signOut(){
        Cookies.remove('_auth');
        Cookies.remove('_token')
        navigate('/login');
    }
    return (
        <div>
            <center className='my-5'> 
                <h1 className='display-4'>Todo List</h1>
                {
                    data.length === 0 ?<h1>No data Present</h1>:
                    <div>
                        {data.map((value,k)=>{
                            return <div key={k}>
                                {value.id} {value.title} {value.description}
                            </div>
                        })}
                    </div>
                }
            </center>

            <button className="btn btn-primary" onClick={sendData}>Send Dat</button>
            <button className="btn btn-danger" onClick={signOut}>Logout</button>
        </div>
    );
}

export default Home;
