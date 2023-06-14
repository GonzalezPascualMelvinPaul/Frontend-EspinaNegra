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
import { getProveedoresProvider } from "../../providers/proveedor/providerProveedor";
import { IndexLayout } from "../../layouts";
import { Buscador, CustomTable } from "../../ui";
import { AddCircleOutline } from "@mui/icons-material";
import { EliminarProveedor } from "./EliminarProveedor";

export const IndexProveedor = () => {
  const [proveedores, setProveedores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [buscador, setBuscador] = useState("");
  const [proveedorBuscador, setProveedorBuscador] = useState([]);
  const [proveedor, setProveedor] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (event) => {
    setBuscador(event.target.value);
    searching(proveedores, event.target.value);
  };

  const searching = (proveedores, buscador) => {
    const newProveedor = proveedores.filter((proveedor) => {
      if (proveedor.nombre.toUpperCase().includes(buscador.toUpperCase()))
        return proveedor;
    });

    setProveedorBuscador(newProveedor);
  };

  const handleDelete = (row) => {
    setProveedor(row);
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
      field: "email",
      headerName: "Email",
      flex: 2,
    },
    {
      field: "numero",
      headerName: "Número",
      flex: 1,
    },
    {
      field: "rfc",
      headerName: "RFC",
      flex: 1,
    },
    {
      field: "acciones",
      headerName: "Acciones",
      flex: 3,
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
                navigate(`/proveedor/editar/${row.id}`);
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

  const getProveedores = async () => {
    const { data } = await getProveedoresProvider();
    setProveedores(data?.proveedores);
    setProveedorBuscador(data?.proveedores);
    setIsLoading(false);
  };

  useEffect(() => {
    getProveedores();
  }, []);
  return (
    <>
      <Box>
        <IndexLayout title={"Proveedores"}>
          <Box display={"flex"} alignItems={"center"}>
            <Button
              onClick={() => navigate("/proveedor/agregar")}
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
                data={proveedorBuscador}
                columns={columns}
                idData={"id"}
              />
            </>
          )}
        </IndexLayout>
        <EliminarProveedor
          open={modalDelete}
          onClose={handleDelete}
          proveedor={proveedor}
          updateProveedores={getProveedores}
        />
      </Box>
    </>
  );
};
