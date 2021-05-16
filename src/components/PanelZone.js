import React, { Component } from "react";
import { Button } from "primereact/button";

class PanelZone extends Component {
  show = this.show.bind(this);

  show() {
    if (this.props.data == null) {
      this.props.onShow(this.props.action);
    } else {
      this.props.onShow(null);
    }
  }

  render() {
    return (
      <Button
        className="p-d-flex p-ai-center p-jc-center p-button-raised p-button-text"
        style={{ height: "100%", width: "100%" }}
        onClick={this.show}
      >
        {this.props.name}
      </Button>
    );
  }
}

export default PanelZone;
