import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { UserProvider } from './UserContext'; // UserContext 파일에서 UserProvider 가져오기
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <UserProvider>
    <Router>
      <App />
    </Router>
  </UserProvider>,
  document.getElementById('root')
);