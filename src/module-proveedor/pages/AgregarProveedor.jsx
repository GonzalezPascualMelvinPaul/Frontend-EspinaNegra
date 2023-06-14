import React, { useEffect, useState } from "react";

import * as Yup from "yup";
import { AlertMessage, BreadCrumbsCustom } from "../../ui";
import { IndexLayout } from "../../layouts";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Alert, Button, TextField } from "@mui/material";
import { addProveedorProvider } from "../../providers/proveedor/providerProveedor";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  nombre: Yup.string().required("El nombre es requerido"),
  email: Yup.string().required("El email es requerido"),
  numero: Yup.number()
    .typeError("El numero debe contener solo números")
    .test(
      "len",
      "El numero debe contener 10 dígitos",
      (val) => val && val.toString().length === 10
    )
    .required("El numero es obligatorio"),
  rfc: Yup.string().required("El RFC es requerido"),
});

const initialValues = {
  nombre: "",
  email: "",
  numero: "",
  rfc: "",
};

export const AgregarProveedor = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
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
          {(formik) => (
            <Form>
              <Field
                as={TextField}
                label="Nombre"
                name="nombre"
                variant="outlined"
                fullWidth
                margin="normal"
                error={
                  formik.touched.nombre && formik.errors.nombre ? true : false
                }
                helperText={<ErrorMessage name="nombre" />}
              />
              <Field
                as={TextField}
                label="Email"
                name="email"
                variant="outlined"
                fullWidth
                margin="normal"
                error={
                  formik.touched.email && formik.errors.email ? true : false
                }
                helperText={<ErrorMessage name="email" />}
              />
              <Field
                as={TextField}
                label="Número"
                name="numero"
                variant="outlined"
                fullWidth
                margin="normal"
                error={
                  formik.touched.numero && formik.errors.numero ? true : false
                }
                helperText={<ErrorMessage name="numero" />}
                InputProps={{
                  inputProps: {
                    maxLength: 10,
                  },
                }}
                inputMode="numeric"
              />
              <Field
                as={TextField}
                label="RFC"
                name="rfc"
                variant="outlined"
                fullWidth
                margin="normal"
                error={formik.touched.rfc && formik.errors.rfc ? true : false}
                helperText={<ErrorMessage name="rfc" />}
              />

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
                Crear
              </Button>
            </Form>
          )}
        </Formik>
      </IndexLayout>
    </>
  );
};
