import React, { Component } from 'react';
import './App.css';

import NavBarShell from './components/NavBar/NavBarShell'
import Routes from './routes'

class App extends Component {

  render() {
    return (
      <div className="App">
        <Routes />
      </div>
    );
  }
}

export default NavBarShell(App);
