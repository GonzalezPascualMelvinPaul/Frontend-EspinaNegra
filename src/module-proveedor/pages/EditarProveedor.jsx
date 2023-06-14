import React, { useEffect, useState } from "react";

import * as Yup from "yup";
import { AlertMessage, BreadCrumbsCustom } from "../../ui";
import { IndexLayout } from "../../layouts";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Alert, Button, Skeleton, TextField } from "@mui/material";
import {
  getProveedorProvider,
  updateProveedorProvider,
} from "../../providers/proveedor/providerProveedor";
import { useNavigate, useParams } from "react-router-dom";
const validationSchema = Yup.object({
  nombre: Yup.string().required("El nombre es requerido"),
  numero: Yup.number()
    .typeError("El numero debe contener solo números")
    .test(
      "len",
      "El numero debe contener 10 dígitos",
      (val) => val && val.toString().length === 10
    )
    .required("El numero es obligatorio"),
});
export const EditarProveedor = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [open, setOpen] = useState(false);
  const [proveedor, setProveedor] = useState([]);
  const { id } = useParams();

  const navigate = useNavigate();

  const getProovedor = async () => {
    const { ok, data } = await getProveedorProvider(id);
    if (ok) {
      setIsLoadingData(true);
    } else {
      setIsLoadingData(false);
    }
    setProveedor(data);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getProovedor();
  }, []);

  const onSubmit = async (values, e) => {
    setIsLoading(true);
    setError(false);
    setOpen(false);
    const { ok, data, message } = await updateProveedorProvider(values, id);
    if (ok) {
      setOpen(true);
      setError(false);
      setTimeout(() => {
        navigate("/proveedor/inicio");
      }, 300);
    } else {
      setError(true);
      setOpen(false);
    }
    setMessage(message);
    setIsLoading(false);
  };

  const initialValues = {
    nombre: proveedor?.nombre,
    email: proveedor?.email,
    numero: proveedor?.numero,
    rfc: proveedor?.rfc,
  };

  return (
    <>
      <AlertMessage
        handleClose={handleClose}
        message={message}
        open={open}
        severity="info"
      />
      <IndexLayout title={"Proveedor"}>
        <BreadCrumbsCustom
          routes={[
            {
              name: "Proveedores",
              url: "/proveedor/inicio",
            },
            {
              name: "Editar Proveedor",
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
                      formik.touched.numero && formik.errors.numero
                        ? true
                        : false
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
                    disabled={true}
                    margin="normal"
                    error={
                      formik.touched.rfc && formik.errors.rfc ? true : false
                    }
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
