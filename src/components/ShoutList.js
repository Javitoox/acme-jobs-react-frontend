import axios from "axios";
import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useTranslation } from "react-i18next";
import { ProgressBar } from "primereact/progressbar";
import { i18nNumber } from "./i18nNumber";

function ShoutList(props) {
  const { t, i18n } = useTranslation();

  const [errorConection, setErrorConection] = useState(null);

  const [state, setState] = useState({
    data: null,
  });

  function deleteErrorMessage() {
    setErrorConection(null);
  }

  useEffect(() => {
    axios
      .get(props.baseUrl + "/anonymous/shout/list?language=" + i18n.language)
      .then((res) => {
        i18nNumber(res.data, i18n.language)
        setState({ data: res.data });
      })
      .catch((error) => {
        setErrorConection(
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      {errorConection}
      <DataTable
        className="p-datatable-sm"
        paginator
        rows={5}
        value={state.data}
        header={t("shouts.name")}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" rowsPerPageOptions={[5,10,25,50]}
      >
        <Column
          sortable
          field="moment"
          header={t("shouts.list.moment")}
        ></Column>
        <Column
          sortable
          filter
          filterPlaceholder={t("shouts.list.search.author")}
          field="author"
          header={t("shouts.list.author")}
        ></Column>
        <Column
          sortable
          filter
          filterPlaceholder={t("shouts.list.search.text")}
          field="text"
          header={t("shouts.list.text")}
        ></Column>
         <Column
          sortable
          filter
          filterPlaceholder={t("shouts.list.search.budget")}
          field="budget"
          header={t("shouts.list.budget")}
        ></Column>
        <Column
          sortable
          filter
          filterPlaceholder={t("shouts.list.search.info")}
          field="info"
          header={t("shouts.list.info")}
        ></Column>
      </DataTable>
    </div>
  );
}

export default ShoutList;
