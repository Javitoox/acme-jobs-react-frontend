import axios from "axios";
import React, { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

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
        <DataTable paginator rows={5} value={this.state.data} header={"Shouts"}>
          <Column sortable field="moment" header="Moment"></Column>
          <Column
            sortable
            filter
            filterPlaceholder="Search by author"
            field="author"
            header="Author"
          ></Column>
          <Column
            sortable
            filter
            filterPlaceholder="Search by text"
            field="text"
            header="Text"
          ></Column>
        </DataTable>
      </div>
    );
  }
}

export default ShoutList;
