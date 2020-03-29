import React from 'react';
import PropTypes from 'prop-types';

function ServiceMetric (props) {

    return (
        <div className="col-md-4 mb-4">
            <div className= 'card border-left-primary shadow h-100 py-2'>
								<div className="card-body">
									<div className="row no-gutters align-items-center">
										<div className="col mr-2">
											<div className="text-m font-weight-bold text-primary text-uppercase mb-1">Total de Servicios</div>
											<div className="h5 mb-0 font-weight-bold text-gray-800">{props.value}</div>
										</div>
										<div className="col-auto">
											<i className= 'fas fa-clipboard-list fa-2x text-gray-300'></i>
										</div>
									</div>
								</div>
							</div>
                            </div>
    )
};

ServiceMetric.propTypes = {

value: PropTypes.oneOfType([
	PropTypes.string,
	PropTypes.number
]).isRequired,

};

ServiceMetric.defaultProps = {
	
	value: "--",
	
};




export default ServiceMetric;