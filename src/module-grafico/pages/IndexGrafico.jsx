import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Skeleton,
  Stack,
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

  const getProductos = async () => {
    setIsLoadingProductoComprado(false);
    const { ok, data } = await getComprasconProductoProvider();
    if (!ok) {
      setError("Huno un error");
      setIsLoadingProductoComprado(false);
    } else {
      setIsLoadingProductoComprado(true);
    }
    setProductosComprado(data);
  };

  const getVentas = async () => {
    setIsLoadingProductoVenta(false);
    const { ok, data } = await getVentasconProductoProvider();
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

  useEffect(() => {
    getDataSueldo();
    getProductos();
    getVentas();
    getProductoStock();
  }, []);

  return (
    <>
      <Box>
        <IndexLayout title={""}>
          <Grid mb={2} container spacing={2}>
            <Grid item xs={12} md={6}>
              {isLoadingProductoComprado ? (
                <>
                  <Card sx={{ maxWidth: 600 }}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Compras
                      </Typography>

                      <Chart
                        chartType="PieChart"
                        data={productosComprado}
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
            <Grid item xs={12} md={6}>
              {isLoadingProductoVenta ? (
                <>
                  {" "}
                  <Card sx={{ maxWidth: 600 }}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Ventas
                      </Typography>

                      <Chart
                        chartType="PieChart"
                        data={productosVenta}
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
            <Grid item xs={12} md={6}>
              {isLoadingSueldo ? (
                <>
                  {" "}
                  <Card sx={{ overflow: "auto" }}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
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
            <Grid item xs={12} md={6}>
              {isLoadingProductoComprado ? (
                <Card sx={{ overflow: "auto" }}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
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
          </Grid>
        </IndexLayout>
      </Box>
    </>
  );
};
