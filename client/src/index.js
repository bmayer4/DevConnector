import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './actions/authActions';

const token = localStorage.jwtToken;
if (token) {
  setAuthToken(token);
  const decoded = jwt_decode(token);
  console.log(decoded);
  console.log('this is decoded', decoded);
  store.dispatch(setCurrentUser(decoded));

  //check for epired token
  const currentTime = (Date.now() / 1000);
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    //TODO: clear profile
    window.location.href = '/login';
  }
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
