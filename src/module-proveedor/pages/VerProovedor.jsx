import React from "react";
import { CustomModal } from "../../ui";
import { Button, Grid, Link, Paper, Typography } from "@mui/material";

export const VerProovedor = ({
  open = false,
  onClose = () => {},
  proveedor = {},
}) => {
  return (
    <CustomModal open={open} onClose={onClose}>
      <Paper elevation={12} style={{ padding: "16px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Detalles del Proveedor</Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="body1">
              <strong>ID:</strong> {proveedor?.id_proveedor}
            </Typography>

            <Typography variant="body1">
              <strong>Nombre:</strong> {proveedor?.nombre_persona_fisica}{" "}
              {proveedor?.apellido_paterno_persona_fisica}{" "}
              {proveedor?.apellido_materno_persona_fisica}
            </Typography>
            <Typography variant="body1">
              <strong>Correo electrónico:</strong> {proveedor?.email_proveedor}
            </Typography>
            <Typography variant="body1">
              <strong>RFC:</strong> {proveedor?.rfc_persona_fisica}
            </Typography>
            <Typography variant="body1">
              <strong>Celular:</strong> {proveedor?.celular_proveedor}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Dirección del Proveedor</Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="body1">
              <strong>Dirección:</strong> {proveedor?.calle_direccion}
              {", "}
              {proveedor?.colonia_direccion}
              {", "}
              {proveedor?.ciudad_direccion}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              <strong>Url ubicación:</strong>{" "}
              <Link href={proveedor?.url_maps_direccion} target="_blank">
                Link de ubicación
              </Link>
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
