import "./App.css";
import React, { Component } from "react";
import ShoutList from "./components/ShoutList";
import ShoutCreate from "./components/ShoutCreate";
import { Splitter, SplitterPanel } from "primereact/splitter";
import PanelZone from "./components/PanelZone";

class App extends Component {
  shoutList = this.shoutList.bind(this);
  shoutCreate = this.shoutCreate.bind(this);

  state = {
    baseUrl: "http://localhost:8080/Acme-Jobs/api",
    shoutList: null,
    shoutCreate: null,
  };

  shoutList(data) {
    this.setState({ shoutList: data });
  }

  shoutCreate(data) {
    this.setState({ shoutCreate: data });
  }

  render() {
    return (
      <div>
        <h3 className="p-d-flex p-ai-center p-jc-center">Control panel</h3>
        <Splitter style={{ height: "300px" }} className="p-mb-5">
          <SplitterPanel>
            <PanelZone
              name="List shouts"
              action={<ShoutList baseUrl={this.state.baseUrl}></ShoutList>}
              onShow={this.shoutList}
              data={this.state.shoutList}
            ></PanelZone>
          </SplitterPanel>
          <SplitterPanel>
            <PanelZone
              name="Create shout"
              action={<ShoutCreate baseUrl={this.state.baseUrl}></ShoutCreate>}
              onShow={this.shoutCreate}
              data={this.state.shoutCreate}
            ></PanelZone>
          </SplitterPanel>
        </Splitter>
        {this.state.shoutList}
        {this.state.shoutCreate}
      </div>
    );
  }
}

export default App;
