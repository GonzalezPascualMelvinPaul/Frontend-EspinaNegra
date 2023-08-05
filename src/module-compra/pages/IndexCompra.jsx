import {
  Alert,
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
import { IndexLayout } from "../../layouts";
import { AddCircleOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom/dist";
import { Buscador, CustomTable } from "../../ui";
import { EliminarCompra } from "./EliminarCompra";
import { getComprasProvider } from "../../providers/compra/providerCompra";
import { useSelector } from "react-redux";

export const IndexCompra = () => {
  const [compras, setCompras] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [buscador, setBuscador] = useState("");
  const [comprasBuscador, setComprasBuscador] = useState([]);
  const [compra, setCompra] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);
  const [error, setError] = useState(null);
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
    searching(compras, event.target.value);
  };

  const searching = (compras, buscador) => {
    const newCompra = compras.filter((compra) => {
      if (
        compra.empleado?.nombre_persona_fisica
          .toUpperCase()
          .includes(buscador.toUpperCase())
      )
        return compra;
    });

    setComprasBuscador(newCompra);
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
            {(permisos === "Administrador" || permisos === "Gerente") && (
              <Button
                onClick={() => {
                  navigate(`/compra/editar/${row.id}`);
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
        <IndexLayout title={"Compras"}>
          <Grid
            alignItems={"center"}
            justifyContent={{ xs: "center", md: "space-between" }}
            flexDirection={{ xs: "column", md: "row" }}
            display={"flex"}
          >
            {(permisos === "Administrador" || permisos === "Gerente") && (
              <Grid item xs={12} md={4}>
                <Button
                  onClick={() => navigate("/compra/agregar")}
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
