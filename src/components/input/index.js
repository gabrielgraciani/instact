import React, {useState} from 'react';

function Input({type, placeholder, label, name, value, handleChange}){

	const [animatePlaceholder, setAnimatePlaceholder] = useState(false);

	const handleFocus = (e) => {
		setAnimatePlaceholder(e.currentTarget.value !== '');
		handleChange(e);
	};

	return(
		<div className="item">
			<label htmlFor="email" className={animatePlaceholder ? 'active' : ''}>{label}</label>
			<input type={type} name={name} value={value} placeholder={placeholder} onChange={e => handleFocus(e)} />
		</div>
	);
}

export default Input;