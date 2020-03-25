import React from 'react';
//Componentes
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Metric from './components/Metric';
import Service from './components/Service';
import Categories from './components/Categories';
import ProductList from './components/ProductList';
import Footer from './components/Footer';
import data from './data/data';



function App() {
  return (
    <div id="wrapper">
    {/* Componente SideBar */}
		<Sidebar/>
		

		
		<div id="content-wrapper" className="d-flex flex-column">

			
			<div id="content">
        {/* Componente Navbar */}
				<Navbar/>
				

				
				<div className="container-fluid">

					
					<div className="d-sm-flex align-items-center justify-content-between mb-4">
						<h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
					</div>

					
					<div className="row">
            {/* Componente Metric iterado con data */}
            { data.map((unDato, i) => {
              return (
                <Metric 
                key={i}
                title={unDato.title} 
                value={unDato.value}
                icon={unDato.icon}
                border={unDato.border} 
                />

              )
            })}
          </div>

					
					<div className="row">
						{/* Componente Servicio */}
            <Service
            title="Último Servicio ingresado"
            photo="assets/images/product_dummy.svg"
            name="Nombre del Servicio"
            summary="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, consequatur explicabo officia inventore libero veritatis iure voluptate reiciendis a magnam, vitae, aperiam voluptatum non corporis quae dolorem culpa exercitationem ratione?"
            />    						
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

export default App;
