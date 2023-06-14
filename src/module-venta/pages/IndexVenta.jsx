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
import { EliminarVenta } from "../componentes/EliminarVenta";
import { useNavigate } from "react-router-dom/dist";
import { Buscador } from "../../ui";
import { getVentasProvider } from "../../providers/venta/providerVenta";

export const IndexVenta = () => {
  const [ventas, setVentas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [buscador, setBuscador] = useState("");
  const [ventasBuscador, setVentasBuscador] = useState([]);
  const [venta, setVenta] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getVentas = async () => {
    console.log("haciendo peticion");
    const { ok, data } = await getVentasProvider();
    setIsLoading(false);
    if (!ok) {
      setError("Hubo un error");
    }

    setVentas(data.users);
    setVentasBuscador(data.users);
    setIsLoading(false);
  };

  const handleDelete = (row) => {
    setVenta(row);
    setModalDelete(!modalDelete);
  };

  const handleSearch = (event) => {
    setBuscador(event.target.value);
    searching(users, event.target.value);
  };

  useEffect(() => {
    getVentas();
  }, []);

  const columns = [
    {
      field: "name",
      headerName: "Nombre",
      flex: 2,
      sortable: true,
      renderCell: ({ row }) => {
        return (
          <Stack spacing={2} direction="row">
            {row.nombre} {row.apellido_paterno} {row.apellido_materno}
          </Stack>
        );
      },
    },
    {
      field: "username",
      headerName: "Username",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 2,
    },
    {
      field: "nombre_rol",
      headerName: "Rol",
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
                navigate(`/usuario/editar/${row.id}`);
              }}
              variant="contained"
              color="secondary"
            >
              Editar
            </Button>
            <Button
              variant="contained"
              color="error"
              /* onClick={() => handleDelete(row)} */
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
        <IndexLayout title={"Ventas"}>
          <Box display={"flex"} alignItems={"center"}>
            <Button
              onClick={() => navigate("/venta/agregar")}
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
                data={ventasBuscador}
                columns={columns}
                idData={"id"}
              />
            </>
          )}
        </IndexLayout>
        <EliminarVenta
          open={modalDelete}
          onClose={handleDelete}
          user={venta}
          updateUsers={getVentas}
        />
      </Box>
    </>
  );
};
