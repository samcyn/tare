import React from 'react';
import ReactDOM from 'react-dom';
import Routers from './routes';
import * as serviceWorker from './serviceWorker';

import './index.css';

ReactDOM.render(<Routers/>, document.getElementById('root'));


serviceWorker.unregister();
