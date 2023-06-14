import {
  Box,
  Button,
  Container,
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

export const IndexProducto = () => {
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [buscador, setBuscador] = useState("");
  const [productosBuscador, setProductosBuscador] = useState([]);
  const [producto, setProducto] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);
  const navigate = useNavigate();

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
      field: "nombre",
      headerName: "Nombre",
      flex: 1,
      sortable: true,
    },
    {
      field: "precio_compra",
      headerName: "Precio Compra",
      flex: 1,
      sortable: true,
    },
    {
      field: "precio_venta",
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
      field: "cantidad",
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
        return (
          <Stack spacing={2} direction="row">
            <Button onClick={() => {}} variant="contained" color="info">
              Ver
            </Button>
            <Button
              onClick={() => {
                navigate(`/producto/editar/${row.id}`);
              }}
              variant="contained"
              color="secondary"
            >
              Editar
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleDelete(row)}
            >
              Eliminar
            </Button>
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
  };
  useEffect(() => {
    getProductos();
  }, []);
  return (
    <>
      <Box>
        <IndexLayout title={"Producto"}>
          <Box display={"flex"} alignItems={"center"}>
            <Button
              onClick={() => navigate("/producto/agregar")}
              variant="contained"
              endIcon={<AddCircleOutline />}
            >
              Agregar
            </Button>
            <Buscador buscador={buscador} handleSearch={handleSearch} />
          </Box>
          {isLoading ? (
            <Skeleton variant="rectangular" width={"100%"} height={"80%"} />
          ) : (
            <>
              <CustomTable
                isLoading={isLoading}
                data={productosBuscador}
                columns={columns}
                idData={"id"}
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
