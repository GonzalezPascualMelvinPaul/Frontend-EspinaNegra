import { Alert, Button, Skeleton, TextField } from "@mui/material";

import * as Yup from "yup";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { es } from "date-fns/locale";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IndexLayout } from "../../layouts";
import {
  getEmpleadoProvider,
  updateEmpleadoProvider,
} from "../../providers/empleado/providerEmpleado";
import { set, values } from "lodash";
import { AlertMessage, BreadCrumbsCustom } from "../../ui";
import dayjs from "dayjs";
dayjs.locale("es");
const validationSchema = Yup.object({
  nombre: Yup.string().required("El nombre es requerido"),
  apellido_paterno: Yup.string().required("El apellido paterno es requerido"),
  apellido_materno: Yup.string().required("El apellido materno es requerido"),
  edad: Yup.number()
    .typeError("La edad debe ser un numero")
    .required("La edad es requerida"),
  salario: Yup.number()
    .typeError("El salario debe ser un numero")
    .required("El salario es requerido"),
  porcentaje_comision: Yup.number()
    .typeError("El porcentaje de comision debe ser un numero")
    .required("El porcentaje de comision es requerido")
    .max(100, "El porcentaje de comision no puede ser mayor a 100")
    .min(0, "El porcentaje de comision no puede ser menor a 0"),
  fecha_ingreso: Yup.date().required("La fecha de ingreso es requerida"),
  fecha_nacimiento: Yup.date().required("La fecha de nacimiento es requerida"),
});
export const EditarEmpleado = ({
  type = "view",

  updateEmpleado = () => {},
}) => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [open, setOpen] = useState(false);
  const [empleado, setEmpleado] = useState({});
  const { id } = useParams();

  const getEmpleado = async () => {
    const { ok, data } = await getEmpleadoProvider(id);
    if (ok) {
      setIsLoadingData(true);
    } else {
      setIsLoadingData(false);
    }
    setEmpleado(data);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getEmpleado();
  }, []);

  const onSubmit = async (values, e) => {
    values.fecha_ingreso = dayjs(values.fecha_ingreso).format("YYYY-MM-DD");
    values.fecha_nacimiento = dayjs(values.fecha_nacimiento).format(
      "YYYY-MM-DD"
    );
    setIsLoading(true);
    console.log(values);
    const { ok, data, message } = await updateEmpleadoProvider(values, id);
    if (ok) {
      setOpen(true);
    } else {
      setError(true);
      setMessage(message);
    }
    setMessage(message);
    setIsLoading(false);
    setError(false);
  };

  const initialValues = {
    nombre: empleado?.nombre,
    apellido_paterno: empleado?.apellido_paterno,
    apellido_materno: empleado?.apellido_materno,
    edad: empleado?.edad,
    salario: empleado?.salario,
    porcentaje_comision: empleado?.porcentaje_comision,
    fecha_ingreso: new Date(empleado?.fecha_ingreso),
    fecha_nacimiento: new Date(empleado?.fecha_nacimiento),
  };

  return (
    <>
      <AlertMessage
        handleClose={handleClose}
        message={message}
        open={open}
        severity="info"
      />
      <IndexLayout title={"Empleado"}>
        <BreadCrumbsCustom
          routes={[
            {
              name: "Empleados",
              url: "/empleado/inicio",
            },
            {
              name: "Editar empleado",
              url: "",
            },
          ]}
        />
        {isLoadingData == false ? (
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
              {(formik) => (
                <Form>
                  <Field
                    as={TextField}
                    label="Nombre"
                    name="nombre"
                    disabled={true}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={
                      formik.touched.nombre && formik.errors.nombre
                        ? true
                        : false
                    }
                    helperText={<ErrorMessage name="nombre" />}
                  />
                  <Field
                    as={TextField}
                    label="Apellido Paterno"
                    name="apellido_paterno"
                    disabled={true}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={
                      formik.touched.apellido_paterno &&
                      formik.errors.apellido_paterno
                        ? true
                        : false
                    }
                    helperText={<ErrorMessage name="apellido_paterno" />}
                  />
                  <Field
                    as={TextField}
                    label="Apellido Materno"
                    name="apellido_materno"
                    disabled={true}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={
                      formik.touched.apellido_materno &&
                      formik.errors.apellido_materno
                        ? true
                        : false
                    }
                    helperText={<ErrorMessage name="apellido_materno" />}
                  />
                  <Field
                    as={TextField}
                    label="Edad"
                    name="edad"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={
                      formik.touched.edad && formik.errors.edad ? true : false
                    }
                    helperText={<ErrorMessage name="edad" />}
                  />
                  <Field
                    as={TextField}
                    label="Salario"
                    name="salario"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={
                      formik.touched.salario && formik.errors.salario
                        ? true
                        : false
                    }
                    helperText={<ErrorMessage name="salario" />}
                  />
                  <Field
                    as={TextField}
                    label="Porcentaje de comision"
                    name="porcentaje_comision"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={
                      formik.touched.porcentaje_comision &&
                      formik.errors.porcentaje_comision
                        ? true
                        : false
                    }
                    helperText={<ErrorMessage name="porcentaje_comision" />}
                  />
                  <Field name="fecha_ingreso">
                    {({ field, form }) => (
                      <LocalizationProvider
                        dateAdapter={AdapterDateFns}
                        adapterLocale={es}
                      >
                        <DatePicker
                          label="Fecha de ingreso"
                          name="fecha_ingreso"
                          value={field.value}
                          onChange={(date) =>
                            form.setFieldValue("fecha_ingreso", date)
                          }
                          error={
                            formik.touched.fecha_ingreso &&
                            formik.errors.fecha_ingreso
                              ? true
                              : false
                          }
                          helperText={<ErrorMessage name="fecha_ingreso" />}
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
                  <Field name="fecha_nacimiento">
                    {({ field, form }) => (
                      <LocalizationProvider
                        dateAdapter={AdapterDateFns}
                        adapterLocale={es}
                      >
                        <DatePicker
                          label="Fecha de nacimiento"
                          disabled={true}
                          name="fecha_nacimiento"
                          value={field.value}
                          onChange={(date) =>
                            form.setFieldValue("fecha_nacimiento", date)
                          }
                          error={
                            formik.touched.fecha_nacimiento &&
                            formik.errors.fecha_nacimiento
                              ? true
                              : false
                          }
                          helperText={<ErrorMessage name="fecha_nacimiento" />}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              fullWidth
                              margin="normal"
                            />
                          )}
                        />
                        <ErrorMessage name="fecha_nacimiento" />
                      </LocalizationProvider>
                    )}
                  </Field>
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
                  <Button type="submit" variant="contained">
                    Modificar
                  </Button>
                </Form>
              )}
            </Formik>
          </>
        )}
      </IndexLayout>
    </>
  );
};
