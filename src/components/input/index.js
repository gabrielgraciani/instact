import React, {useState} from 'react';

function Input({type, placeholder, label, name, value}){


	const [animatePlaceholder, setAnimatePlaceholder] = useState(false);

	const handleChange = (e) => {
		if(e.target.value){
			setAnimatePlaceholder(true);
		} else{
			setAnimatePlaceholder(false)
		}
	};

	return(
		<div className="item">
			<label htmlFor="email" className={animatePlaceholder ? 'active' : ''}>{label}</label>
			<input type={type} name={name} value={value} placeholder={placeholder} onChange={handleChange} />
		</div>
	);
}

export default Input;