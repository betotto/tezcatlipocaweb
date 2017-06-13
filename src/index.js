import '../less/main.less';

import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/store';
import App from './App';

const store = configureStore();

render(
	<App store={store} />,
		document.getElementById('app')
);
