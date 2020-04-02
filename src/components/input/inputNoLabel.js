import React from 'react';

function InputNoLabel({span, type, name, value, handleChange, className = ''}){
	return(
		<div className="item">
			<div className="col">
				<span>{span}</span>
			</div>
			<div className="col col2">
				<input className={className} type={type} name={name} value={value} onChange={handleChange} />
			</div>
		</div>
	);
}

export default InputNoLabel;