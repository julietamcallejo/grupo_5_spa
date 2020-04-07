import React, { Component } from 'react';

class ProductList extends Component {
	constructor(){
		super();
		this.state = {
			services: [],
			pages: [],
			nextUrl:'',
			prevUrl:'',
			loading: true
		}
	}
	componentDidMount(){
		fetch('http://localhost:3000/api/products/')
			.then(response => response.json())
			.then(data => {
				if (data.status !== 500){
				let totalPages = [];
				for (let index = 1; index <= data.total_pages; index++) {
					totalPages.push(index);
					
				}
				this.setState({
					services: data.products,
					pages: totalPages,
					nextUrl: data.next,
					prevUrl: data.prev,
					loading: false
				})
			} 
			
			})
			.catch(errors => console.log(errors))

	}
	nextPage (){
		this.setState({
			loading: true
		})
		let { nextUrl } = this.state;
		fetch(nextUrl)
			.then(response => response.json())
			.then( data => {
				this.setState({
					services: data.products,
					nextUrl: data.next,
					prevUrl: data.prev,
					loading: false
				})
			})
		
	}
	prevPage (){
		this.setState({
			loading: true
		})
		let { prevUrl } = this.state;
		fetch(prevUrl)
			.then(response => response.json())
			.then( data => {
				this.setState({
					services: data.products,
					nextUrl: data.next,
					prevUrl: data.prev,
					loading: false
				})
			})
	}
	onePage (page){
		this.setState({
			loading: true
		})
		let pageUrl = `http://localhost:3000/api/products/?page=${page}`
		
		fetch(pageUrl)
			.then(response => response.json())
			.then( data => {
				this.setState({
					services: data.products,
					nextUrl: data.next,
					prevUrl: data.prev,
					loading: false
				})
			})
	}
	
	render () {
		let { services, pages, loading, nextUrl, prevUrl } = this.state;
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
												{
													prevUrl == null
													?
													<li className="page-item disable">
														<button className="btn page-link" disabled>Anterior</button>
													</li>
													:
													<li className="page-item">
														<button className="page-link" onClick={ () => this.prevPage() }>Anterior</button>
													</li>
												}
											{
												pages.map((onePage, idx) => {
													return <li key={idx} className="page-item">
															<button className="page-link" onClick={ () => this.onePage(onePage) }>{onePage}</button></li>
												})

											}
											{
												nextUrl == null
												?
												<li className="page-item disable">
													<button className="btn page-link" disabled>Siguiente</button>
												</li>
												:
												<li className="page-item">
													<button className="page-link" onClick={ () => this.nextPage() }>Siguiente</button>
												</li>

											}
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
