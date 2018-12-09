import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routers from './routes';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Routers/>, document.getElementById('root'));


serviceWorker.unregister();
