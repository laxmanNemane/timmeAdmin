import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';

import App from './App';
import LoaderFile from './LoaderFile';
import store from './Store';
import initializeAxios from './Axios/Instance'; // Import the initializeAxios function

const root = ReactDOM.createRoot(document.getElementById('root'));

// Call the initializeAxios function to set up Axios interceptors
initializeAxios();

root.render(
  <Provider store={store}>
    <LoaderFile />
    <App />
  </Provider>
);
