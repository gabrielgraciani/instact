import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import {useDispatch, useSelector} from "react-redux";
import {classActiveSend} from "../../redux/actions/classActive";

function Error({msg}){

	const dispatch = useDispatch();
	const { active } = useSelector(store => store.classActive);

	const handleChange = () => {
		dispatch(classActiveSend());
	};

	return(
		<div id="wrap_error" className={active ? '' : 'active' }>
			<div className="indent">
				<div className="close" onClick={handleChange}>
					<CloseIcon size={20} />
				</div>
				<div className="text">
					{msg ? (
						<span>{msg}</span>
					) : (
						<span>Ocorreu um erro inesperado. Tente novamente mais tarde.</span>
					)}
				</div>
			</div>
		</div>
	);
}

export default Error;