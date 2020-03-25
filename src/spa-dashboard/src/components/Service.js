import React from 'react';

function Service (props) {
    return (
        <div className="col-lg-6 mb-4">
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">{props.title}</h6>
            </div>
            <div className="card-body">
                <div className="text-center">
                    <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: "25rem"}} src={props.photo} alt="image dummy"/>
                </div>
                <h7 className="m-0 font-weight-bold text-primary">{props.name}</h7>
                <p>{props.summary}</p>
                <a target="_blank" rel="nofollow" href="/">Ir al detalle del Servicio</a>
            </div>
        </div>
    </div>


    )
}

export default Service;