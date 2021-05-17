import axios from "axios";
import React, { Component } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "../css/login.css";

class ShoutCreate extends Component {
  author = this.author.bind(this);
  text = this.text.bind(this);
  info = this.info.bind(this);

  state = {
    author: "",
    text: "",
    info: "",
    authorError: null,
    textError: null,
    infoError: null,
    succes: null,
    othersErrors: null,
  };

  author(event) {
    this.setState({ author: event.target.value });
  }

  text(event) {
    this.setState({ text: event.target.value });
  }

  info(event) {
    this.setState({ info: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState({
      authorError: null,
      textError: null,
      infoError: null,
      succes: null,
      othersErrors: null,
    });

    const shout = {
      author: this.state.author,
      text: this.state.text,
      info: this.state.info,
      moment: new Date(),
    };

    axios.post(this.props.baseUrl + "/shout/create", shout).then((res) => {
      this.respuesta(res.status, res.data);
    });
  };

  respuesta(status, data) {
    if (status === 203) {
      data.forEach((e) => this.error(e.field, e.defaultMessage));
    } else if (status === 201) {
      this.setState({
        author: "",
        text: "",
        info: "",
        succes: (
          <div className="alert alert-success" role="alert">
            Successful creation
          </div>
        ),
      });
    } else {
      this.setState({
        othersErrors: (
          <div className="alert alert-danger" role="alert">
            {data}
          </div>
        ),
      });
    }
  }

  error(campo, mensaje) {
    if (campo === "author") {
      this.setState({
        authorError: (
          <div className="alert alert-danger" role="alert">
            {mensaje}
          </div>
        ),
      });
    } else if (campo === "text") {
      this.setState({
        textError: (
          <div className="alert alert-danger" role="alert">
            {mensaje}
          </div>
        ),
      });
    } else if (campo === "info") {
      this.setState({
        infoError: (
          <div className="alert alert-danger" role="alert">
            {mensaje}
          </div>
        ),
      });
    }
  }

  render() {
    return (
      <div>
        <div className="c">
          <div className="login">
            <form onSubmit={this.handleSubmit}>
              {this.state.succes}
              {this.state.othersErrors}
              <div className="i">
                {this.state.authorError}
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                  </span>
                  <InputText
                    placeholder="Author"
                    name="author"
                    type="text"
                    value={this.state.author}
                    onChange={this.author}
                  />
                </div>
              </div>
              <div className="i">
                {this.state.textError}
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-align-center"></i>
                  </span>
                  <InputText
                    placeholder="Text"
                    name="text"
                    type="text"
                    value={this.state.text}
                    onChange={this.text}
                  />
                </div>
              </div>
              <div className="i">
                {this.state.infoError}
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-info"></i>
                  </span>
                  <InputText
                    placeholder="Info"
                    name="info"
                    type="text"
                    value={this.state.info}
                    onChange={this.info}
                  />
                </div>
              </div>
              <div className="b">
                <div className="i">
                  <Button
                    className="p-button-secondary"
                    label="Shout!"
                    icon="pi pi-fw pi-check"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ShoutCreate;
