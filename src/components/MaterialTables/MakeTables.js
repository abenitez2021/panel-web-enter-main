import React from "react";
import { useRef } from "react";
import MaterialTable from "material-table";
import Localizacion from "./Localization";
import TableIcons from "./TableIcons";


import TableComponents from "./TableComponents";

export function MakeTables({
  title,
  columns,
  data,
  actions,
  icons,
  options,
  classes,
  detailPanel,
  editable,
  componentsAssets,
  isLoading,
  onRowClick,
  onSearchChange,
  onChangePage,
  onChangeRowsPerPage
}) {
  const { current: defaultIcons } = useRef(TableIcons);

  const { current: localization } = useRef(Localizacion);

  const { current: defaultOptions } = useRef({
    filtering: true,
    exportButton: true,
    exportAllData: true,
    grouping: true,
    pageSize: 10,
    pageSizeOptions: [5, 10, 20, 50, 100],
  });

  const components = TableComponents(componentsAssets);

  return (
    <MaterialTable
      title={title}
      columns={columns}
      data={data}
      isLoading={isLoading}
      icons={icons ? icons : defaultIcons}
      options={options ? options : defaultOptions}
      localization={localization}
      actions={actions}
      components={components}
      detailPanel={detailPanel}
      editable={editable}
      className={classes.root}
      onRowClick={onRowClick}
      onSearchChange={onSearchChange}
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
    />
  );
}

export function GetLookups(lookups, name, origin) {
  if (lookups && name) {
    switch (origin) {
      case "lookup":
        var mapped = lookups.values[name].map((x) => {
          return { [x.value]: x.label };
        });
        return Object.assign({}, ...mapped);
      case "other":
        return Object.assign(
          {},
          ...[...new Set(lookups.map((value) => value[name]))].map((value) => {
            return { [value]: value };
          })
        );
      default:
        var mappedDefault = lookups.values[name].map((x) => {
          return { [x.value]: x.label };
        });
        return Object.assign({}, ...mappedDefault);
    }
  } else {
    return {};
  }
}

export default MakeTables;
