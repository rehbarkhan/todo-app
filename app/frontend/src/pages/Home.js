import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
import CardData from '../components/CardData';
import CloseCardData from '../components/CloseCardData';
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
            <center> 
                <h1 className='display-4 mt-5'>Todo List</h1>
                <hr style={{width:"600px"}}></hr>
                {
                    data.length === 0 ?<h1>No data Present</h1>:
                    <div>
                        {data.map((value,k)=>{
                            if(value.status === 'OPEN'){
                                return <CardData key={k} id={value.id} title={value.title} />
                            }
                            else{
                                return <CloseCardData key={k} id={value.id} title={value.title} />
                            }
                            
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
