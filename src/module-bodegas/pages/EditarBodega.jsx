import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import {
  getBodegaProvider,
  updateBodegaProvider,
} from "../../providers/bodega/providerBodega";
import { AlertMessage, BreadCrumbsCustom } from "../../ui";
import { IndexLayout } from "../../layouts";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Alert, Button, Skeleton, TextField } from "@mui/material";

const validationSchema = Yup.object({
  nombre: Yup.string().required("El nombre es requerido"),
  descripcion: Yup.string().required("La descripción es requerida"),
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

export const EditarBodega = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [open, setOpen] = useState(false);
  const [bodega, setBodega] = useState([]);

  const { id } = useParams();

  const navigate = useNavigate();

  const getBodega = async () => {
    const { data, ok } = await getBodegaProvider(id);
    if (ok) {
      setIsLoadingData(true);
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
    nombre: bodega?.nombre,
    descripcion: bodega?.descripcion || "",
    direccion: {
      calle: bodega?.direccion?.calle,
      ciudad: bodega?.direccion?.ciudad,
      estado: bodega?.direccion?.estado,
      pais: bodega?.direccion?.pais,
      codigo_postal: bodega?.direccion?.codigo_postal,
      latitud: bodega?.direccion?.latitud,
      longitud: bodega?.direccion?.longitud,
      url_maps: bodega?.direccion?.url_maps || "",
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
                    label="Descripción"
                    name="descripcion"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={
                      formik.touched.descripcion && formik.errors.descripcion
                        ? true
                        : false
                    }
                    helperText={<ErrorMessage name="descripcion" />}
                  />
                  {/* Aquí van los campos de la dirección */}
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
