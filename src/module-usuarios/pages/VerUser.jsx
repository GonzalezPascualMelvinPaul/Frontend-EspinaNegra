import React from "react";
import { CustomModal } from "../../ui";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";

export const VerUser = ({ open = false, onClose = () => {}, user = {} }) => {
  return (
    <CustomModal open={open} onClose={onClose}>
      <Paper elevation={12} style={{ padding: "16px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Detalles del Usuario</Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="body1">
              <strong>ID:</strong> {user?.id}
            </Typography>
            <Typography variant="body1">
              <strong>Nombre:</strong> {user?.nombre} {user?.apellido_paterno}{" "}
              {user?.apellido_materno}
            </Typography>
            <Typography variant="body1">
              <strong>Correo electrónico:</strong> {user?.email}
            </Typography>
            <Typography variant="body1">
              <strong>Nombre de usuario:</strong> {user?.username}
            </Typography>
            <Typography variant="body1">
              <strong>Rol:</strong> {user?.nombre_rol}
            </Typography>
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
