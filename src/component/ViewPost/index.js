import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ViewPost = ()=>{
    const location = useLocation();
    const navigate = useNavigate();
    return (

            <div className="container mt-5">
                <button className="mb-2 btn btn-outline-primary" onClick={()=>navigate('/dashboard')}>Back</button>
                <div className="card">
                    <div className="card-header">
                        <h2 className="card-title"> Title : {location?.state.title}</h2>
                    </div>
                    <div className="card-body">
                        <h6 className="card-subtitle mb-2 text-muted">Author : {location?.state.author}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">
                            Post Created Date : {location?.state.created_at}
                        </h6>
                        <p className="card-text"> Description : {location?.state.description}</p>
                    </div>
                </div>
            </div>
        );
}

export default ViewPost;