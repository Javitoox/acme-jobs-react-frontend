import "./App.css";
import React, { useState } from "react";
import ShoutList from "./components/ShoutList";
import ShoutCreate from "./components/ShoutCreate";
import { Splitter, SplitterPanel } from "primereact/splitter";
import PanelZone from "./components/PanelZone";
import { useTranslation } from "react-i18next";
import { Button } from "primereact/button";

function App() {
  const { t, i18n } = useTranslation();

  const baseUrl = "http://localhost:8080/Acme-Work-Plans/api";

  const [state, setState] = useState({
    shoutList: null,
    shoutCreate: null,
  });

  function shoutList(data) {
    setState({ shoutList: data });
  }

  function shoutCreate(data) {
    setState({ shoutCreate: data });
  }

  function translateClick(lang) {
    i18n.changeLanguage(lang);
  }

  return (
    <div>
      <h5 className="p-d-flex p-ai-center p-jc-center">{t("panel.title")}</h5>
      <Splitter style={{ height: "50px" }} className="p-mb-5">
        <SplitterPanel>
          <PanelZone
            name={t("shouts.list.name")}
            action={<ShoutList baseUrl={baseUrl}></ShoutList>}
            onShow={shoutList}
            data={state.shoutList}
          ></PanelZone>
        </SplitterPanel>
        <SplitterPanel>
          <PanelZone
            name={t("shouts.create.name")}
            action={<ShoutCreate baseUrl={baseUrl}></ShoutCreate>}
            onShow={shoutCreate}
            data={state.shoutCreate}
          ></PanelZone>
        </SplitterPanel>
      </Splitter>
      <div>
        {state.shoutList}
        {state.shoutCreate}
      </div>
      <h6 style={{ marginLeft: "10px", marginTop: "10px" }}>
        {t("languages.title")}
      </h6>
      <div className="demo-container p-p-2">
        <Button
          icon="pi pi-fw pi-globe"
          className="p-button-raised p-button-secondary p-button-text p-d-block"
          label={t("languages.es")}
          onClick={() => {
            translateClick("es");
            setState({ shoutList: null, shoutCreate: null });
          }}
        ></Button>
        <Button
          icon="pi pi-fw pi-globe"
          className="p-button-raised p-button-secondary p-button-text"
          label={t("languages.en")}
          onClick={() => {
            translateClick("en");
            setState({ shoutList: null, shoutCreate: null });
          }}
        ></Button>
      </div>
    </div>
  );
}

export default App;
