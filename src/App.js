import "./App.css";
import React, { Component } from "react";
import ShoutList from "./components/ShoutList";
import { Splitter, SplitterPanel } from "primereact/splitter";

class App extends Component {
  showShoutList = this.showShoutList.bind(this);

  state = {
    baseUrl: "http://localhost:8080/Acme-Jobs/api",
    shoutList: null,
  };

  showShoutList(event) {
    this.setState({
      shoutList: <ShoutList baseUrl={this.state.baseUrl}></ShoutList>,
    });
  }

  render() {
    return (
      <div>
        {this.state.shoutList}
        <div className="card" onClick={this.showShoutList}>
          <h5>Control panel</h5>
          <Splitter style={{ height: "300px" }} className="p-mb-5">
            <SplitterPanel className="p-d-flex p-ai-center p-jc-center">
              List shouts
            </SplitterPanel>
            <SplitterPanel className="p-d-flex p-ai-center p-jc-center">
              Create shout
            </SplitterPanel>
          </Splitter>
        </div>
      </div>
    );
  }
}

export default App;
