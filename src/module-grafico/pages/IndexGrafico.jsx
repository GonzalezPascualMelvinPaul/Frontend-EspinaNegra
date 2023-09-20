import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Iconify from "../../components/iconify/Iconify";

import { IndexLayout } from "../../layouts";
import { BarChart, LineChart, PieChart } from "@mui/x-charts";
import { getSueldosProvider } from "../../providers/empleado/providerEmpleado";
import { GoogleMaps } from "../../ui";
import { LoadScript } from "@react-google-maps/api";
import { getComprasconProductoProvider } from "../../providers/compra/providerCompra";
import { getVentasconProductoProvider } from "../../providers/venta/providerVenta";
import AppCurrentVisits from "../../sections/@dashboard/app/AppCurrentVisits";
import { getProductoStockProvider } from "../../providers/producto/providerProducto";
import Chart from "react-google-charts";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { es } from "date-fns/locale";
import dayjs from "dayjs";
import * as Yup from "yup";
dayjs.locale("es");

const validationSchema = Yup.object({
  fecha_inicio_grafico: Yup.date().required("La fecha de inicio es requerida"),
  fecha_final_grafico: Yup.date().required("La fecha final es requerida"),
});

export const IndexGrafico = () => {
  const [sueldo, setSueldo] = useState([]);
  const [productosComprado, setProductosComprado] = useState([]);
  const [productosVenta, setProductosVenta] = useState([]);
  const [productoStock, setProductoStock] = useState([]);
  const [isLoadingSueldo, setIsLoadingSueldo] = useState(false);
  const [isLoadingProductoComprado, setIsLoadingProductoComprado] =
    useState(false);
  const [isLoadingProductoVenta, setIsLoadingProductoVenta] = useState(false);
  const [isLoadingProductoStock, setIsLoadingProductoStock] = useState(false);
  const [error, setError] = useState();

  const initialValues = {
    fecha_inicio_grafico: dayjs().subtract(1, "years").toDate(),
    fecha_final_grafico: dayjs(),
    grafica: 0,
  };

  const onSubmit = async (values, e) => {
    console.log(values);
    values.fecha_inicio_grafico = dayjs(values.fecha_inicio_grafico).format(
      "YYYY-MM-DD"
    );
    values.fecha_final_grafico = dayjs(values.fecha_final_grafico).format(
      "YYYY-MM-DD"
    );
    console.log(values);
    getProductos(values);
    getVentas(values);
  };

  const getDataSueldo = async () => {
    setIsLoadingSueldo(false);
    const { ok, data } = await getSueldosProvider();

    if (!ok) {
      setError("Hubo un error");
      setIsLoadingSueldo(false);
    } else {
      setIsLoadingSueldo(true);
    }
    setSueldo(data);
  };

  const getProductos = async (values) => {
    setIsLoadingProductoComprado(false);

    const { ok, data } = await getComprasconProductoProvider(values);
    if (!ok) {
      setError("Huno un error");
      setIsLoadingProductoComprado(false);
    } else {
      setIsLoadingProductoComprado(true);
    }
    setProductosComprado(data);
  };

  const getVentas = async (values) => {
    setIsLoadingProductoVenta(false);
    const { ok, data } = await getVentasconProductoProvider(values);
    if (!ok) {
      setIsLoadingProductoVenta(false);
    } else {
      setIsLoadingProductoVenta(true);
    }
    setProductosVenta(data);
  };
  const getProductoStock = async () => {
    setIsLoadingProductoStock(false);
    const { ok, data } = await getProductoStockProvider();
    if (!ok) {
      setError("Huno un error");
      setIsLoadingProductoStock(false);
    } else {
      setIsLoadingProductoStock(true);
    }
    setProductoStock(data);
  };
  const dateInitial = {
    fecha_inicio_grafico: dayjs(initialValues.fecha_inicio_grafico).format(
      "YYYY-MM-DD"
    ),
    fecha_final_grafico: dayjs(initialValues.fecha_final_grafico).format(
      "YYYY-MM-DD"
    ),
  };

  useEffect(() => {
    getDataSueldo();
    getProductos(dateInitial);
    getVentas(dateInitial);
    getProductoStock();
  }, []);

  return (
    <>
      <Box>
        <IndexLayout title={""}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Field name="fecha_inicio_grafico">
                      {({ field, form }) => (
                        <LocalizationProvider
                          dateAdapter={AdapterDateFns}
                          adapterLocale={es}
                        >
                          <DatePicker
                            label="Fecha de inicio"
                            name="fecha_inicio_grafico"
                            value={field.value}
                            onChange={(date) =>
                              form.setFieldValue("fecha_inicio_grafico", date)
                            }
                            error={
                              formik.touched.fecha_inicio_grafico &&
                              formik.errors.fecha_inicio_grafico
                                ? true
                                : false
                            }
                            helperText={
                              <ErrorMessage name="fecha_inicio_grafico" />
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
                          <ErrorMessage name="fecha_inicio_grafico" />
                        </LocalizationProvider>
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Field name="fecha_final_grafico">
                      {({ field, form }) => (
                        <LocalizationProvider
                          dateAdapter={AdapterDateFns}
                          adapterLocale={es}
                        >
                          <DatePicker
                            label="Fecha final"
                            name="fecha_final_grafico"
                            value={field.value}
                            onChange={(date) =>
                              form.setFieldValue("fecha_final_grafico", date)
                            }
                            error={
                              formik.touched.fecha_final_grafico &&
                              formik.errors.fecha_final_grafico
                                ? true
                                : false
                            }
                            helperText={
                              <ErrorMessage name="fecha_final_grafico" />
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
                          <ErrorMessage name="fecha_final_grafico" />
                        </LocalizationProvider>
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Field
                      as={TextField}
                      label="Gráfica"
                      name="grafica"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      select
                      error={
                        formik.touched.grafica && formik.errors.grafica
                          ? true
                          : false
                      }
                      helperText={<ErrorMessage name="grafica" />}
                    >
                      <MenuItem value={0}>
                        <em>Todos</em>
                      </MenuItem>
                      <MenuItem value={1}>Compras</MenuItem>
                      <MenuItem value={2}>Ventas</MenuItem>
                      <MenuItem value={3}>Sueldo Empleados</MenuItem>
                      <MenuItem value={4}>Producto Stock</MenuItem>
                    </Field>
                  </Grid>
                  <Grid
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"end"}
                    item
                    xs={12}
                    md={12}
                  >
                    <Button type="submit" variant="contained">
                      Buscar
                    </Button>
                  </Grid>
                </Grid>
                <Grid
                  overflow={"auto"}
                  maxHeight={{ xs: 400, md: 400, xl: 450 }}
                >
                  {(formik.values.grafica === 0 ||
                    formik.values.grafica === 1) && (
                    <>
                      <Grid mb={3} mt={3} item xs={6} md={6}>
                        <Card>
                          {isLoadingProductoComprado ? (
                            <>
                              <CardContent>
                                <Typography
                                  gutterBottom
                                  variant="h5"
                                  component="div"
                                >
                                  Compras
                                </Typography>

                                <Chart
                                  chartType="PieChart"
                                  data={productosComprado}
                                  height="300px"
                                  width={"100%"}
                                  options={{
                                    is3D: true,
                                  }}
                                />
                              </CardContent>
                            </>
                          ) : (
                            <>
                              <Skeleton height={"300px"} />
                            </>
                          )}
                        </Card>
                      </Grid>
                    </>
                  )}
                  {(formik.values.grafica === 0 ||
                    formik.values.grafica === 2) && (
                    <>
                      <Grid mb={3} mt={3} item xs={6} md={6}>
                        <Card>
                          <CardContent>
                            {isLoadingProductoVenta ? (
                              <>
                                {" "}
                                <Typography
                                  gutterBottom
                                  variant="h5"
                                  component="div"
                                >
                                  Ventas
                                </Typography>
                                <Chart
                                  chartType="PieChart"
                                  data={productosVenta}
                                  height="300px"
                                  width={"100%"}
                                  options={{
                                    is3D: true,
                                  }}
                                />
                              </>
                            ) : (
                              <>
                                <Skeleton height={"300px"} />
                              </>
                            )}
                          </CardContent>
                        </Card>
                      </Grid>
                    </>
                  )}
                  {(formik.values.grafica === 0 ||
                    formik.values.grafica === 3) && (
                    <>
                      <Grid mb={3} mt={3} item xs={12} md={6}>
                        {isLoadingSueldo ? (
                          <>
                            {" "}
                            <Card sx={{ overflow: "auto" }}>
                              <CardContent>
                                <Typography
                                  gutterBottom
                                  variant="h5"
                                  component="div"
                                >
                                  Sueldos de empleados
                                </Typography>
                                <Chart
                                  chartType="PieChart"
                                  data={sueldo}
                                  width="100%"
                                  height="300px"
                                  options={{
                                    is3D: true,
                                  }}
                                />
                              </CardContent>
                            </Card>
                          </>
                        ) : (
                          <>
                            <Skeleton height={"300px"} />
                          </>
                        )}
                      </Grid>
                    </>
                  )}
                  {(formik.values.grafica === 0 ||
                    formik.values.grafica === 4) && (
                    <>
                      <Grid mb={3} mt={3} item xs={12} md={6}>
                        {isLoadingProductoComprado ? (
                          <Card sx={{ overflow: "auto" }}>
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                              >
                                Productos
                              </Typography>
                              <Chart
                                chartType="PieChart"
                                data={productoStock}
                                width="100%"
                                height="300px"
                                loader={false}
                                options={{
                                  is3D: true,
                                }}
                              />
                            </CardContent>
                          </Card>
                        ) : (
                          <>
                            <Skeleton height={"300px"} />
                          </>
                        )}
                      </Grid>
                    </>
                  )}
                </Grid>
              </Form>
            )}
          </Formik>
        </IndexLayout>
      </Box>
    </>
  );
};
