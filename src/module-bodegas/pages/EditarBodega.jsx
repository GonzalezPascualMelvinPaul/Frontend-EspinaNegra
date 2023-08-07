import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  getBodegaProvider,
  updateBodegaProvider,
} from "../../providers/bodega/providerBodega";
import { AlertMessage, BreadCrumbsCustom, GoogleMaps } from "../../ui";
import { IndexLayout } from "../../layouts";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  Alert,
  Autocomplete,
  Button,
  Grid,
  MenuItem,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import {
  getEstadosProvider,
  getMunicipiosProvider,
} from "../../providers/estado/providerEstado";

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

export const EditarBodega = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isLoadingMunicipio, setIsLoadingMunicipio] = useState(false);

  const [open, setOpen] = useState(false);
  const [bodega, setBodega] = useState([]);
  const [estados, setEstados] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [mapValues, setMapValues] = useState({
    latitud: "",
    longitud: "",
    url: "",
    codigoPostal: "",
  });
  const { id } = useParams();

  const navigate = useNavigate();
  const getEstados = async () => {
    const { data } = await getEstadosProvider();
    setEstados(data?.estados);
  };

  const getMunicipio = async (id_estado) => {
    const { ok, data } = await getMunicipiosProvider(id_estado);
    if (ok) {
      setIsLoadingMunicipio(true);
    } else {
      setIsLoadingMunicipio(false);
    }
    setMunicipios(data?.municipios);
  };

  const getBodega = async () => {
    const { data, ok } = await getBodegaProvider(id);
    if (ok) {
      setIsLoadingData(true);
      getMunicipio(data?.direccion?.id_estado);
    } else {
      setIsLoadingData(false);
    }
    console.log(data);
    setBodega(data);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getBodega();
    getEstados();
  }, []);

  const onSubmit = async (values, e) => {
    setIsLoading(true);
    setError(false);
    setOpen(false);
    const { ok, data, message } = await updateBodegaProvider(values, id);
    if (ok) {
      setOpen(true);
      setError(false);
      setTimeout(() => {
        navigate("/bodega/inicio");
      }, 300);
    } else {
      setError(true);
      setOpen(false);
    }
    setMessage(message);
    setIsLoading(false);
  };

  const initialValues = {
    nombre_bodega: bodega?.nombre_bodega || "",
    descripcion_bodega: bodega?.descripcion_bodega || "",
    capacidad_bodega: bodega?.capacidad_bodega || "",
    direccion: {
      id_municipio: bodega?.direccion?.id_municipio || "",
      estado: bodega?.direccion?.id_estado || "",
      calle_direccion: bodega?.direccion?.calle_direccion || "",
      ciudad_direccion: bodega?.direccion?.ciudad_direccion || "",
      codigo_postal_direccion: bodega?.direccion?.codigo_postal_direccion || "",
      latitud_direccion: bodega?.direccion?.latitud_direccion || "",
      longitud_direccion: bodega?.direccion?.longitud_direccion || "",
      colonia_direccion: bodega?.direccion?.colonia_direccion || "",
      num_ext_direccion: bodega?.direccion?.num_ext_direccion || "",
      num_int_direccion: bodega?.direccion?.num_int_direccion || "",
      url_maps_direccion: bodega?.direccion?.url_maps_direccion || "",
    },
  };

  return (
    <>
      <AlertMessage
        handleClose={handleClose}
        message={message}
        open={open}
        severity="info"
      />
      <IndexLayout title={"Bodega"}>
        <BreadCrumbsCustom
          routes={[
            {
              name: "Bodegas",
              url: "/bodega/inicio",
            },
            {
              name: "Editar Bodega",
              url: "",
            },
          ]}
        />

        {isLoadingData == false && isLoadingMunicipio == false ? (
          <>
            <Skeleton variant="rectangular" width={"100%"} height={"80%"} />
          </>
        ) : (
          <>
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
                          helperText={
                            <ErrorMessage name="descripcion_bodega" />
                          }
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
                              {...field}
                              sx={{
                                paddingTop: { xs: 2, md: 2 },
                                paddingBottom: { xs: 2, md: 2 },
                              }}
                              id="id_municipio"
                              options={municipios || []}
                              value={
                                municipios.find(
                                  (option) =>
                                    option.id_municipio === field.value
                                ) || ""
                              }
                              getOptionLabel={(option) =>
                                option.nombre_municipio || ""
                              }
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
                        <GoogleMaps
                          latitud={initialValues?.direccion?.latitud_direccion}
                          longitud={
                            initialValues?.direccion?.longitud_direccion
                          }
                          onMapValuesChange={handleMapValuesChange}
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
                          Editar
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
          </>
        )}
      </IndexLayout>
    </>
  );
};
