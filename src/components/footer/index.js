import React, { useState, useEffect } from 'react';
import { HOME, DIRECT } from '../../routes';

function Footer({location}){

	const [hidden, setHidden] = useState(false);

	useEffect(() => {
		if(location.pathname === HOME || location.pathname === DIRECT){
			setHidden(true);
		}
		else{
			setHidden(false);
		}
	}, [location.pathname]);

	return(
		<>
		{!hidden && (
			<div id="wrap_footer">
				<div className="indent">
					<ul className="menu">
						<li><a href="https://about.instagram.com/about-us" target="_blank" rel="noopener noreferrer">SOBRE NÓS</a></li>
						<li><a href="https://help.instagram.com/" target="_blank" rel="noopener noreferrer">AJUDA</a></li>
						<li><a href="https://about.instagram.com/blog/" target="_blank" rel="noopener noreferrer">IMPRENSA</a></li>
						<li><a href="https://www.instagram.com/developer/" target="_blank" rel="noopener noreferrer">API</a></li>
						<li><a href="https://www.instagram.com/about/jobs/" target="_blank" rel="noopener noreferrer">CARREIRAS</a></li>
						<li><a href="https://help.instagram.com/519522125107875" target="_blank" rel="noopener noreferrer">PRIVACIDADE</a></li>
						<li><a href="https://help.instagram.com/581066165581870" target="_blank" rel="noopener noreferrer">TERMOS</a></li>
						<li><a href="https://www.instagram.com/explore/locations/" target="_blank" rel="noopener noreferrer">DIRETÓRIO</a></li>
						<li><a href="https://www.instagram.com/directory/profiles/" target="_blank" rel="noopener noreferrer">PERFIS</a></li>
						<li><a href="https://www.instagram.com/directory/hashtags/" target="_blank" rel="noopener noreferrer">HASHTAGS</a></li>
						<li>IDIOMA</li>
					</ul>
					<div className="copyright">
						<span>© 2020 INSTAGRAM DO FACEBOOK</span>
					</div>
				</div>
			</div>
		)}
		</>
	);
}

export default Footer;