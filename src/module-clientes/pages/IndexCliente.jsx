import {
  Box,
  Button,
  Container,
  Grid,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Iconify from "../../components/iconify/Iconify";
import { useNavigate } from "react-router-dom";
import { getClientesProvider } from "../../providers/cliente/providerCliente";
import { IndexLayout } from "../../layouts";
import { Buscador, CustomTable } from "../../ui";
import { AddCircleOutline } from "@mui/icons-material";
import { EliminarCliente } from "./EliminarCliente";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { TableResponsiveCustom } from "../../ui/components/TableResponsiveCustom";

export const IndexCliente = () => {
  const { user } = useSelector((state) => state.auth);
  const [clientes, setClientes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [buscador, setBuscador] = useState("");
  const [clienteBuscador, setClienteBuscador] = useState([]);
  const [cliente, setCliente] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);
  const [permisos, setPermisos] = useState("Usuario");
  const navigate = useNavigate();
  const theme = useTheme();
  const xssize = useMediaQuery(theme.breakpoints.only("xs"));

  const handleSearch = (event) => {
    setBuscador(event.target.value);
    searching(clientes, event.target.value);
  };

  const searching = (clientes, buscador) => {
    const newCliente = clientes.filter((cliente) => {
      if (cliente.nombre.toUpperCase().includes(buscador.toUpperCase()))
        return cliente;
    });

    setClienteBuscador(newCliente);
  };

  const handleDelete = (row) => {
    setCliente(row);
    setModalDelete(!modalDelete);
  };
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

  const columns = [
    {
      field: "nombre_persona_fisica",
      headerName: "Nombre",
      flex: 1,
      sortable: true,
    },
    {
      field: "email_cliente",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "celular_cliente",
      headerName: "Celular",
      flex: 1,
    },
    {
      field: "rfc_persona_fisica",
      headerName: "RFC",
      flex: 1,
    },
    {
      field: "direccion",
      headerName: "Dirección",
      flex: 3,
      renderCell: ({ row }) => {
        return `${row.calle_direccion}, ${row.ciudad_direccion}, Oaxaca`;
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
            {(permisos === "Administrador" || permisos === "Gerente") && (
              <Button
                onClick={() => {
                  navigate(`/cliente/editar/${row.id_cliente}`);
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

  const getClientes = async () => {
    const { data } = await getClientesProvider();
    setClientes(data?.clientes);
    setClienteBuscador(data?.clientes);
    setIsLoading(false);
  };

  useEffect(() => {
    getClientes();
  }, []);
  return (
    <>
      <Box>
        <IndexLayout title={"Clientes"}>
          <Grid
            alignItems={"center"}
            justifyContent={{ xs: "center", md: "space-between" }}
            flexDirection={{ xs: "column", md: "row" }}
            display={"flex"}
          >
            {(permisos === "Administrador" || permisos === "Gerente") && (
              <Grid item xs={12} md={4}>
                <Button
                  onClick={() => navigate("/cliente/agregar")}
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
              {xssize ? (
                <TableResponsiveCustom
                  isLoading={isLoading}
                  data={clienteBuscador}
                  columns={columns}
                  idData={"id_cliente"}
                />
              ) : (
                <CustomTable
                  isLoading={isLoading}
                  data={clienteBuscador}
                  columns={columns}
                  idData={"id_cliente"}
                />
              )}
            </>
          )}
        </IndexLayout>
        <EliminarCliente
          open={modalDelete}
          onClose={handleDelete}
          cliente={cliente}
          updateClientes={getClientes}
        />
      </Box>
    </>
  );
};
