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
  Grid,
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
import { DataGrid } from "@mui/x-data-grid";

const validationSchema = Yup.object({
  total_compra: Yup.number()
    .required("El total es requerido")
    .min(0, "El total no puede ser negativo"),
  observaciones_compra: Yup.string().required(
    "Las observaciones son requeridas"
  ),
  numero_factura_compra: Yup.string(),
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
      setIsLoadingData(true);
      setCompra(data);
    } else {
      setIsLoadingData(false);
    }
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
      setTimeout(() => {
        navigate("/compra/inicio");
      }, 2200);
    } else {
      setError(true);
      setOpen(false);
    }
    setMessage(message);
    setIsLoading(false);
  };
  const initialValues = {
    total_compra: compra?.total_compra || "",
    observaciones_compra: compra?.observaciones_compra || "",
    numero_factura_compra: compra?.numero_factura_compra || "",
    productos: compra?.productos_comprados || [],
    empleado: compra?.nombre_usuario,
  };

  const columns = [
    {
      field: "producto",
      headerName: "Producto",
      flex: 2,
      sortable: true,
    },
    {
      field: "cantidad",
      headerName: "Cantidad",
      flex: 2,
      sortable: true,
    },
  ];

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
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Field
                        as={TextField}
                        label="Vendido por"
                        name="empleado"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={
                          formik.touched.empleado && formik.errors.empleado
                            ? true
                            : false
                        }
                        helperText={<ErrorMessage name="empleado" />}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        as={TextField}
                        label="Observaciones"
                        name="observaciones_compra"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={
                          formik.touched.observaciones_compra &&
                          formik.errors.observaciones_compra
                            ? true
                            : false
                        }
                        helperText={
                          <ErrorMessage name="observaciones_compra" />
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        as={TextField}
                        label="N. Factura / Nota"
                        name="numero_factura_compra"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={
                          formik.touched.numero_factura_compra &&
                          formik.errors.numero_factura_compra
                            ? true
                            : false
                        }
                        helperText={
                          <ErrorMessage name="numero_factura_compra" />
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        as={TextField}
                        label="Total"
                        name="total_compra"
                        variant="outlined"
                        fullWidth
                        disabled
                        margin="normal"
                        error={
                          formik.touched.total_compra &&
                          formik.errors.total_compra
                            ? true
                            : false
                        }
                        helperText={<ErrorMessage name="total_compra" />}
                        InputProps={{
                          inputProps: {
                            maxLength: 5,
                          },
                        }}
                        inputMode="numeric"
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      {/* Mostrar productos vendidos utilizando el DataGrid */}
                      <DataGrid
                        getRowId={(row) => row["id_compra"]}
                        rows={compra?.productos_comprados || []}
                        columns={columns}
                        autoHeight
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
              )}
            </Formik>
          </>
        )}
      </IndexLayout>
    </>
  );
};
