import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Iconify from "../../components/iconify/Iconify";
import { IndexLayout } from "../../layouts";
import { useNavigate } from "react-router-dom";
import { AddCircleOutline } from "@mui/icons-material";
import { Buscador, CustomTable } from "../../ui";
import { useSelector } from "react-redux";
import { getProduccionesProvider } from "../../providers/produccion/providerProduccion";
import { TableResponsiveCustom } from "../../ui/components/TableResponsiveCustom";
import { EliminarProduccion } from "./EliminarProduccion";

export const IndexProduccion = () => {
  const [producciones, setProducciones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [buscador, setBuscador] = useState("");
  const [produccionesBuscador, setProduccionesBuscador] = useState([]);
  const [produccion, setProduccion] = useState(null);
  const [error, setError] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [permisos, setPermisos] = useState("Usuario");
  const theme = useTheme();
  const xssize = useMediaQuery(theme.breakpoints.only("xs"));

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

  const getProduccion = async () => {
    const { ok, data } = await getProduccionesProvider();
    setIsLoading(false);
    if (!ok) {
      setError("Hubo un error");
    } else {
      console.log(data);
    }

    setProducciones(data?.producciones);
    setProduccionesBuscador(data?.producciones);
    setIsLoading(false);
  };

  const handleSearch = (event) => {
    setBuscador(event.target.value);
    searching(producciones, event.target.value);
  };

  const searching = (producciones, buscador) => {
    const newProducciones = producciones.filter((produccion) => {
      if (
        produccion.lote_produccion
          .toUpperCase()
          .includes(buscador.toUpperCase())
      )
        return produccion;
    });

    setProduccionesBuscador(newProducciones);
  };

  const handleDelete = (row) => {
    setProduccion(row);
    setModalDelete(!modalDelete);
  };

  useEffect(() => {
    getProduccion();
  }, []);

  const columns = [
    {
      field: "id_produccion",
      headerName: "ID",
      flex: 1,
      sortable: true,
    },
    {
      field: "fecha_inicio_produccion",
      headerName: "Fecha de Inicio",
      flex: 2,
      sortable: true,
    },
    {
      field: "fecha_final_produccion",
      headerName: "Fecha Final",
      flex: 2,
      sortable: true,
    },
    {
      field: "litros_obtenidos_produccion",
      headerName: "Litros Obtenidos",
      flex: 2,
      sortable: true,
    },
    {
      field: "lote_produccion",
      headerName: "Lote de Produccion",
      flex: 2,
      sortable: true,
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
                  navigate(`/produccion/editar/${row.id}`);
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

  return (
    <>
      <Box>
        <IndexLayout title={"Produccion"}>
          <Grid
            alignItems={"center"}
            justifyContent={{ xs: "center", md: "space-between" }}
            flexDirection={{ xs: "column", md: "row" }}
            display={"flex"}
          >
            {(permisos === "Administrador" || permisos === "Gerente") && (
              <Grid item xs={12} md={4}>
                <Button
                  onClick={() => navigate("/produccion/agregar")}
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
          ) : error ? (
            <Alert severity="error">Algo salio mal</Alert>
          ) : (
            <>
              {xssize ? (
                <TableResponsiveCustom
                  isLoading={isLoading}
                  data={produccionesBuscador}
                  columns={columns}
                  idData={"id_produccion"}
                />
              ) : (
                <CustomTable
                  isLoading={isLoading}
                  data={produccionesBuscador}
                  columns={columns}
                  idData={"id_produccion"}
                />
              )}
            </>
          )}
        </IndexLayout>
        <EliminarProduccion
          open={modalDelete}
          onClose={handleDelete}
          produccion={produccion}
          updateProducciones={getProduccion}
        />
      </Box>
    </>
  );
};
