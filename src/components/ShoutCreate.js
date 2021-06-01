import axios from "axios";
import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import "../css/login.css";
import { useTranslation } from "react-i18next";
import { ProgressBar } from "primereact/progressbar";

function ShoutCreate(props) {
  const { t, i18n } = useTranslation();
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [info, setInfo] = useState("");
  const [budget, setBudget] = useState("");
  const [authorError, setAuthorError] = useState(null);
  const [textError, setTextError] = useState(null);
  const [infoError, setInfoError] = useState(null);
  const [budgetError, setBudgetError] = useState(null);
  const [succes, setSucces] = useState(null);
  const [othersErrors, setOthersErrors] = useState(null);

  function authorChange(event) {
    setAuthor(event.target.value);
  }

  function textChange(event) {
    setText(event.target.value);
  }

  function infoChange(event) {
    setInfo(event.target.value);
  }

  function budgetChange(event) {
    setBudget(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    setAuthorError(null);
    setTextError(null);
    setInfoError(null);
    setBudgetError(null);
    setSucces(null);
    setOthersErrors(null);

    const shout = {
      author: author,
      text: text,
      info: info,
      budget: budget,
      moment: new Date(),
    };

    function deleteErrorMessage() {
      setOthersErrors(null);
    }

    axios
      .post(props.baseUrl + "/anonymous/shout/create?language=" + i18n.language, shout)
      .then((res) => {
        response(res.status, res.data);
      })
      .catch((error) => {
        setOthersErrors(
          <div className="alert alert-dark">
            <strong>{t("error.connection")}</strong>
            <ProgressBar
              mode="indeterminate"
              style={{ height: "6px" }}
            ></ProgressBar>
          </div>
        );
        setTimeout(deleteErrorMessage, 10000);
      });
  };

  function response(status, data) {
    function deleteSuccesMessage() {
      setSucces(null);
    }

    if (status === 203) {
      data.forEach((e) => error(e.field, e.defaultMessage));
    } else if (status === 201) {
      setAuthor("");
      setText("");
      setInfo("");
      setBudget("");
      setSucces(
        <div className="alert alert-success" role="alert">
          {t("shouts.create.succes")}
        </div>
      );
      setTimeout(deleteSuccesMessage, 5000);
    } else {
      setOthersErrors(
        <div className="alert alert-danger" role="alert">
          {data}
        </div>
      );
    }
  }

  function error(field, message) {
    if (field === "author") {
      setAuthorError(
        <div className="alert alert-danger" role="alert">
          {message}
        </div>
      );
    } else if (field === "text") {
      setTextError(
        <div className="alert alert-danger" role="alert">
          {message}
        </div>
      );
    } else if (field === "info") {
      setInfoError(
        <div className="alert alert-danger" role="alert">
          {message}
        </div>
      );
    } else if (field === "budget") {
      setBudgetError(
        <div className="alert alert-danger" role="alert">
          {message}
        </div>
      );
    }
  }

  return (
    <div>
      <div className="c">
        <div className="login">
          <form onSubmit={handleSubmit}>
            {succes}
            {othersErrors}
            <div className="i">
              {authorError}
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-user"></i>
                </span>
                <InputText
                  placeholder={t("shouts.create.label.author")}
                  name="author"
                  type="text"
                  value={author}
                  onChange={authorChange}
                />
              </div>
            </div>
            <div className="i">
              {textError}
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-align-center"></i>
                </span>
                <InputText
                  placeholder={t("shouts.create.label.text")}
                  name="text"
                  type="text"
                  value={text}
                  onChange={textChange}
                />
              </div>
            </div>
            <div className="i">
              {infoError}
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-info"></i>
                </span>
                <InputText
                  placeholder={t("shouts.create.label.info")}
                  name="info"
                  type="text"
                  value={info}
                  onChange={infoChange}
                />
              </div>
            </div>
            <div className="i">
              {budgetError}
              <div className="p-inputgroup">
                <span className="p-inputgroup-addon">
                  <i className="pi pi-money-bill"></i>
                </span>
                <InputText
                  placeholder={t("shouts.create.label.budget")}
                  name="budget"
                  type="text"
                  value={budget}
                  onChange={budgetChange}
                />
              </div>
            </div>
            <div className="b">
              <div className="i">
                <Button
                  className="p-button-secondary"
                  label={t("shouts.create.send")}
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

export default ShoutCreate;
