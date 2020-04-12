import React, { useEffect, useRef, useCallback } from 'react';

const Dialog = ({ children, handleClose }) => {

	const wrapperRef = useRef();

	const handleClickOutside = useCallback((e) => {
		if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
			handleClose();
		}
	}, [handleClose]);

	const handleTypeEsc = useCallback((e) =>{
		if(e.keyCode === 27){
			handleClose();
		}
	}, [handleClose]);

	useEffect(() => {
		window.addEventListener('mousedown', handleClickOutside);
		window.addEventListener("keydown", handleTypeEsc);

		return () => {
			window.removeEventListener('mousedown', handleClickOutside);
			window.addEventListener("keydown", handleTypeEsc);

		};
	}, [handleClickOutside, handleClose, handleTypeEsc]);

	return (
		<div id="wrap_dialog" ref={wrapperRef}>
			{children}
		</div>
	)
};

export default Dialog;