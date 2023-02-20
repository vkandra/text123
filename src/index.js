import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
// import '@aws-amplify/ui-react/styles.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { configureStore } from './store';

// import Amplify from 'aws-amplify';
// import config from './aws-exports';
// import { AmplifyProvider } from '@aws-amplify/ui-react';
// import awsExports from './aws-exports';
// import { AmplifyProvider, Authenticator } from '@aws-amplify/ui-react';

// Amplify.configure(awsExports);

const store = configureStore();

// console.log(props.userDetails.attributes.name);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <AmplifyProvider>
  // {/* <Authenticator.Provider> */}
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
  </Provider>
  // </Authenticator.Provider>
  // </AmplifyProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
