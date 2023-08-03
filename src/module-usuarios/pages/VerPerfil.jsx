import { Avatar, Box, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { IndexLayout } from "../../layouts";
import { useSelector } from "react-redux";
import { getEnvVariables } from "../../helpers/getEnvVariables";

export const VerPerfil = () => {
  const { user } = useSelector((state) => state.auth);
  const { VITE_API_URL_IMAGE } = getEnvVariables();
  const initialValues = {
    username: user?.username_usuario || "",
    nombre: user?.nombre_empleado || "",
    apellido_paterno: user?.apellido_paterno_empleado || "",
    apellido_materno: user?.apellido_materno_empleado || "",
    email: user?.email_usuario || "",
    nombre_role: user?.nombre_rol || "",
    imagen: user?.imagen_usuario || "",
  };
  return (
    <>
      <Box>
        <IndexLayout title={""}>
          <Box sx={{ minWidth: 275 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Avatar
                  alt={initialValues.nombre}
                  src={`${VITE_API_URL_IMAGE}${initialValues.imagen}`}
                  sx={{ width: 100, height: 100 }}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="h5" component="div">
                  {initialValues.nombre} {initialValues.apellido_paterno}{" "}
                  {initialValues.apellido_materno}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  {initialValues.nombre_role}
                </Typography>
                <TextField
                  label="Username"
                  value={initialValues.username}
                  variant="outlined"
                  fullWidth
                  disabled
                  margin="normal"
                />
                <TextField
                  label="Email"
                  value={initialValues.email}
                  variant="outlined"
                  fullWidth
                  disabled
                  margin="normal"
                />
              </Grid>
            </Grid>
          </Box>
        </IndexLayout>
      </Box>
    </>
  );
};
