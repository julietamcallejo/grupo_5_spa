import React, { Component } from 'react';

class ProductList extends Component {
	constructor(){
		super();
		this.state = {
			services: [],
			pages: [],
			loading: true
		}
	}
	componentDidMount(){
		fetch('http://localhost:3000/api/products/')
			.then(response => response.json())
			.then(data => {
				let totalPages = [];
				for (let index = 1; index <= data.total_pages; index++) {
					totalPages.push(index);
					
				}
				this.setState({
					services: data.products,
					pages: totalPages,
					loading: false
				})
			})
			.catch(errors => console.log(errors))

	}
	render () {
		let { services, pages, loading } = this.state;
		return (
			<React.Fragment>
			
						<h1 className="h3 mb-2 text-gray-800">Servicios en la base de datos</h1>
						
						
						<div className="card shadow mb-4">
							
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
									<React.Fragment>
									<div className="table-responsive">
										<table className="table table-bordered table-hover" id="dataTable" width="100%" cellSpacing="0">
											<thead className="thead-dark">
												<tr>
													<th>ID</th>
													<th>Nombre</th>
													<th>Resumen</th>
													<th>Precio</th>
													<th>Categoría</th>
													<th>Enlace</th>
													
												</tr>
											</thead>
											
											<tbody>
												{
													services.map((oneService, idx) => {
														return <tr key={idx}>
																	<td>{oneService.id}</td>
																	<td>{oneService.name}</td>
																	<td>{oneService.summary}</td>
																	<td>{oneService.price}</td>
																	<td>{oneService.category.name}</td>
																	<td><a target="blank" className="btn btn-info" href={`http://localhost:3000/products/productDetail/${oneService.id}`} role="button">Ver</a></td>
																</tr>

													})

												}
												
												
											</tbody>
										</table>
									</div>
									<div className="d-flex justify-content-center">
										<nav aria-label="Pagination Results">
											<ul className="pagination justify-content-center">
												<li className="page-item disabled">
												<a className="page-link" href="/" tabIndex="-1" aria-disabled="true">Anterior</a>
												</li>
											{
												pages.map((onePage, idx) => {
													return <li key={idx} className="page-item"><a className="page-link" href="/">{onePage}</a></li>
												})

											}
											
												<li className="page-item">
												<a className="page-link" href="/">Siguiente</a>
												</li>
											</ul>
										</nav>

									</div>
									</React.Fragment>
								}
									
								
								
							</div>
							
						</div>
						</React.Fragment>
	
		)
	

	}
}

export default ProductList 
