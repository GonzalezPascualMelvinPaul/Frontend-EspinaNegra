import { Alert, Snackbar, Stack } from "@mui/material";
import React from "react";

export const AlertMessage = ({
  open = false,
  handleClose = () => {},
  message = "",
  severity = "",
}) => {
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};
