import React from 'react';

function Category (props) {
    return (
        <div className="col-lg-6 mb-4">
			<div className="card bg-success text-white shadow">
				<div className="card-body">
					{props.name}: {props.quantity}
				</div>
			</div>
		</div>
    )
}

export default Category;