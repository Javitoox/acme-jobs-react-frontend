import axios from "axios";
import React, { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

class ShoutList extends Component {
  state = {
    data: null,
  };

  componentDidMount() {
    axios.get(this.props.baseUrl + "/shout").then((res) => {
      this.setState({ data: res.data });
    });
  }

  render() {
    return (
      <div>
        <DataTable value={this.state.data} header={"Shouts"}>
          <Column field="moment" header="Moment"></Column>
          <Column field="author" header="Author"></Column>
          <Column field="text" header="Text"></Column>
        </DataTable>
        <Button className="mr-3" label="Add" />
      </div>
    );
  }
}

export default ShoutList;
