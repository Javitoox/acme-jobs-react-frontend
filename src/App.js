import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import React, { Component } from 'react';

class App extends Component {

  action = this.action.bind(this);

  state = {
		data: null
	}

   action(event) {
    axios
      .get("http://localhost:8080/Acme-Jobs/anonymous/shout/list")
      .then((res) => {
        this.setState({data: res.data[1]})
      });
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <p onClick={this.action}>First Shout!</p>
          <p>{this.state.data}</p>
        </header>
      </div>
    );
  }
}

export default App