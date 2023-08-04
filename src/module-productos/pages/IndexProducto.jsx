import {
  Box,
  Button,
  Container,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Iconify from "../../components/iconify/Iconify";
import { useNavigate } from "react-router-dom";
import { IndexLayout } from "../../layouts";
import { Buscador, CustomTable } from "../../ui";
import { AddCircleOutline } from "@mui/icons-material";
import { EliminarProducto } from "./EliminarProducto";
import { getProductosProvider } from "../../providers/producto/providerProducto";
import { useSelector } from "react-redux";

export const IndexProducto = () => {
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [buscador, setBuscador] = useState("");
  const [productosBuscador, setProductosBuscador] = useState([]);
  const [producto, setProducto] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [permisos, setPermisos] = useState("Usuario");

  useEffect(() => {
    const { nombre_rol } = user;
    if (nombre_rol === "Usuario") {
      setPermisos("Usuario");
    }
    if (nombre_rol === "Gerente") {
      setPermisos("Gerente");
    }
    if (nombre_rol === "Administrador") {
      setPermisos("Administrador");
    }
  }, [user]);

  const handleSearch = (event) => {
    setBuscador(event.target.value);
    searching(productos, event.target.value);
  };

  const searching = (productos, buscador) => {
    const newProductos = productos.filter((producto) => {
      if (producto.nombre.toUpperCase().includes(buscador.toUpperCase()))
        return producto;
    });

    setProductosBuscador(newProductos);
  };

  const handleDelete = (row) => {
    setProducto(row);
    console.log(modalDelete);
    setModalDelete(!modalDelete);
  };

  const columns = [
    {
      field: "nombre_producto",
      headerName: "Nombre",
      flex: 1,
      sortable: true,
    },
    {
      field: "precio_compra_producto",
      headerName: "Precio Compra",
      flex: 1,
      sortable: true,
    },
    {
      field: "precio_venta_producto",
      headerName: "Precio Venta",
      flex: 1,
      sortable: true,
    },
    {
      field: "unidad_medida",
      headerName: "Unidad Medida",
      flex: 1,
      sortable: true,
    },
    {
      field: "cantidad_stock",
      headerName: "Cantidad",
      flex: 1,
      sortable: true,
    },
    {
      field: "nombre_categoria",
      headerName: "Categoría",
      flex: 1,
      sortable: true,
    },
    {
      field: "acciones",
      headerName: "Acciones",
      flex: 2,
      sortable: false,
      disableColumnMenu: true,
      renderCell: ({ row }) => {
        console.log("Row__", row);
        return (
          <Stack spacing={2} direction="row">
            <Button onClick={() => {}} variant="contained" color="info">
              Ver
            </Button>
            {(permisos === "Administrador" || permisos === "Gerente") && (
              <Button
                onClick={() => {
                  navigate(`/producto/editar/${row.id_producto}`);
                }}
                variant="contained"
                color="secondary"
              >
                Editar
              </Button>
            )}
            {permisos === "Administrador" && (
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(row)}
              >
                Eliminar
              </Button>
            )}
          </Stack>
        );
      },
    },
  ];

  const getProductos = async () => {
    const { data } = await getProductosProvider();
    setProductos(data.productos);
    setProductosBuscador(data.productos);
    setIsLoading(false);
    console.log(data);
  };
  useEffect(() => {
    getProductos();
  }, []);
  return (
    <>
      <Box>
        <IndexLayout title={"Producto"}>
          <Grid
            alignItems={"center"}
            justifyContent={{ xs: "center", md: "space-between" }}
            flexDirection={{ xs: "column", md: "row" }}
            display={"flex"}
          >
            {(permisos === "Administrador" || permisos === "Gerente") && (
              <Grid item xs={12} md={4}>
                <Button
                  onClick={() => navigate("/producto/agregar")}
                  variant="contained"
                  endIcon={<AddCircleOutline />}
                >
                  Agregar
                </Button>
              </Grid>
            )}

            <Grid item xs={12} md={8}>
              <Buscador buscador={buscador} handleSearch={handleSearch} />
            </Grid>
          </Grid>
          {isLoading ? (
            <Skeleton variant="rectangular" width={"100%"} height={"80%"} />
          ) : (
            <>
              <CustomTable
                isLoading={isLoading}
                data={productosBuscador}
                columns={columns}
                idData={"id_producto"}
              />
            </>
          )}
        </IndexLayout>
        <EliminarProducto
          open={modalDelete}
          onClose={handleDelete}
          producto={producto}
          updateProductos={getProductos}
        />
      </Box>
    </>
  );
};
