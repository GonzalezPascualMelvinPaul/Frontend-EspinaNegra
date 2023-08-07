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
  Grid,
  InputAdornment,
  MenuItem,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { CameraAltOutlined } from "@mui/icons-material";
import {
  getVentaProvider,
  updateVentaProvider,
} from "../../providers/venta/providerVenta";
import { getClientesProvider } from "../../providers/cliente/providerCliente";
import { DataGrid } from "@mui/x-data-grid";
const validationSchema = Yup.object({
  id_cliente: Yup.number().required("El cliente es requerido"),
  total_venta: Yup.number()
    .required("El total es requerido")
    .min(0, "El total no puede ser negativo"),
  observaciones_venta: Yup.string().required(
    "Las observaciones son requeridas"
  ),
  numero_factura_venta: Yup.string(),
});

export const EditarVenta = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [open, setOpen] = useState(false);
  const [venta, setVenta] = useState([]);
  const [clientes, setClientes] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();
  const getClientes = async () => {
    const { data } = await getClientesProvider();
    setClientes(data?.clientes);
  };

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
    getClientes();
  }, []);

  const onSubmit = async (values, e) => {
    setIsLoading(true);
    setError(false);
    setOpen(false);
    const { ok, data, message } = await updateVentaProvider(values, id);
    if (ok) {
      setOpen(true);
      setError(false);
      setTimeout(() => {
        navigate("/venta/inicio");
      }, 2200);
    } else {
      setError(true);
      setOpen(false);
    }
    setMessage(message);
    setIsLoading(false);
  };
  const initialValues = {
    id_cliente: venta?.id_cliente || "",
    total_venta: venta?.total_venta || "",
    empleado: venta?.empleado?.nombre_persona_fisica || "",
    observaciones_venta: venta?.observaciones_venta || "",
    numero_factura_venta: venta?.numero_factura_venta || "",
    productos: venta?.productos_vendidos || "",
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
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Field
                        as={TextField}
                        label="Cliente"
                        name="id_cliente"
                        variant="outlined"
                        fullWidth
                        disabled
                        margin="normal"
                        select
                        error={
                          formik.touched.id_cliente && formik.errors.id_cliente
                            ? true
                            : false
                        }
                        helperText={<ErrorMessage name="id_cliente" />}
                      >
                        {clientes.map((option) => (
                          <MenuItem
                            key={option.id_cliente}
                            value={option.id_cliente}
                          >
                            {option.nombre_persona_fisica}
                          </MenuItem>
                        ))}
                      </Field>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        as={TextField}
                        label="Vendido por"
                        name="empleado"
                        disabled
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
                        name="observaciones_venta"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={
                          formik.touched.observaciones_venta &&
                          formik.errors.observaciones_venta
                            ? true
                            : false
                        }
                        helperText={<ErrorMessage name="observaciones_venta" />}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        as={TextField}
                        label="N. Factura / Nota"
                        name="numero_factura_venta"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        error={
                          formik.touched.numero_factura_venta &&
                          formik.errors.numero_factura_venta
                            ? true
                            : false
                        }
                        helperText={
                          <ErrorMessage name="numero_factura_venta" />
                        }
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        as={TextField}
                        label="Total"
                        name="total_venta"
                        variant="outlined"
                        fullWidth
                        disabled
                        margin="normal"
                        error={
                          formik.touched.total_venta &&
                          formik.errors.total_venta
                            ? true
                            : false
                        }
                        helperText={<ErrorMessage name="total_venta" />}
                        InputProps={{
                          inputProps: {
                            maxLength: 5,
                          },
                        }}
                        inputMode="numeric"
                      />
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <Typography variant="h6">Productos Vendidos</Typography>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      {/* Mostrar productos vendidos utilizando el DataGrid */}
                      <DataGrid
                        getRowId={(row) => row["id_venta"]}
                        rows={venta?.productos_vendidos || []}
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
                        Modificar
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
