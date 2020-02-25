import React from 'react'
import Chat from './Chat'
import { Provider } from 'react-redux';

import configRedux from './redux/configRedux';
const store = configRedux();

const App = () => (
	<Provider store={store}>
		<Chat/>
	</Provider>
	);

export default App
