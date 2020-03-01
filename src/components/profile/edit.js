import React from 'react';

function Edit(){
	return(
		<div id="wrap_edit">
			<div className="indent">
				<div className="sidemenu">
					<div className="item active">
						<span>Editar perfil</span>
					</div>
					<div className="item">
						<span>Alterar senha</span>
					</div>
				</div>

				<div className="content">
					<div className="item">
						<div className="col">
							<span>imagem</span>
						</div>
						<div className="col col2">
							<input type="text" />
						</div>
					</div>
					<div className="item">
						<div className="col">
							<span>Nome</span>
						</div>
						<div className="col col2">
							<input type="text" />
						</div>
					</div>
					<div className="item">
						<div className="col">
							<span>Nome de usuário</span>
						</div>
						<div className="col col2">
							<input type="text" />
						</div>
					</div>
					<div className="item">
						<div className="col">
							<span>Site</span>
						</div>
						<div className="col col2">
							<input type="text" />
						</div>
					</div>
					<div className="item">
						<div className="col">
							<span>Biografia</span>
						</div>
						<div className="col col2">
							<textarea type="text" />
						</div>
					</div>
					<div className="item">
						<div className="col"> </div>
						<div className="col col2">
							<span>Informações privadas</span>
						</div>
					</div>
					<div className="item">
						<div className="col">
							<span>Email</span>
						</div>
						<div className="col col2">
							<input type="text" />
						</div>
					</div>
					<div className="item">
						<div className="col">
							<span>Telefone</span>
						</div>
						<div className="col col2">
							<input type="text" />
						</div>
					</div>
					<div className="item">
						<div className="col"> </div>
						<div className="col col2">
							<input type="submit" value="Enviar" disabled/>
						</div>
					</div>

				</div>
			</div>
		</div>
	);
}

export default Edit;