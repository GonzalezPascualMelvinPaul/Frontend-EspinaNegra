import React, { useEffect, useState } from "react";
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
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useNavigate, useParams } from "react-router-dom";
import {
  addEnvasadoProvider,
  getEnvasadoProvider,
  updateEnvasadoProvider,
} from "../../providers/envasado/providerEnvasado";
dayjs.locale("es");

const validationSchema = Yup.object({
  fecha_inicio_envasado: Yup.date().required("La fecha de inicio es requerida"),
  fecha_final_envasado: Yup.date().required("La fecha final es requerida"),
  descripcion_envasado: Yup.string().required("La descripción es requerida"),
});

export const EditarEnvasado = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [open, setOpen] = useState(false);
  const [envasado, setEnvasado] = useState({});
  const { id } = useParams();

  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const getEnvasado = async () => {
    const { ok, data } = await getEnvasadoProvider(id);
    if (ok) {
      setIsLoadingData(true);
    } else {
      setIsLoadingData(false);
    }

    setEnvasado(data);
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
    const { data, ok, message } = await updateEnvasadoProvider(values, id);
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
  useEffect(() => {
    getEnvasado();
  }, []);

  const initialValues = {
    fecha_inicio_envasado: dayjs(envasado?.fecha_inicio_envasado),
    fecha_final_envasado: dayjs(envasado?.fecha_final_envasado),
    descripcion_envasado: envasado?.descripcion_envasado || "",
  };

  return (
    <>
      <AlertMessage
        handleClose={handleClose}
        message={message}
        open={open}
        severity="info"
      />
      <IndexLayout title={"Envasado"}>
        <BreadCrumbsCustom
          routes={[
            {
              name: "Envasados",
              url: "/envasado/inicio",
            },
            {
              name: "Editar envasado",
              url: "",
            },
          ]}
        />
        {isLoadingData == false ? (
          <>
            <Skeleton variant="rectangular" width={"100%"} height={"80%"} />
          </>
        ) : (
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
                                form.setFieldValue(
                                  "fecha_inicio_envasado",
                                  date
                                )
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
                        helperText={
                          <ErrorMessage name="descripcion_envasado" />
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
        )}
      </IndexLayout>
    </>
  );
};
