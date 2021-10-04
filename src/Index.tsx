import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';

// import Router from './Router';
// import store from './store/store';
interface HelloWorldProps {
  userName: string;
  lang: string;
}
const App = (props: HelloWorldProps) => (
  <h1>
    Hi {props.userName} from React! Welcome to {props.lang}!
  </h1>
);

ReactDOM.render(
  // <BrowserRouter>
  //   <Provider store={store}>
  //     {/* <Router /> */}
  //     <div>Hey</div>
  //   </Provider>
  // </BrowserRouter>,
  <App userName="Beveloper" lang="TypeScript" />,
  document.getElementById('app'),
);
