import React from 'react';
import {Link} from 'react-router-dom'

const CloseCardData = (props) => {
    const url = `/${props.id}`
    return (
        <div className="card my-2" style={{borderLeft:"5px #374259 solid",width:"600px",backgroundColor:"#5C8984"}}>
            <div className="card-body">
                #{props.id} <Link to={url}>{props.title}</Link>
            </div>
        </div>
    );
}

export default CloseCardData;
