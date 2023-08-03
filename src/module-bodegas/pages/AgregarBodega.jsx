import React, { useEffect, useState } from "react";

import * as Yup from "yup";
import { AlertMessage, BreadCrumbsCustom } from "../../ui";
import { IndexLayout } from "../../layouts";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  Alert,
  Autocomplete,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { addBodegaProvider } from "../../providers/bodega/providerBodega";
import { useNavigate } from "react-router-dom";
import { getEstadosProvider } from "../../providers/estado/providerEstado";

const validationSchema = Yup.object({
  nombre_bodega: Yup.string().required("El nombre de la bodega es requerido"),
  descripcion_bodega: Yup.string().required("La descripción es requerida"),
  capacidad_bodega: Yup.number().required(
    "La capacidad de la bodega es requerida"
  ),
  direccion: Yup.object({
    calle_direccion: Yup.string(),
    ciudad_direccion: Yup.string(),
    codigo_postal_direccion: Yup.number(),
    latitud_direccion: Yup.string(),
    longitud_direccion: Yup.string(),
    colonia_direccion: Yup.string(),
    num_ext_direccion: Yup.string(),
    num_int_direccion: Yup.string(),
    url_maps_direccion: Yup.string(),
    id_municipio: Yup.number(),
  }),
});

const initialValues = {
  nombre_bodega: "",
  descripcion_bodega: "",
  capacidad_bodega: "",
  direccion: {
    id_municipio: "",
    estado: "",
    calle_direccion: "",
    ciudad_direccion: "",
    codigo_postal_direccion: "",
    latitud_direccion: "",
    longitud_direccion: "",
    colonia_direccion: "",
    num_ext_direccion: "",
    num_int_direccion: "",
    url_maps_direccion: "",
  },
};

export const AgregarBodega = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [estados, setEstados] = useState();
  const [municipios, setMunicipios] = useState();

  const navigate = useNavigate();

  const getEstados = async () => {
    const { data } = await getEstadosProvider();
    setEstados(data?.estados);
  };

  const onSubmit = async (values, e) => {
    setIsLoading(true);
    setError(false);
    setOpen(false);
    console.log(values);
    const { data, ok, message } = await addBodegaProvider(values);
    if (ok) {
      setOpen(true);
      setError(false);
      setTimeout(() => {
        navigate("/bodega/inicio");
      }, 3000);
    } else {
      setError(true);
      setOpen(false);
    }
    setMessage(message);
    setIsLoading(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getEstados();
  }, []);

  return (
    <>
      <AlertMessage
        handleClose={handleClose}
        message={message}
        open={open}
        severity="success"
      />
      <IndexLayout title={"Bodega"}>
        <BreadCrumbsCustom
          routes={[
            {
              name: "Bodegas",
              url: "/bodega/inicio",
            },
            {
              name: "Agregar bodega",
              url: "",
            },
          ]}
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            useEffect(() => {
              if (estados && formik.values.direccion.estado) {
                const stateData = estados.find(
                  (state) => state.id_estado === formik.values.direccion.estado
                );
                if (stateData && stateData.municipio) {
                  setMunicipios(stateData.municipio);
                } else {
                  setMunicipios([]);
                }
              }
            }, [formik.values.direccion.estado, estados]);

            return (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <Typography variant="h6">Datos Bodega</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Nombre"
                      name="nombre_bodega"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={
                        formik.touched.nombre_bodega &&
                        formik.errors.nombre_bodega
                          ? true
                          : false
                      }
                      helperText={<ErrorMessage name="nombre_bodega" />}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Descripción"
                      name="descripcion_bodega"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={
                        formik.touched.descripcion_bodega &&
                        formik.errors.descripcion_bodega
                          ? true
                          : false
                      }
                      helperText={<ErrorMessage name="descripcion_bodega" />}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Capacidad Bodega"
                      name="capacidad_bodega"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={
                        formik.touched.capacidad_bodega &&
                        formik.errors.capacidad_bodega
                          ? true
                          : false
                      }
                      helperText={<ErrorMessage name="capacidad_bodega" />}
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Typography variant="h6">Dirección</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="País"
                      name="direccion.pais"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={
                        formik.touched.direccion?.pais &&
                        formik.errors.direccion?.pais
                          ? true
                          : false
                      }
                      helperText={<ErrorMessage name="direccion.pais" />}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Field name="direccion.estado">
                      {({ field, form }) => (
                        <Autocomplete
                          id="estado-select"
                          options={estados || []} // Verificar si estados es undefined y proporcionar una lista vacía en ese caso
                          sx={{
                            paddingTop: { xs: 2, md: 2 },
                            paddingBottom: { xs: 2, md: 2 },
                          }}
                          getOptionLabel={(option) => option.nombre_estado}
                          onChange={(event, newValue) => {
                            form.setFieldValue(
                              "direccion.estado",
                              newValue?.id_estado || ""
                            );
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Estado"
                              variant="outlined"
                              error={
                                formik.touched.direccion?.estado &&
                                formik.errors.direccion?.estado
                                  ? true
                                  : false
                              }
                            />
                          )}
                        />
                      )}
                    </Field>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Field name="direccion.id_municipio">
                      {({ field, form }) => (
                        <Autocomplete
                          sx={{
                            paddingTop: { xs: 2, md: 2 },
                            paddingBottom: { xs: 2, md: 2 },
                          }}
                          id="municipio-select"
                          options={municipios || []} // Verificar si municipios es undefined y proporcionar una lista vacía en ese caso
                          getOptionLabel={(option) => option.nombre_municipio}
                          disabled={!formik.values.direccion.estado}
                          onChange={(event, newValue) => {
                            form.setFieldValue(
                              "direccion.id_municipio",
                              newValue?.id_municipio || ""
                            );
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Municipio"
                              variant="outlined"
                              error={
                                formik.touched.direccion?.id_municipio &&
                                formik.errors.direccion?.id_municipio
                                  ? true
                                  : false
                              }
                            />
                          )}
                        />
                      )}
                    </Field>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Ciudad"
                      name="direccion.ciudad_direccion"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={
                        formik.touched.direccion?.ciudad_direccion &&
                        formik.errors.direccion?.ciudad_direccion
                          ? true
                          : false
                      }
                      helperText={
                        <ErrorMessage name="direccion.ciudad_direccion" />
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Colonia"
                      name="direccion.colonia_direccion"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={
                        formik.touched.direccion?.colonia_direccion &&
                        formik.errors.direccion?.colonia_direccion
                          ? true
                          : false
                      }
                      helperText={
                        <ErrorMessage name="direccion.colonia_direccion" />
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Calle"
                      name="direccion.calle_direccion"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={
                        formik.touched.direccion?.calle_direccion &&
                        formik.errors.direccion?.calle_direccion
                          ? true
                          : false
                      }
                      helperText={
                        <ErrorMessage name="direccion.calle_direccion" />
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="N. Ext"
                      name="direccion.num_ext_direccion"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={
                        formik.touched.direccion?.num_ext_direccion &&
                        formik.errors.direccion?.num_ext_direccion
                          ? true
                          : false
                      }
                      helperText={
                        <ErrorMessage name="direccion.num_ext_direccion" />
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="N. Int"
                      name="direccion.num_int_direccion"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={
                        formik.touched.direccion?.num_int_direccion &&
                        formik.errors.direccion?.num_int_direccion
                          ? true
                          : false
                      }
                      helperText={
                        <ErrorMessage name="direccion.num_ext_direccion" />
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Código Postal"
                      name="direccion.codigo_postal_direccion"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={
                        formik.touched.direccion?.codigo_postal_direccion &&
                        formik.errors.direccion?.codigo_postal_direccion
                          ? true
                          : false
                      }
                      helperText={
                        <ErrorMessage name="direccion.codigo_postal_direccion" />
                      }
                      InputProps={{
                        inputProps: {
                          maxLength: 5,
                        },
                      }}
                      inputMode="numeric"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Latitud"
                      name="direccion.latitud_direccion"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={
                        formik.touched.direccion?.latitud_direccion &&
                        formik.errors.direccion?.latitud_direccion
                          ? true
                          : false
                      }
                      helperText={
                        <ErrorMessage name="direccion.latitud_direccion" />
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Longitud"
                      name="direccion.longitud_direccion"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={
                        formik.touched.direccion?.longitud_direccion &&
                        formik.errors.direccion?.longitud_direccion
                          ? true
                          : false
                      }
                      helperText={
                        <ErrorMessage name="direccion.longitud_direccion" />
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="URL Maps"
                      name="direccion.url_maps_direccion"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={
                        formik.touched.direccion?.url_maps_direccion &&
                        formik.errors.direccion?.url_maps_direccion
                          ? true
                          : false
                      }
                      helperText={
                        <ErrorMessage name="direccion.url_maps_direccion" />
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    {error ? (
                      <Alert sx={{ mt: 0, mb: 0 }} severity="error">
                        {message}
                      </Alert>
                    ) : (
                      ""
                    )}
                    {isLoading && !error ? (
                      <Alert sx={{ mt: 0, mb: 0 }} severity="success">
                        Enviando datos...
                      </Alert>
                    ) : (
                      ""
                    )}
                  </Grid>
                  <Grid
                    display={"flex"}
                    justifyContent={"end"}
                    item
                    xs={12}
                    md={12}
                    sx={{ mb: "2rem" }}
                  >
                    <Button type="submit" variant="contained">
                      Crear
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </IndexLayout>
    </>
  );
};
