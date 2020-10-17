import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import BaseRouter from './Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/vendor/nucleo/css/nucleo.css";
import "./assets/vendor/font-awesome/css/font-awesome.min.css";
import "./assets/vendor/font-awesome/css/font-awesome.css";
import './assets/scss/argon-design-system-react.scss';


class App extends React.Component {
  render() {
    return(
      <div>
        <Router>
          <BaseRouter />
        </Router>
      </div>
    )
  }
}

export default App;
