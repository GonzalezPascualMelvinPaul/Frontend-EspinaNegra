import React, { useState } from "react";
import dayjs from "dayjs";
import es from "date-fns/locale/es";
import * as Yup from "yup";
import { AlertMessage, BreadCrumbsCustom } from "../../ui";
import { IndexLayout } from "../../layouts";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  Alert,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useNavigate } from "react-router-dom";
import { addEnvasadoProvider } from "../../providers/envasado/providerEnvasado";
dayjs.locale("es");

const validationSchema = Yup.object({
  fecha_inicio_envasado: Yup.date().required("La fecha de inicio es requerida"),
  fecha_final_envasado: Yup.date().required("La fecha final es requerida"),
  descripcion_envasado: Yup.string().required("La descripción es requerida"),
});

const initialValues = {
  fecha_inicio_envasado: new Date(),
  fecha_final_envasado: new Date(),
  descripcion_envasado: "",
};

export const AgregarEnvasado = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = async (values, e) => {
    values.fecha_inicio_envasado = dayjs(values.fecha_inicio_envasado).format(
      "YYYY-MM-DD"
    );
    values.fecha_final_envasado = dayjs(values.fecha_final_envasado).format(
      "YYYY-MM-DD"
    );
    setIsLoading(true);
    setError(false);
    setOpen(false);
    console.log("Values", values);
    const { data, ok, message } = await addEnvasadoProvider(values);
    if (ok) {
      setOpen(true);
      setError(false);
      setTimeout(() => {
        navigate("/envasado/inicio");
      }, 3000);
    } else {
      setError(true);
      setOpen(false);
    }
    console.log(message);
    setMessage(message);
    setIsLoading(false);
  };
  return (
    <>
      <AlertMessage
        handleClose={handleClose}
        message={message}
        open={open}
        severity="success"
      />
      <IndexLayout title={"Envasado"}>
        <BreadCrumbsCustom
          routes={[
            {
              name: "Envasados",
              url: "/envasado/inicio",
            },
            {
              name: "Agregar envasado",
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
            return (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <Typography variant="h6">Datos del Envasado</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field name="fecha_inicio_envasado">
                      {({ field, form }) => (
                        <LocalizationProvider
                          dateAdapter={AdapterDateFns}
                          adapterLocale={es}
                        >
                          <DatePicker
                            label="Fecha de inicio"
                            name="fecha_inicio_envasado"
                            value={field.value}
                            onChange={(date) =>
                              form.setFieldValue("fecha_inicio_envasado", date)
                            }
                            error={
                              formik.touched.fecha_inicio_envasado &&
                              formik.errors.fecha_inicio_envasado
                                ? true
                                : false
                            }
                            helperText={
                              <ErrorMessage name="fecha_inicio_envasado" />
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
                    <Field name="fecha_final_envasado">
                      {({ field, form }) => (
                        <LocalizationProvider
                          dateAdapter={AdapterDateFns}
                          adapterLocale={es}
                        >
                          <DatePicker
                            label="Fecha final"
                            name="fecha_final_envasado"
                            value={field.value}
                            onChange={(date) =>
                              form.setFieldValue("fecha_final_envasado", date)
                            }
                            error={
                              formik.touched.fecha_final_envasado &&
                              formik.errors.fecha_final_envasado
                                ? true
                                : false
                            }
                            helperText={
                              <ErrorMessage name="fecha_final_envasado" />
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
                    <Field
                      as={TextField}
                      label="Descripcion"
                      name="descripcion_envasado"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={
                        formik.touched.descripcion_envasado &&
                        formik.errors.descripcion_envasado
                          ? true
                          : false
                      }
                      helperText={<ErrorMessage name="descripcion_envasado" />}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Folios usados"
                      name="folios_envasado"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={
                        formik.touched.folios_envasado &&
                        formik.errors.folios_envasado
                          ? true
                          : false
                      }
                      helperText={<ErrorMessage name="folios_envasado" />}
                    />
                  </Grid>

                  {/* <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Envase"
                      name="botellas"
                      variant="outlined"
                      fullWidth
                      select
                      margin="normal"
                      error={
                        formik.touched.botellas && formik.errors.botellas
                          ? true
                          : false
                      }
                      helperText={<ErrorMessage name="botellas" />}
                    >
                      <MenuItem value="1">Botella</MenuItem>
                    </Field>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Marbetes"
                      name="marbetes"
                      variant="outlined"
                      fullWidth
                      select
                      margin="normal"
                      error={
                        formik.touched.marbetes && formik.errors.marbetes
                          ? true
                          : false
                      }
                      helperText={<ErrorMessage name="marbetes" />}
                    >
                      <MenuItem value="1">Marbete</MenuItem>
                    </Field>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Holograma"
                      name="holograma"
                      variant="outlined"
                      fullWidth
                      select
                      margin="normal"
                      error={
                        formik.touched.holograma && formik.errors.holograma
                          ? true
                          : false
                      }
                      helperText={<ErrorMessage name="holograma" />}
                    >
                      <MenuItem value="1">Holograma</MenuItem>
                    </Field>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Mezcal"
                      name="mezcal"
                      variant="outlined"
                      fullWidth
                      select
                      margin="normal"
                      error={
                        formik.touched.mezcal && formik.errors.mezcal
                          ? true
                          : false
                      }
                      helperText={<ErrorMessage name="mezcal" />}
                    >
                      <MenuItem value="1">Mezcal</MenuItem>
                    </Field>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Biaticos"
                      name="biaticos"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={
                        formik.touched.biaticos && formik.errors.biaticos
                          ? true
                          : false
                      }
                      helperText={<ErrorMessage name="biaticos" />}
                    />
                  </Grid> */}

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
