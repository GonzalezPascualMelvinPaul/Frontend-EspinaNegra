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
import { getUsersProvider } from "../../providers/usuario/providerUsuario";
import { IndexLayout } from "../../layouts";
import { Buscador, CustomTable } from "../../ui";
import { AddCircleOutline } from "@mui/icons-material";
import { EliminarUser } from "./EliminarUser";
import { useTheme } from "@mui/material/styles";
import { TableResponsiveCustom } from "../../ui/components/TableResponsiveCustom";

export const IndexUsuarios = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [buscador, setBuscador] = useState("");
  const [userBuscador, setUserBuscador] = useState([]);
  const [user, setUser] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const xssize = useMediaQuery(theme.breakpoints.only("xs"));

  const handleSearch = (event) => {
    setBuscador(event.target.value);
    searching(users, event.target.value);
  };

  const searching = (users, buscador) => {
    const newUsers = users.filter((user) => {
      if (user.username.toUpperCase().includes(buscador.toUpperCase()))
        return user;
    });

    setUserBuscador(newUsers);
  };

  const handleDelete = (row) => {
    setUser(row);
    setModalDelete(!modalDelete);
  };

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
              onClick={() => handleDelete(row)}
            >
              Eliminar
            </Button>
          </Stack>
        );
      },
    },
  ];

  const getUsers = async () => {
    const { data } = await getUsersProvider();
    setUsers(data.users);
    setUserBuscador(data.users);
    setIsLoading(false);
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <>
      <Box>
        <IndexLayout title={"Usuarios"}>
          <Grid
            alignItems={"center"}
            justifyContent={{ xs: "center", md: "space-between" }}
            flexDirection={{ xs: "column", md: "row" }}
            display={"flex"}
          >
            <Grid item xs={12} md={4}>
              <Button
                onClick={() => navigate("/usuario/agregar")}
                variant="contained"
                endIcon={<AddCircleOutline />}
              >
                Agregar
              </Button>
            </Grid>
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
                  data={userBuscador}
                  columns={columns}
                  idData={"id"}
                />
              ) : (
                <CustomTable
                  isLoading={isLoading}
                  data={userBuscador}
                  columns={columns}
                  idData={"id"}
                />
              )}
            </>
          )}
        </IndexLayout>
        <EliminarUser
          open={modalDelete}
          onClose={handleDelete}
          user={user}
          updateUsers={getUsers}
        />
      </Box>
    </>
  );
};
