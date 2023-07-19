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
  nombre_persona_fisica: Yup.string().required("El nombre es requerido"),
  apellido_paterno_persona_fisica: Yup.string().required(
    "El apellido paterno es requerido"
  ),
  apellido_materno_persona_fisica: Yup.string().required(
    "El apellido materno es requerido"
  ),
  edad: Yup.number()
    .typeError("La edad debe ser un numero")
    .required("La edad es requerida"),
  salario_empleado: Yup.number()
    .typeError("El salario debe ser un numero")
    .required("El salario es requerido"),
  porcentaje_comision: Yup.number()
    .typeError("El porcentaje de comision debe ser un numero")
    .required("El porcentaje de comision es requerido")
    .max(100, "El porcentaje de comision no puede ser mayor a 100")
    .min(0, "El porcentaje de comision no puede ser menor a 0"),
  fecha_ingreso_empleado: Yup.date().required(
    "La fecha de ingreso es requerida"
  ),
  fecha_nacimiento_empleado: Yup.date().required(
    "La fecha de nacimiento es requerida"
  ),
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
    nombre_persona_fisica: empleado?.nombre_persona_fisica,
    apellido_paterno_persona_fisica: empleado?.apellido_paterno_persona_fisica,
    apellido_materno_persona_fisica: empleado?.apellido_materno_persona_fisica,
    edad: empleado?.edad,
    salario_empleado: empleado?.salario_empleado,
    comision_empleado: empleado?.comision_empleado,
    fecha_ingreso_empleado: new Date(empleado?.fecha_ingreso_empleado),
    fecha_nacimiento_empleado: new Date(empleado?.fecha_nacimiento_empleado),
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
                    name="nombre_persona_fisica"
                    disabled={true}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={
                      formik.touched.nombre_persona_fisica &&
                      formik.errors.nombre_persona_fisica
                        ? true
                        : false
                    }
                    helperText={<ErrorMessage name="nombre_persona_fisica" />}
                  />
                  <Field
                    as={TextField}
                    label="Apellido Paterno"
                    name="apellido_paterno_persona_fisica"
                    disabled={true}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={
                      formik.touched.apellido_paterno_persona_fisica &&
                      formik.errors.apellido_paterno_persona_fisica
                        ? true
                        : false
                    }
                    helperText={
                      <ErrorMessage name="apellido_paterno_persona_fisica" />
                    }
                  />
                  <Field
                    as={TextField}
                    label="Apellido Materno"
                    name="apellido_materno_persona_fisica"
                    disabled={true}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={
                      formik.touched.apellido_materno_persona_fisica &&
                      formik.errors.apellido_materno_persona_fisica
                        ? true
                        : false
                    }
                    helperText={
                      <ErrorMessage name="apellido_materno_persona_fisica" />
                    }
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
                    name="salario_empleado"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={
                      formik.touched.salario_empleado &&
                      formik.errors.salario_empleado
                        ? true
                        : false
                    }
                    helperText={<ErrorMessage name="salario_empleado" />}
                  />
                  <Field
                    as={TextField}
                    label="Porcentaje de comision"
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
                  <Field name="fecha_nacimiento_empleado">
                    {({ field, form }) => (
                      <LocalizationProvider
                        dateAdapter={AdapterDateFns}
                        adapterLocale={es}
                      >
                        <DatePicker
                          label="Fecha de nacimiento"
                          disabled={true}
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
