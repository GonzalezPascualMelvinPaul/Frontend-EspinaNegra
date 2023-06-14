import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export const CustomTable = ({
  data = [],
  columns,
  idData,
  loading = false,
  colorRow = () => {},
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
      }}
    >
      <DataGrid
        loading={loading}
        scroll={{ x: isSmallScreen ? "scroll" : "auto", y: "auto" }}
        getRowId={(row) => row[idData]}
        disableSelectionOnClick
        rows={data}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        getRowClassName={colorRow}
        autoHeight
        sx={{
          border: "0px",
          "& .MuiDataGrid-columnHeaderTitleContainer": {
            justifyContent: "left",
          },
          "& .MuiDataGrid-cell--textLeft": {
            justifyContent: "left",
            align: "left",
          },
          "& .MuiDataGrid-cell": {
            outline: "none !important",
          },
          "& .MuiDataGrid-columnHeader": {
            outline: "none !important",
          },
        }}
      />
    </div>
  );
};
