import React, { Component } from 'react';
//Componentes

import Metric from './components/Metric';
import LastService from './components/LastService';
import Categories from './components/Categories';
import ProductList from './components/ProductList';
import Footer from './components/Footer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      totalUsers: '-',
      totalProducts: '-',
      totalCategories: '-',
      
    }
    }
    componentDidMount () {
      

      fetch('http://localhost:3000/api/users')
            .then(response => response.json())
            .then( users => {
              fetch('http://localhost:3000/api/products')
                .then(response => response.json())
                .then( services => {
                  this.setState({
                      totalUsers: users.total_results,
                      totalProducts: services.total_results,
                      totalCategories: services.total_categories,
                      
                  })

                })
              
            })
            .catch(errors => console.log(errors));
      

    }
    render (){
      let { totalUsers, totalProducts, totalCategories } = this.state;
      return (
        <div id="wrapper">
        {/* Componente SideBar */}
        {/* <Sidebar/> */ }
        
    
        
        <div id="content-wrapper" className="d-flex flex-column">
    
          
          <div id="content" className="fondo">
            {/* Componente Navbar */}
            {/* <Navbar/> */}
            
    
            
            <div className="container-fluid">
    
              
              <div className="d-sm-flex align-items-center justify-content-between mb-4 mt-4">
                <img src="/assets/images/IsoLogo Color.png" className="logospa" alt="logospa"/>
                {/*<h1 className="h4 mb-0 text-gray-800">Spa Dashboard</h1>*/}
              </div>
    
              {/* Modulos de Metricas independientes */}
              <div className="row">
              <Metric
                    title="Cantidad de Usuarios"
                    value= {totalUsers}
                    border="border-left-warning"
                    icon="fa-user-check"/>
              <Metric
                    title="Total de Servicios"
                    value={totalProducts}
                    border="border-left-primary"
                    icon="fa-clipboard-list"/>
              <Metric
                    title="Total de Categorías"
                    value={totalCategories}
                    border="border-left-success"
                    icon="fa-list-ul"/>
    
              </div>
              
    
              
              <div className="row">
                {/* Componente Servicio */}
                <LastService/>    						
                {/* Componente Categorias */}
                <Categories/>
              </div>
              <ProductList/>
            </div>
            
            
          </div>
    
          
          
    
          
          <Footer/>
          
    
        </div>
        </div>
    
      
      );

    }
  }





export default App;
