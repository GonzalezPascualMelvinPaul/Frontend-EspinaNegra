import React, { useState } from "react";
import dayjs from "dayjs";
import es from "date-fns/locale/es";
import * as Yup from "yup";
import { AlertMessage, BreadCrumbsCustom } from "../../ui";
import { IndexLayout } from "../../layouts";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
dayjs.locale("es");

const validationSchema = Yup.object({
  fecha_inicio_produccion: Yup.date().required(
    "La fecha de inicio es requerida"
  ),
  fecha_final_produccion: Yup.date().required("La fecha final es requerida"),
  descripcion_produccion: Yup.string(),
  litros_obtenidos_produccion: Yup.number(),
  lote_produccion: Yup.string().required("El lote de produccion es requerido"),
});

const initialValues = {
  fecha_inicio_produccion: new Date(),
  fecha_final_produccion: new Date(),
  descripcion_produccion: "",
  litros_obtenidos_produccion: 0,
  lote_produccion: "",
};

export const AgregarProduccion = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = async (values, e) => {
    values.fecha_inicio_produccion = dayjs(
      values.fecha_inicio_produccion
    ).format("YYYY-MM-DD");
    values.fecha_final_produccion = dayjs(values.fecha_final_produccion).format(
      "YYYY-MM-DD"
    );
    setIsLoading(true);
    setError(false);
    setOpen(false);
    console.log("Values", values);
    //const { data, ok, message } = await addEmpleadoProvider(values);
    if (ok) {
      setOpen(true);
      setError(false);
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
      <IndexLayout title={"Produccion"}>
        <BreadCrumbsCustom
          routes={[
            {
              name: "Producciones",
              url: "/produccion/inicio",
            },
            {
              name: "Agregar produccion",
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
                    <Typography variant="h6">Datos Produccion</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field name="fecha_inicio_produccion">
                      {({ field, form }) => (
                        <LocalizationProvider
                          dateAdapter={AdapterDateFns}
                          adapterLocale={es}
                        >
                          <DatePicker
                            label="Fecha de inicio"
                            name="fecha_inicio_produccion"
                            value={field.value}
                            onChange={(date) =>
                              form.setFieldValue(
                                "fecha_inicio_produccion",
                                date
                              )
                            }
                            error={
                              formik.touched.fecha_inicio_produccion &&
                              formik.errors.fecha_inicio_produccion
                                ? true
                                : false
                            }
                            helperText={
                              <ErrorMessage name="fecha_inicio_produccion" />
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
                    <Field name="fecha_final_produccion">
                      {({ field, form }) => (
                        <LocalizationProvider
                          dateAdapter={AdapterDateFns}
                          adapterLocale={es}
                        >
                          <DatePicker
                            label="Fecha final"
                            name="fecha_final_produccion"
                            value={field.value}
                            onChange={(date) =>
                              form.setFieldValue("fecha_final_produccion", date)
                            }
                            error={
                              formik.touched.fecha_final_produccion &&
                              formik.errors.fecha_final_produccion
                                ? true
                                : false
                            }
                            helperText={
                              <ErrorMessage name="fecha_final_produccion" />
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
                      name="descripcion_produccion"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={
                        formik.touched.descripcion_produccion &&
                        formik.errors.descripcion_produccion
                          ? true
                          : false
                      }
                      helperText={
                        <ErrorMessage name="descripcion_produccion" />
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Litro Obtenidos"
                      name="litros_obtenidos_produccion"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      inputMode="numeric"
                      error={
                        formik.touched.litros_obtenidos_produccion &&
                        formik.errors.litros_obtenidos_produccion
                          ? true
                          : false
                      }
                      helperText={
                        <ErrorMessage name="litros_obtenidos_produccion" />
                      }
                      InputProps={{
                        inputProps: {
                          maxLength: 10,
                          minLength: 2,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      as={TextField}
                      label="Lote de Produccion"
                      name="lote_produccion"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={
                        formik.touched.lote_produccion &&
                        formik.errors.lote_produccion
                          ? true
                          : false
                      }
                      helperText={<ErrorMessage name="lote_produccion" />}
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
