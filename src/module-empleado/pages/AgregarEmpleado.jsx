import React, { useEffect, useState } from "react";
import { IndexLayout } from "../../layouts";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  Autocomplete,
  Button,
  Grid,
  MenuItem,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import dayjs from "dayjs";
import es from "date-fns/locale/es";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { addEmpleadoProvider } from "../../providers/empleado/providerEmpleado";
import { set } from "lodash";
import { AlertMessage, BreadCrumbsCustom, GoogleMaps } from "../../ui";
import {
  getEstadosProvider,
  getMunicipiosProvider,
} from "../../providers/estado/providerEstado";
import { getRolesProvider } from "../../providers/role/providerRole";
import { useNavigate } from "react-router-dom";
dayjs.locale("es");
const validationSchema = Yup.object({
  nombre_empleado: Yup.string().required("El nombre es requerido"),
  apellido_paterno_empleado: Yup.string().required(
    "El apellido paterno es requerido"
  ),
  apellido_materno_empleado: Yup.string().required(
    "El apellido materno es requerido"
  ),
  salario_empleado: Yup.number()
    .typeError("El salario debe ser un numero")
    .required("El salario es requerido"),
  comision_empleado: Yup.number()
    .typeError("La comisión debe ser un numero")
    .required("La comisión es requerido")
    .max(100, "La comisión no puede ser mayor a 100")
    .min(0, "La comisión no puede ser menor a 0"),
  fecha_ingreso_empleado: Yup.date().required(
    "La fecha de ingreso es requerida"
  ),
  fecha_nacimiento_empleado: Yup.date().required(
    "La fecha de nacimiento es requerida"
  ),
  celular_empleado: Yup.number()
    .typeError("El numero debe contener solo números")
    .test(
      "len",
      "El numero debe contener 10 dígitos",
      (val) => val && val.toString().length === 10
    )
    .required("El numero es obligatorio"),
  rfc_empleado: Yup.string()
    .matches(/^[A-Z]{4}\d{6}[A-Z0-9]{3}$/, "RFC inválido")
    .required("El RFC es requerido"),
  direccion: Yup.object({
    calle_direccion: Yup.string(),
    ciudad_direccion: Yup.string().required("La ciudad es requerida"),
    codigo_postal_direccion: Yup.number(),
    latitud_direccion: Yup.string(),
    longitud_direccion: Yup.string(),
    colonia_direccion: Yup.string().required("La colonia es requerida"),
    num_ext_direccion: Yup.string(),
    num_int_direccion: Yup.string(),
    url_maps_direccion: Yup.string(),
    id_municipio: Yup.number().required("El municipio es requerido"),
  }),
});
const initialValues = {
  nombre_empleado: "",
  apellido_paterno_empleado: "",
  apellido_materno_empleado: "",
  salario_empleado: "",
  comision_empleado: "",
  fecha_ingreso_empleado: new Date(),
  fecha_nacimiento_empleado: new Date(),
  celular_empleado: "",
  rfc_empleado: "",
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

export const AgregarEmpleado = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [rol, setRol] = useState([]);
  const [estados, setEstados] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [mapValues, setMapValues] = useState({
    latitud: "",
    longitud: "",
    url: "",
    codigoPostal: "",
  });

  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const getRoles = async () => {
    const { data } = await getRolesProvider();
    setRol(data?.roles);
  };

  const getMunicipio = async (id_estado) => {
    const { data } = await getMunicipiosProvider(id_estado);

    setMunicipios(data?.municipios);
  };

  const getEstados = async () => {
    const { data } = await getEstadosProvider();

    setEstados(data?.estados);
  };

  const onSubmit = async (values, e) => {
    values.fecha_ingreso_empleado = dayjs(values.fecha_ingreso_empleado).format(
      "YYYY-MM-DD"
    );
    values.fecha_nacimiento_empleado = dayjs(
      values.fecha_nacimiento_empleado
    ).format("YYYY-MM-DD");
    setIsLoading(true);
    setError(false);
    setOpen(false);
    const { data, ok, message } = await addEmpleadoProvider(values);
    if (ok) {
      setOpen(true);
      setError(false);
      setTimeout(() => {
        navigate("/empleado/inicio");
      }, 3000);
    } else {
      setError(true);
      setOpen(false);
    }

    setMessage(message);
    setIsLoading(false);
  };
  /* 
  const handleMapValuesChange = (newValues) => {
    setMapValues(newValues);
  }; */

  useEffect(() => {
    getRoles();
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

      <IndexLayout title={"Empleado"}>
        <BreadCrumbsCustom
          routes={[
            {
              name: "Empleados",
              url: "/empleado/inicio",
            },
            {
              name: "Agregar empleado",
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
                    <Typography variant="h6">Datos Personales</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Nombre"
                      name="nombre_empleado"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={
                        formik.touched.nombre_empleado &&
                        formik.errors.nombre_empleado
                          ? true
                          : false
                      }
                      helperText={<ErrorMessage name="nombre_empleado" />}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Apellido Paterno"
                      name="apellido_paterno_empleado"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={
                        formik.touched.apellido_paterno_empleado &&
                        formik.errors.apellido_paterno_empleado
                          ? true
                          : false
                      }
                      helperText={
                        <ErrorMessage name="apellido_paterno_empleado" />
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Apellido Materno"
                      name="apellido_materno_empleado"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={
                        formik.touched.apellido_materno_empleado &&
                        formik.errors.apellido_materno_empleado
                          ? true
                          : false
                      }
                      helperText={
                        <ErrorMessage name="apellido_materno_empleado" />
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="RFC"
                      name="rfc_empleado"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={
                        formik.touched.rfc_empleado &&
                        formik.errors.rfc_empleado
                          ? true
                          : false
                      }
                      helperText={<ErrorMessage name="rfc_empleado" />}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Salario"
                      name="salario_empleado"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      inputMode="numeric"
                      error={
                        formik.touched.salario_empleado &&
                        formik.errors.salario_empleado
                          ? true
                          : false
                      }
                      helperText={<ErrorMessage name="salario_empleado" />}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Comision"
                      name="comision_empleado"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={
                        formik.touched.comision_empleado &&
                        formik.errors.comision_empleado
                          ? true
                          : false
                      }
                      helperText={<ErrorMessage name="comision_empleado" />}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field name="fecha_ingreso_empleado">
                      {({ field, form }) => (
                        <LocalizationProvider
                          dateAdapter={AdapterDateFns}
                          adapterLocale={es}
                        >
                          <DatePicker
                            label="Fecha de ingreso"
                            name="fecha_ingreso_empleado"
                            value={field.value}
                            onChange={(date) =>
                              form.setFieldValue("fecha_ingreso_empleado", date)
                            }
                            error={
                              formik.touched.fecha_ingreso_empleado &&
                              formik.errors.fecha_ingreso_empleado
                                ? true
                                : false
                            }
                            helperText={
                              <ErrorMessage name="fecha_ingreso_empleado" />
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
                        </LocalizationProvider>
                      )}
                    </Field>
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
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Número de Celular"
                      name="celular_empleado"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={
                        formik.touched.celular_empleado &&
                        formik.errors.celular_empleado
                          ? true
                          : false
                      }
                      helperText={<ErrorMessage name="celular_empleado" />}
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
