import "./App.css";
import axios from "axios";
import React, { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

class App extends Component {
  state = {
    data: null,
  };

  componentDidMount() {
    axios.get("http://localhost:8080/Acme-Jobs/api/shout").then((res) => {
      this.setState({ data: res.data });
    });
  }

  render() {
    return (
      <div className="datatable-templating-demo">
        <div className="card">
          <DataTable value={this.state.data} header={"Shouts"} footer={""}>
            <Column field="text" header="Text"></Column>
          </DataTable>
        </div>
      </div>
    );
  }
}

export default App;
