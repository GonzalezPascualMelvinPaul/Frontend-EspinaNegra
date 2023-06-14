import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  getClienteProvider,
  updateClienteProvider,
} from "../../providers/cliente/providerCliente";
import { AlertMessage, BreadCrumbsCustom } from "../../ui";
import { IndexLayout } from "../../layouts";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Alert, Button, Skeleton, TextField } from "@mui/material";

const validationSchema = Yup.object({
  nombre: Yup.string().required("El nombre es requerido"),
  email: Yup.string().required("El email es requerido"),
  telefono: Yup.number()
    .typeError("El telefono debe contener solo números")
    .test(
      "len",
      "El telefono debe contener 10 dígitos",
      (val) => val && val.toString().length === 10
    )
    .required("El telefono es obligatorio"),
  rfc: Yup.string().required("El RFC es requerido"),
  direccion: Yup.object({
    calle: Yup.string().required("La calle es requerida"),
    ciudad: Yup.string().required("La ciudad es requerida"),
    estado: Yup.string().required("El estado es requerido"),
    pais: Yup.string().required("El país es requerido"),
    codigo_postal: Yup.number()
      .typeError("El código postal debe contener solo números")
      .test(
        "len",
        "El código postal debe contener 5 dígitos",
        (val) => val && val.toString().length === 5
      )
      .required("El código postal es obligatorio"),
    latitud: Yup.string().required("La latitud es requerida"),
    longitud: Yup.string().required("La longitud es requerida"),
    url_maps: Yup.string().nullable(),
  }),
});

export const EditarCliente = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [open, setOpen] = useState(false);
  const [cliente, setCliente] = useState([]);

  const { id } = useParams();

  const navigate = useNavigate();

  const getCliente = async () => {
    const { data, ok } = await getClienteProvider(id);
    if (ok) {
      setIsLoadingData(true);
    } else {
      setIsLoadingData(false);
    }
    console.log(data);
    setCliente(data);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getCliente();
  }, []);

  const onSubmit = async (values, e) => {
    setIsLoading(true);
    setError(false);
    setOpen(false);
    const { ok, data, message } = await updateClienteProvider(values, id);
    if (ok) {
      setOpen(true);
      setError(false);
      setTimeout(() => {
        navigate("/cliente/inicio");
      }, 300);
    } else {
      setError(true);
      setOpen(false);
    }
    setMessage(message);
    setIsLoading(false);
  };

  const initialValues = {
    nombre: cliente?.nombre,
    email: cliente?.email,
    telefono: cliente?.telefono,
    rfc: cliente?.rfc,
    direccion: {
      calle: cliente?.direccion?.calle,
      ciudad: cliente?.direccion?.ciudad,
      estado: cliente?.direccion?.estado,
      pais: cliente?.direccion?.pais,
      codigo_postal: cliente?.direccion?.codigo_postal,
      latitud: cliente?.direccion?.latitud,
      longitud: cliente?.direccion?.longitud,
      url_maps: cliente?.direccion?.url_maps
        ? cliente?.direccion?.url_maps
        : "",
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
      <IndexLayout title={"Cliente"}>
        <BreadCrumbsCustom
          routes={[
            {
              name: "Clientes",
              url: "/cliente/inicio",
            },
            {
              name: "Editar Cliente",
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
                  {/* Aquí vanlos campos del formulario, asegúrate de agregar los campos para la dirección también. Aquí está un ejemplo de cómo podrías hacerlo: */}
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
                    label="Teléfono"
                    name="telefono"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={
                      formik.touched.telefono && formik.errors.telefono
                        ? true
                        : false
                    }
                    helperText={<ErrorMessage name="telefono" />}
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
                  <Field
                    as={TextField}
                    label="Calle"
                    name="direccion.calle"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={
                      formik.touched.direccion?.calle &&
                      formik.errors.direccion?.calle
                        ? true
                        : false
                    }
                    helperText={<ErrorMessage name="direccion.calle" />}
                  />
                  <Field
                    as={TextField}
                    label="Ciudad"
                    name="direccion.ciudad"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={
                      formik.touched.direccion?.ciudad &&
                      formik.errors.direccion?.ciudad
                        ? true
                        : false
                    }
                    helperText={<ErrorMessage name="direccion.ciudad" />}
                  />
                  <Field
                    as={TextField}
                    label="Estado"
                    name="direccion.estado"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={
                      formik.touched.direccion?.estado &&
                      formik.errors.direccion?.estado
                        ? true
                        : false
                    }
                    helperText={<ErrorMessage name="direccion.estado" />}
                  />
                  <Field
                    as={TextField}
                    label="País"
                    name="direccion.pais"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={
                      formik.touched.direccion?.pais &&
                      formik.errors.direccion?.pais
                        ? true
                        : false
                    }
                    helperText={<ErrorMessage name="direccion.pais" />}
                  />
                  <Field
                    as={TextField}
                    label="Código Postal"
                    name="direccion.codigo_postal"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={
                      formik.touched.direccion?.codigo_postal &&
                      formik.errors.direccion?.codigo_postal
                        ? true
                        : false
                    }
                    helperText={<ErrorMessage name="direccion.codigo_postal" />}
                    InputProps={{
                      inputProps: {
                        maxLength: 5,
                      },
                    }}
                    inputMode="numeric"
                  />
                  <Field
                    as={TextField}
                    label="Latitud"
                    name="direccion.latitud"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={
                      formik.touched.direccion?.latitud &&
                      formik.errors.direccion?.latitud
                        ? true
                        : false
                    }
                    helperText={<ErrorMessage name="direccion.latitud" />}
                  />
                  <Field
                    as={TextField}
                    label="Longitud"
                    name="direccion.longitud"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={
                      formik.touched.direccion?.longitud &&
                      formik.errors.direccion?.longitud
                        ? true
                        : false
                    }
                    helperText={<ErrorMessage name="direccion.longitud" />}
                  />
                  <Field
                    as={TextField}
                    label="URL Maps"
                    name="direccion.url_maps"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={
                      formik.touched.direccion?.url_maps &&
                      formik.errors.direccion?.url_maps
                        ? true
                        : false
                    }
                    helperText={<ErrorMessage name="direccion.url_maps" />}
                  />
                  {/* Aquí van los demás campos de la dirección */}
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
                    Editar
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
