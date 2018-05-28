import React, { Component } from 'react';
import './App.css';

import NavBarShell from './components/NavBar/NavBarShell'
import Routes from './routes'

class App extends Component {
  constructor() {
    super()

    this.state = {
      BP: null
    }
  }

  componentDidMount(){
    this.BP = this.state.BP
  }

  setBP = () => {
    this.setState({ BP: 40 })
  }

  doMathToBP = (amount, operator) => {
    let newBP;
    if (operator === '-') newBP = this.state.BP - amount
    if (operator === '+') newBP = this.state.BP + amount

    this.setState({ BP: newBP })
  }

  render() {
    return (
      <div className="App">
        <Routes 
          setBP={this.setBP}/>
      </div>
    );
  }
}

export default NavBarShell(App, this.BP);
