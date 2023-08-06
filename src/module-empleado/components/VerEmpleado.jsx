import React from "react";
import { CustomModal } from "../../ui";
import { Button, Grid, Link, Paper, Typography } from "@mui/material";

export const VerEmpleado = ({
  open = false,
  onClose = () => {},
  empleado = {},
}) => {
  return (
    <CustomModal open={open} onClose={onClose}>
      <Paper elevation={12} style={{ padding: "16px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Detalles del Empleado</Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="body1">
              <strong>ID:</strong> {empleado?.id_empleado}
            </Typography>
            <Typography variant="body1">
              <strong>Codigo Empleado:</strong>{" "}
              {empleado?.codigo_empleado
                ? empleado.codigo_empleado.toUpperCase()
                : ""}
            </Typography>
            <Typography variant="body1">
              <strong>Nombre:</strong> {empleado?.nombre_empleado}{" "}
              {empleado?.apellido_paterno_empleado}{" "}
              {empleado?.apellido_materno_empleado}
            </Typography>
            <Typography variant="body1">
              <strong>Fecha de Nacimiento:</strong>{" "}
              {empleado?.fecha_ingreso_empleado}
            </Typography>
            <Typography variant="body1">
              <strong>RFC:</strong> {empleado?.rfc_empleado}
            </Typography>
            <Typography variant="body1">
              <strong>Celular:</strong> {empleado?.celular_empleado}
            </Typography>
            <Typography variant="body1">
              <strong>Salario:</strong> {empleado?.salario_empleado}
            </Typography>
            <Typography variant="body1">
              <strong>Comision:</strong> {empleado?.comision_empleado}
            </Typography>
            <Typography variant="body1">
              <strong>Fecha de Ingreso:</strong>{" "}
              {empleado?.fecha_ingreso_empleado}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Dirección del Empleado</Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography variant="body1">
              <strong>Dirección:</strong> {empleado?.direccion?.calle_direccion}
              {", "}
              {empleado?.direccion?.colonia_direccion}
              {", "}
              {empleado?.direccion?.ciudad_direccion}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              <strong>Url ubicación:</strong>{" "}
              <Link
                href={empleado?.direccion?.url_maps_direccion}
                target="_blank"
              >
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
