import {
  ScreenSearchDesktop,
  SearchOffOutlined,
  SearchOutlined,
} from "@mui/icons-material";
import { Box, InputAdornment, TextField } from "@mui/material";
import React from "react";

export const Buscador = ({
  name = "",
  buscador = "",
  placeholder = "Buscador",
  label = "Buscador",
  handleSearch = () => {},
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        mt: 0,
        mb: 0,
        height: "70px",
        display: "flex",
        flexDirection: { md: "row", xs: "column" },
        alignItems: "center",
        alignContent: "center",
        justifyItems: "center",
        justifyContent: "end",
      }}
    >
      <TextField
        size="small"
        value={buscador}
        onChange={handleSearch}
        placeholder={placeholder}
        sx={{
          width: "300px",
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchOutlined />
            </InputAdornment>
          ),
        }}
        label={label}
        variant="outlined"
        name="nameField"
        id="nameField"
      ></TextField>
    </Box>
  );
};
