import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  getUserProvider,
  updateUserProvider,
} from "../../providers/usuario/providerUsuario";
import { getRolesProvider } from "../../providers/role/providerRole";
import { AlertMessage, BreadCrumbsCustom } from "../../ui";
import { IndexLayout } from "../../layouts";
import { useNavigate, useParams } from "react-router-dom";
import { getEmpleadosProvider } from "../../providers/empleado/providerEmpleado";
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
  getVentaProvider,
  updateVentaProvider,
} from "../../providers/venta/providerVenta";
const validationSchema = Yup.object({
  observaciones: Yup.string().required("El email es requerido"),
  recibo: Yup.string(),
});

export const EditarVenta = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [open, setOpen] = useState(false);
  const [venta, setVenta] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const getVenta = async () => {
    const { ok, data } = await getVentaProvider(id);
    if (ok) {
      console.log("Venta a editar", data);
      setIsLoadingData(true);
    } else {
      setIsLoadingData(false);
    }
    setVenta(data.venta);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    getVenta();
  }, []);

  const onSubmit = async (values, e) => {
    setIsLoading(true);
    setError(false);
    setOpen(false);
    const { ok, data, message } = await updateVentaProvider(values, id);
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
      navigate("/venta/inicio");
    }, 2200);
  };
  const initialValues = {
    observaciones: venta?.observaciones,
    recibo: venta?.recibo,
  };
  return (
    <>
      <AlertMessage
        handleClose={handleClose}
        message={message}
        open={open}
        severity="info"
      />
      <IndexLayout title={"Venta"}>
        <BreadCrumbsCustom
          routes={[
            {
              name: "Ventas",
              url: "/venta/inicio",
            },
            {
              name: "Editar venta",
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
