import React, { useEffect, useState } from "react";

import * as Yup from "yup";
import { AlertMessage, BreadCrumbsCustom, GoogleMaps } from "../../ui";
import { IndexLayout } from "../../layouts";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  Alert,
  Autocomplete,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { addProveedorProvider } from "../../providers/proveedor/providerProveedor";
import { useNavigate } from "react-router-dom";
import {
  getEstadosProvider,
  getMunicipiosProvider,
} from "../../providers/estado/providerEstado";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { es } from "date-fns/locale";
import dayjs from "dayjs";
import RfcFacil from "rfc-facil";
dayjs.locale("es");
const validationSchema = Yup.object({
  email_proveedor: Yup.string().required("El email es requerido"),
  celular_proveedor: Yup.number()
    .typeError("El numero debe contener solo números")
    .test(
      "len",
      "El numero debe contener 10 dígitos",
      (val) => val && val.toString().length === 10
    )
    .required("El numero es obligatorio"),
  fecha_nacimiento_empleado: Yup.date().required(
    "La fecha de nacimiento es requerida"
  ),
  persona_fisica: Yup.object({
    nombre_persona_fisica: Yup.string()
      .required("El nombre es requerido")
      .matches("^[A-Za-z\\s]+$", "Solo se acepta letras sin tildes"),
    apellido_materno_persona_fisica: Yup.string()
      .required("El apellido materno es requerido")
      .matches("^[A-Za-z\\s]+$", "Solo se acepta letras sin tildes"),
    apellido_paterno_persona_fisica: Yup.string()
      .required("El apellido paterno es requerido")
      .matches("^[A-Za-z\\s]+$", "Solo se acepta letras sin tildes"),
    rfc_persona_fisica: Yup.string()
      .matches(/^[A-Z]{4}\d{6}[A-Z0-9]{3}$/, "RFC inválido")
      .required("El rfc es requerido"),
  }),
  direccion: Yup.object({
    calle_direccion: Yup.string().required("La calle es requerida"),
    ciudad_direccion: Yup.string().required("La ciudad es requerida"),
    codigo_postal_direccion: Yup.number().required(
      "El codigo postal es requerido"
    ),
    latitud_direccion: Yup.string().required(
      "La latitud de direccion es requerido"
    ),
    longitud_direccion: Yup.string().required(
      "La longitud de direccion es requerido"
    ),
    colonia_direccion: Yup.string().required("La colonia es requerida"),
    num_ext_direccion: Yup.string().required("El numero exterior es requerido"),
    num_int_direccion: Yup.string().required("El numero int es requerido"),
    url_maps_direccion: Yup.string().required("El url maps es requerido"),
    id_municipio: Yup.number().required("El municipio es requerido"),
  }),
});

const initialValues = {
  email_proveedor: "",
  celular_proveedor: "",
  fecha_nacimiento_empleado: dayjs().subtract(18, "years").toDate(),
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

export const AgregarProveedor = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [estados, setEstados] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [mapValues, setMapValues] = useState({
    latitud: "",
    longitud: "",
    url: "",
    codigoPostal: "",
  });
  const [suggestedDomains, setSuggestedDomains] = useState([
    "example.com",
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "itoaxaca.edu.mx",
    // Agrega más dominios aquí...
  ]);
  const navigate = useNavigate();

  const getEstados = async () => {
    const { data } = await getEstadosProvider();
    setEstados(data?.estados);
  };

  const getMunicipio = async (id_estado) => {
    const { data } = await getMunicipiosProvider(id_estado);

    setMunicipios(data?.municipios);
  };

  const onSubmit = async (values, e) => {
    setIsLoading(true);
    setError(false);
    setOpen(false);
    const { data, ok, message } = await addProveedorProvider(values);

    if (ok) {
      setOpen(true);
      setError(false);
      setTimeout(() => {
        navigate("/proveedor/inicio");
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

  const handleEmailChange = (formik, inputValue) => {
    const atIndex = inputValue.indexOf("@");
    const username = atIndex !== -1 ? inputValue.slice(0, atIndex) : inputValue;
    formik.setFieldValue("email_proveedor", username);
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
      <IndexLayout title={"Proveedor"}>
        <BreadCrumbsCustom
          routes={[
            {
              name: "Proveedores",
              url: "/proveedor/inicio",
            },
            {
              name: "Agregar proveedor",
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
            const calcularRFC = (
              nombre,
              apellidoPaterno,
              apellidoMaterno,
              fechaNacimiento
            ) => {
              const dia = fechaNacimiento.getDate();
              const mes = fechaNacimiento.getMonth() + 1; // ¡Recuerda que los meses son indexados en base 0!
              const anio = fechaNacimiento.getFullYear();

              const rfc = RfcFacil.forNaturalPerson({
                name: nombre,
                firstLastName: apellidoPaterno,
                secondLastName: apellidoMaterno,
                day: dia,
                month: mes,
                year: anio,
              });

              formik.setFieldValue("persona_fisica.rfc_persona_fisica", rfc);
            };

            const handleMapValuesChange = (newValues) => {
              setMapValues(newValues);

              formik.setFieldValue(
                "direccion.codigo_postal_direccion",
                newValues.codigoPostal
              );
              formik.setFieldValue(
                "direccion.latitud_direccion",
                newValues.latitud
              );
              formik.setFieldValue(
                "direccion.longitud_direccion",
                newValues.longitud
              );
              formik.setFieldValue(
                "direccion.url_maps_direccion",
                newValues.url
              );
            };
            return (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <Typography variant="h6">Datos Proveedor</Typography>
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
                    <Field name="fecha_nacimiento_empleado">
                      {({ field, form }) => (
                        <LocalizationProvider
                          dateAdapter={AdapterDateFns}
                          adapterLocale={es}
                        >
                          <DatePicker
                            label="Fecha de nacimiento"
                            name="fecha_nacimiento_empleado"
                            value={field.value}
                            maxDate={dayjs().subtract(18, "year").toDate()}
                            onChange={(date) =>
                              form.setFieldValue(
                                "fecha_nacimiento_empleado",
                                date
                              )
                            }
                            error={
                              formik.touched.fecha_nacimiento_empleado &&
                              formik.errors.fecha_nacimiento_empleado
                                ? true
                                : false
                            }
                            helperText={
                              <ErrorMessage name="fecha_nacimiento_empleado" />
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="outlined"
                                fullWidth
                                margin="normal"
                              />
                            )}
                          />
                          <ErrorMessage name="fecha_nacimiento_empleado" />
                        </LocalizationProvider>
                      )}
                    </Field>
                  </Grid>
                  <Grid
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    item
                    xs={12}
                    md={6}
                  >
                    <Button
                      onClick={() =>
                        calcularRFC(
                          formik.values.persona_fisica.nombre_persona_fisica,
                          formik.values.persona_fisica
                            .apellido_paterno_persona_fisica,
                          formik.values.persona_fisica
                            .apellido_materno_persona_fisica,
                          formik.values.fecha_nacimiento_empleado
                        )
                      }
                      variant="contained"
                    >
                      Calcular RFC
                    </Button>
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
                  <Grid item xs={12} md={6}>
                    <Field name="email_proveedor">
                      {({ field }) => (
                        <Autocomplete
                          freeSolo
                          options={suggestedDomains.map(
                            (domain) => field.value + "@" + domain
                          )}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Email"
                              variant="outlined"
                              fullWidth
                              margin="normal"
                              error={
                                formik.touched.email_proveedor &&
                                formik.errors.email_proveedor
                              }
                              helperText={
                                <ErrorMessage name="email_proveedor" />
                              }
                              onChange={(event) => {
                                handleEmailChange(formik, event.target.value);
                              }}
                            />
                          )}
                        />
                      )}
                    </Field>

                    {/*  <Field
                      as={TextField}
                      label="Email"
                      name="email_proveedor"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={
                        formik.touched.email_proveedor &&
                        formik.errors.email_proveedor
                          ? true
                          : false
                      }
                      helperText={<ErrorMessage name="email_proveedor" />}
                    /> */}
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Número de celular"
                      name="celular_proveedor"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={
                        formik.touched.celular_proveedor &&
                        formik.errors.celular_proveedor
                          ? true
                          : false
                      }
                      helperText={<ErrorMessage name="celular_proveedor" />}
                      InputProps={{
                        inputProps: {
                          maxLength: 10,
                        },
                      }}
                      inputMode="numeric"
                    />
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <Typography variant="h6">Dirección</Typography>
                  </Grid>

                  <Grid item xs={12} md={6} sm={6}>
                    <Field
                      as={TextField}
                      label="Estado"
                      name="direccion.estado"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      select
                      error={
                        formik.touched.direccion?.estado &&
                        formik.errors.direccion?.estado
                          ? true
                          : false
                      }
                      helperText={<ErrorMessage name="direccion.estado" />}
                      onChange={(e) => {
                        const selectedEstadoId = e.target.value;
                        formik.handleChange(e);

                        getMunicipio(selectedEstadoId); // Llamar a la función para cargar los municipios
                      }}
                    >
                      {estados.map((option) => (
                        <MenuItem
                          key={option.id_estado}
                          value={option.id_estado}
                        >
                          {option.nombre_estado}
                        </MenuItem>
                      ))}
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
                          id="id_municipio"
                          options={municipios || []}
                          getOptionLabel={(option) => option.nombre_municipio}
                          disabled={!formik.values.direccion.estado}
                          onChange={(event, newValue) => {
                            form.setFieldValue(
                              "direccion.id_municipio",
                              newValue?.id_municipio || ""
                            );
                          }}
                          fullWidth
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
                              helperText={
                                <ErrorMessage name="direccion.id_municipio" />
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
                  <Grid item xs={12}>
                    <GoogleMaps onMapValuesChange={handleMapValuesChange} />
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
