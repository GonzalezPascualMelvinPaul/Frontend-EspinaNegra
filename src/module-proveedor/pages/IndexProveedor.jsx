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
import { getProveedoresProvider } from "../../providers/proveedor/providerProveedor";
import { IndexLayout } from "../../layouts";
import { Buscador, CustomTable } from "../../ui";
import { AddCircleOutline } from "@mui/icons-material";
import { EliminarProveedor } from "./EliminarProveedor";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { TableResponsiveCustom } from "../../ui/components/TableResponsiveCustom";

export const IndexProveedor = () => {
  const [proveedores, setProveedores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [buscador, setBuscador] = useState("");
  const [proveedorBuscador, setProveedorBuscador] = useState([]);
  const [proveedor, setProveedor] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const xssize = useMediaQuery(theme.breakpoints.only("xs"));

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
    searching(proveedores, event.target.value);
  };

  const searching = (proveedores, buscador) => {
    const newProveedor = proveedores.filter((proveedor) => {
      if (
        proveedor.nombre_persona_fisica
          .toUpperCase()
          .includes(buscador.toUpperCase())
      )
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
      field: "nombre_persona_fisica",
      headerName: "Nombre",
      flex: 1,
      sortable: true,
    },
    {
      field: "email_proveedor",
      headerName: "Email",
      flex: 2,
    },
    {
      field: "celular_proveedor",
      headerName: "Número",
      flex: 1,
    },
    {
      field: "rfc_persona_fisica",
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
            {(permisos === "Administrador" || permisos === "Gerente") && (
              <Button
                onClick={() => {
                  navigate(`/proveedor/editar/${row.id_proveedor}`);
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
          <Grid
            alignItems={"center"}
            justifyContent={{ xs: "center", md: "space-between" }}
            flexDirection={{ xs: "column", md: "row" }}
            display={"flex"}
          >
            {(permisos === "Administrador" || permisos === "Gerente") && (
              <Grid item xs={12} md={4}>
                <Button
                  onClick={() => navigate("/proveedor/agregar")}
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
                  data={proveedorBuscador}
                  columns={columns}
                  idData={"id_proveedor"}
                />
              ) : (
                <CustomTable
                  isLoading={isLoading}
                  data={proveedorBuscador}
                  columns={columns}
                  idData={"id_proveedor"}
                />
              )}
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
