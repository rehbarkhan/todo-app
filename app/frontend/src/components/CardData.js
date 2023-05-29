import React from 'react';
import {Link} from 'react-router-dom'

const CardData = (props) => {
    const url = `/${props.id}`
    return (
        <div className="card my-2" style={{borderLeft:"5px #967E76 solid",width:"600px",backgroundColor:"#EEE3CB"}}>
            <div className="card-body">
                #{props.id} <Link to={url}>{props.title}</Link>
            </div>
        </div>
    );
}

export default CardData;
