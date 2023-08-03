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
import { addClienteProvider } from "../../providers/cliente/providerCliente";
import { useNavigate } from "react-router-dom";
import { getEstadosProvider } from "../../providers/estado/providerEstado";

const validationSchema = Yup.object({
  email_cliente: Yup.string().required("El email es requerido"),
  celular_cliente: Yup.number()
    .typeError("El numero debe contener solo números")
    .test(
      "len",
      "El numero debe contener 10 dígitos",
      (val) => val && val.toString().length === 10
    )
    .required("El numero es obligatorio"),
  persona_fisica: Yup.object({
    nombre_persona_fisica: Yup.string().required("El nombre es requerido"),
    apellido_materno_persona_fisica: Yup.string().required(
      "El apellido materno es requerido"
    ),
    apellido_paterno_persona_fisica: Yup.string().required(
      "El apellido paterno es requerido"
    ),
    rfc_persona_fisica: Yup.string().required("El rfc es requerido"),
  }),
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
  email_cliente: "",
  celular_cliente: "",

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
  persona_fisica: {
    nombre_persona_fisica: "",
    apellido_paterno_persona_fisica: "",
    apellido_materno_persona_fisica: "",
    rfc_persona_fisica: "",
  },
};

export const AgregarCliente = () => {
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
    const { data, ok, message } = await addClienteProvider(values);
    if (ok) {
      setOpen(true);
      setError(false);
      setTimeout(() => {
        navigate("/cliente/inicio");
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
      <IndexLayout title={"Cliente"}>
        <BreadCrumbsCustom
          routes={[
            {
              name: "Clientes",
              url: "/cliente/inicio",
            },
            {
              name: "Agregar cliente",
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
                    <Typography variant="h6">Datos Cliente</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Nombre"
                      name="persona_fisica.nombre_persona_fisica"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={
                        formik.touched.persona_fisica?.nombre_persona_fisica &&
                        formik.errors.persona_fisica?.nombre_persona_fisica
                          ? true
                          : false
                      }
                      helperText={
                        <ErrorMessage name="persona_fisica.nombre_persona_fisica" />
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Apellido Paterno"
                      name="persona_fisica.apellido_paterno_persona_fisica"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={
                        formik.touched.persona_fisica
                          ?.apellido_paterno_persona_fisica &&
                        formik.errors.persona_fisica
                          ?.apellido_paterno_persona_fisica
                          ? true
                          : false
                      }
                      helperText={
                        <ErrorMessage name="persona_fisica.apellido_paterno_persona_fisica" />
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Apellido Materno"
                      name="persona_fisica.apellido_materno_persona_fisica"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={
                        formik.touched.persona_fisica
                          ?.apellido_materno_persona_fisica &&
                        formik.errors.persona_fisica
                          ?.apellido_materno_persona_fisica
                          ? true
                          : false
                      }
                      helperText={
                        <ErrorMessage name="persona_fisica.apellido_materno_persona_fisica" />
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Email"
                      name="email_cliente"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={
                        formik.touched.email_cliente &&
                        formik.errors.email_cliente
                          ? true
                          : false
                      }
                      helperText={<ErrorMessage name="email_cliente" />}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Número de celular"
                      name="celular_cliente"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={
                        formik.touched.celular_cliente &&
                        formik.errors.celular_cliente
                          ? true
                          : false
                      }
                      helperText={<ErrorMessage name="celular_cliente" />}
                      InputProps={{
                        inputProps: {
                          maxLength: 10,
                        },
                      }}
                      inputMode="numeric"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="RFC"
                      name="persona_fisica.rfc_persona_fisica"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={
                        formik.touched.persona_fisica?.rfc_persona_fisica &&
                        formik.errors.persona_fisica?.rfc_persona_fisica
                          ? true
                          : false
                      }
                      helperText={
                        <ErrorMessage name="persona_fisica.rfc_persona_fisica" />
                      }
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
