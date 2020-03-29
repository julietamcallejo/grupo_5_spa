import React, { Component } from 'react';

class LastService extends Component {
    //Inicializando el estado del componente
    constructor () {
        super();
        this.state = {
            title:"Último Servicio ingresado",
            photo:"assets/images/product_dummy.svg",
            name:"Nombre del Servicio",
            summary:"Descripción",
            url:"/",
            loading: true
        }
    }
    componentDidMount () {
        
        fetch('http://localhost:3000/api/products/last')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    name: data.name,
                    summary: data.summary,
                    photo: data.photo,
                    url: data.url,
                    loading: false
                })
            })
            .catch(errors => console.log(errors));
    }
    render () {
        let {title, photo, name, summary, url, loading} = this.state;
        return (
            <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-primary">{title}</h5>
                </div>
                {
                    loading
                    ?
                    <div className="d-flex justify-content-center mb-3 mt-3">
							
						<div className="spinner-border text-primary" role="status">
							<span className="sr-only">Loading...</span>
						</div>
					</div>
                    :
                    <div className="card-body">
                        <div className="text-center">
                            <img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{width: "36rem"}} src={photo} alt="Service"></img>
                        </div>
                        <h6 className="m-0 font-weight-bold text-primary">{name}</h6>
                        <p>{summary}</p>
                        <a target="blank" href={url} >Ir al detalle del Servicio</a>
                    </div>
                }
                
            </div>
        </div>
    
    
        )

    }

}

export default LastService;