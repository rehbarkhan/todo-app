import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

const TodoList = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [data, setData] = useState([])
    const [update, setUpdate] = useState(true)
    const [title, setTitle] = useState('')
    const [msg, setMsg] = useState('');
    const [description, setDescription] = useState('')
    const navigate = useNavigate();
    const [readonly,setReadOnly] = useState(false)
    const headers = {
        "Authorization": `Token ${Cookies.get('_token')}`
    }

    useEffect(() => {
        axios.get(`http://localhost:8080/api/todo/${id}/`, { headers })
            .then((response) => {
                setData(response.data);
                setTitle(response.data.title);
                setDescription(response.data.description);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error.response.status)
                if (error.response.status === 404) {
                    console.log("inside 404")
                    setMsg("Page not found.")
                } else {
                    console.log("not 404 but error")
                    setMsg("You are not authorized to view the page.")
                }
                setLoading(false);
                setError(true);
            })
    }, [update])

    function updatePost() {
        axios.put(`http://localhost:8080/api/todo/${id}/`, { title, description }, { headers })
            .then((response) => {
                setUpdate(!update);

            })
    }

    function deletePost(){
        axios.delete(`http://localhost:8080/api/todo/${id}/`,{ headers })
        .then((response)=>{
            navigate('/')
        })
    }
    function closePost(){
        axios.patch(`http://localhost:8080/api/todo/${id}/`,{"status":'CLOSE'},{ headers })
        .then((response)=>{
            setUpdate(!update);
            setReadOnly(true);
        })
    }
    return (
        <div className='container py-3'>
            <Link to="/"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
            </svg> Back</Link>
            <center className='py-5'>
                {
                    loading ? <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div> : error ? <h1 className='display-4 my-5'>
                        {msg}
                    </h1> :
                        <div className='card shadow' style={{ width: "600px" }}>
                            <div className='card-header'>
                                <div class="d-flex justify-content-between">
                                    <div><h1 className="display-4">Post id : {data.id}</h1></div>
                                    <div><button className='btn btn-danger mt-3' onClick={deletePost}>Delete Post</button></div>
                                </div>
                                <hr></hr>
                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='form-control' disabled={readonly}/>
                                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='form-control my-4' disabled={readonly} ></textarea>
                                {
                                    readonly == false?
                                    <><button className='btn btn-primary' onClick={updatePost}>Update Post</button> <button className='btn btn-danger' onClick={closePost}>Close Post</button></>
                                    :null
                                }
                                
                            </div>
                        </div>

                }
            </center>
        </div>
    );
}

export default TodoList;
