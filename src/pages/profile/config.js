import React from 'react';
import {useSelector} from "react-redux";

function Config(){

	const { active } = useSelector(store => store.classActive);

	return(
		<div id="wrap_config" className={active ? 'active' : '' }>
			<div className="indent">
				<div className="item">
					<span>Alterar senha</span>
				</div>
				<div className="item">
					<span>Sair</span>
				</div>
				<div className="item">
					<span>Cancelar</span>
				</div>
			</div>
		</div>
	)
}

export default Config;