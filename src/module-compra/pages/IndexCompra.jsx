import {
  Alert,
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
import { IndexLayout } from "../../layouts";
import { AddCircleOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom/dist";
import { Buscador, CustomTable } from "../../ui";
import { EliminarCompra } from "./EliminarCompra";
import { getComprasProvider } from "../../providers/compra/providerCompra";

export const IndexCompra = () => {
  const [compras, setCompras] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [buscador, setBuscador] = useState("");
  const [comprasBuscador, setComprasBuscador] = useState([]);
  const [compra, setCompra] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getCompras = async () => {
    const { ok, data } = await getComprasProvider();
    setIsLoading(false);
    if (!ok) {
      setError("Hubo un error");
    } else {
      console.log(data);
    }

    setCompras(data.compras);
    setComprasBuscador(data.compras);
    setIsLoading(false);
  };

  const handleDelete = (row) => {
    console.log(row);
    setCompra(row);
    setModalDelete(!modalDelete);
  };

  const handleSearch = (event) => {
    setBuscador(event.target.value);
    searching(users, event.target.value);
  };

  useEffect(() => {
    getCompras();
  }, []);

  const columns = [
    {
      field: "id_compra",
      headerName: "ID",
      flex: 1,
      sortable: true,
    },
    {
      field: "fecha_compra",
      headerName: "Fecha",
      flex: 2,
      sortable: true,
    },
    {
      field: "empleado",
      headerName: "Empleado",
      flex: 2,
      sortable: true,
      renderCell: ({ value }) => {
        return value.nombre_persona_fisica;
      },
    },
    {
      field: "total_compra",
      headerName: "Total",
      flex: 2,
      sortable: true,
      renderCell: ({ value }) => {
        return "$ " + value;
      },
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
                navigate(`/compra/editar/${row.id}`);
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

  return (
    <>
      <Box>
        <IndexLayout title={"Compras"}>
          <Box display={"flex"} alignItems={"center"}>
            <Button
              onClick={() => navigate("/compra/agregar")}
              variant="contained"
              endIcon={<AddCircleOutline />}
            >
              Agregar
            </Button>
            <Buscador buscador={buscador} handleSearch={handleSearch} />
          </Box>
          {isLoading ? (
            <Skeleton variant="rectangular" width={"100%"} height={"80%"} />
          ) : error ? (
            <Alert severity="error">Algo salio mal</Alert>
          ) : (
            <>
              <CustomTable
                isLoading={isLoading}
                data={comprasBuscador}
                columns={columns}
                idData={"id_compra"}
              />
            </>
          )}
        </IndexLayout>
        <EliminarCompra
          open={modalDelete}
          onClose={handleDelete}
          compra={compra}
          updateCompras={getCompras}
        />
      </Box>
    </>
  );
};
