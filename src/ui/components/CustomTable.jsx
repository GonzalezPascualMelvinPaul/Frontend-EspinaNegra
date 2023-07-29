import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box } from "@mui/material";

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
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row[idData]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
      {/* <DataGrid
        loading={loading}
        scroll={{ x: isSmallScreen ? "scroll" : "auto", y: "auto" }}
       
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
      /> */}
    </Box>
  );
};
