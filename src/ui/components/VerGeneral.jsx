import React from "react";
import { CustomModal } from "..";
import { Button, Grid, Link, Paper, Typography } from "@mui/material";

export const VerGeneral = ({
  open = false,
  titulo = false,
  onClose = () => {},
  datos = {},
  names = [],
  key,
}) => {
  return (
    <CustomModal key={key} open={open} onClose={onClose}>
      <Paper elevation={12} style={{ padding: "16px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">{titulo}</Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            {names.map(({ name, title }) => (
              <>
                <Typography variant="body1" marginBottom={1}>
                  <strong>{title}:</strong>{" "}
                  {datos && (datos[name] ? datos[name] : "----")}
                </Typography>
              </>
            ))}
          </Grid>
        </Grid>
      </Paper>
      <br />
      <Button variant="contained" onClick={onClose} color="error">
        Cerrar
      </Button>
    </CustomModal>
  );
};
