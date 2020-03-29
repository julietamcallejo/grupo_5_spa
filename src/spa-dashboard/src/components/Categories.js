import React, { Component } from 'react';
import Category from './Category';

class Categories extends Component {
    constructor () {
        super();
        this.state = {
            categories: [],
            loading: true
        }
    }
    componentDidMount () {
        fetch('http://localhost:3000/api/products/categories')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    categories: data,
                    loading: false
                })
            })
            .catch(errors => console.log(errors));

    }
    render () {
        let { categories, loading } = this.state;    
        return (
            <div className="col-lg-6 mb-4">						
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3">
                                        <h5 className="m-0 font-weight-bold text-primary">Servicios por Categoría</h5>
                                    </div>
                                    <div className="card-body">
                                    {
                                        loading
                                        ?
                                        <div className="d-flex justify-content-center mb-3">
							
						                    <div className="spinner-border text-primary" role="status">
							                    <span className="sr-only">Loading...</span>
						                    </div>
					                    </div>
                                        :
                                        <div className="row">
                                            {
                                                categories.map((oneCategory, idx) => {
                                                    return (
                                                        <Category
                                                        key={idx}
                                                        name={oneCategory.name}
                                                        quantity={oneCategory.services.length}
                                                        />
                                                    )
                                                })
                                            }
                                            
                                            
                                        </div>
                                    }
                                    </div>
                                </div>
                            </div>
        )
}

}


    


export default Categories;