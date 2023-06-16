import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { AlertMessage, BreadCrumbsCustom } from "../../ui";
import { IndexLayout } from "../../layouts";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  Alert,
  Button,
  CircularProgress,
  InputAdornment,
  MenuItem,
  Skeleton,
  TextField,
} from "@mui/material";
import { CameraAltOutlined } from "@mui/icons-material";
import {
  getCompraProvider,
  updateCompraProvider,
} from "../../providers/compra/providerCompra";

const validationSchema = Yup.object({
  observaciones: Yup.string().required("El campo observaciones es requerido"),
  recibo: Yup.string(),
});

export const EditarCompra = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [open, setOpen] = useState(false);
  const [compra, setCompra] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const getCompra = async () => {
    const { ok, data } = await getCompraProvider(id);
    if (ok) {
      console.log("Compra a editar", data);
      setIsLoadingData(true);
    } else {
      setIsLoadingData(false);
    }
    setCompra(data.compra);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getCompra();
  }, []);

  const onSubmit = async (values, e) => {
    setIsLoading(true);
    setError(false);
    setOpen(false);
    const { ok, data, message } = await updateCompraProvider(values, id);
    if (ok) {
      setOpen(true);
      setError(false);
    } else {
      setError(true);
      setOpen(false);
    }
    setMessage(message);
    setIsLoading(false);
    setTimeout(() => {
      navigate("/compra/inicio");
    }, 2200);
  };
  const initialValues = {
    observaciones: compra?.observaciones,
    recibo: compra?.recibo || "",
  };
  return (
    <>
      <AlertMessage
        handleClose={handleClose}
        message={message}
        open={open}
        severity="info"
      />
      <IndexLayout title={"Compra"}>
        <BreadCrumbsCustom
          routes={[
            {
              name: "Compras",
              url: "/compra/inicio",
            },
            {
              name: "Editar compra",
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
                    label="Observaciones"
                    name="observaciones"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={
                      formik.touched.observaciones &&
                      formik.errors.observaciones
                        ? true
                        : false
                    }
                    helperText={<ErrorMessage name="observaciones" />}
                  />

                  <Field
                    as={TextField}
                    label="Recibo"
                    name="recibo"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={
                      formik.touched.recibo && formik.errors.recibo
                        ? true
                        : false
                    }
                    helperText={<ErrorMessage name="recibo" />}
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
