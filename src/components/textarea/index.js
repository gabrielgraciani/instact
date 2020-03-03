import React from 'react';

function TextArea({span, name, value, handleChange}){
	return(
		<div className="item">
			<div className="col">
				<span>{span}</span>
			</div>
			<div className="col col2">
				<textarea name={name} value={value} onChange={handleChange} />
			</div>
		</div>
	);
}

export default TextArea;