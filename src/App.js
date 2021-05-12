import "./App.css";
import React, { Component } from "react";
import ShoutList from "./components/ShoutList";
import ShoutCreate from "./components/ShoutCreate";
import { Splitter, SplitterPanel } from "primereact/splitter";
import { Button } from "primereact/button";

class App extends Component {
  shoutList = this.shoutList.bind(this);
  shoutCreate = this.shoutCreate.bind(this);

  state = {
    baseUrl: "http://localhost:8080/Acme-Jobs/api",
    shoutList: null,
    shoutCreate: null,
  };

  shoutList() {
    if (this.state.shoutList == null) {
      this.setState({
        shoutList: <ShoutList baseUrl={this.state.baseUrl}></ShoutList>,
      });
    } else {
      this.setState({
        shoutList: null,
      });
    }
  }

  shoutCreate() {
    if (this.state.shoutCreate == null) {
      this.setState({
        shoutCreate: <ShoutCreate baseUrl={this.state.baseUrl}></ShoutCreate>,
      });
    } else {
      this.setState({
        shoutCreate: null,
      });
    }
  }

  render() {
    return (
      <div>
        <div className="card">
          <h2 className="p-d-flex p-ai-center p-jc-center">Control panel</h2>
          <Splitter style={{ height: "300px" }} className="p-mb-5">
            <SplitterPanel>
              <Button
                className="p-d-flex p-ai-center p-jc-center p-button-raised p-button-text"
                style={{ height: "100%", width: "100%" }}
                onClick={this.shoutList}
              >
                List shouts
              </Button>
            </SplitterPanel>
            <SplitterPanel>
              <Button
                className="p-d-flex p-ai-center p-jc-center p-button-raised p-button-text"
                style={{ height: "100%", width: "100%" }}
                onClick={this.shoutCreate}
              >
                Create shout
              </Button>
            </SplitterPanel>
          </Splitter>
        </div>
        {this.state.shoutList}
        {this.state.shoutCreate}
      </div>
    );
  }
}

export default App;
