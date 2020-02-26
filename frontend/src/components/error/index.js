import React from 'react';
import CloseIcon from '@material-ui/icons/Close';

function Error(){
	return(
		<div id="wrap_error">
			<div className="indent">
				<div className="close">
					<CloseIcon size={20} />
				</div>
				<div className="text">
					<span>Ocorreu um erro inesperado. Tente novamente mais tarde.</span>
				</div>
			</div>
		</div>
	);
}

export default Error;