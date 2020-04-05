import React from 'react';

function simpleInput({type, name, value, handleChange, className = '', placeholder}){
	return(
		<input className={className} type={type} name={name} value={value || ''} onChange={handleChange} placeholder={placeholder} />
	);
}

export default simpleInput;