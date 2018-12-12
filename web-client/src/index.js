/**
 * created by Samson Iyanda on 07/12/2018
 * https://github.com/samcyn
 * samsoniyanda@outlook.com
 * https://samsoniyanda.herokuapp.com
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Routers from './routes';
import * as serviceWorker from './serviceWorker';

import './index.css';

ReactDOM.render(<Routers/>, document.getElementById('root'));


serviceWorker.unregister();
