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
import { useTheme } from "@mui/material/styles";
import { TableResponsiveCustom } from "../../ui/components/TableResponsiveCustom";
import { VerGeneral } from "../../ui/components/VerGeneral";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const formartView = [
  { name: "id_compra", title: "ID de Compra" },
  { name: "fecha_compra", title: "Fecha de Compra" },
  { name: "observaciones_compra", title: "Observaciones de Compra" },
  { name: "total_compra", title: "Total de Compra" },
  { name: "numero_factura_compra", title: "Número de Factura de Compra" },
  { name: "nombre_usuario", title: "Nombre de Usuario" },
  { name: "productos", title: "Productos Comprados" },
];

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
  const theme = useTheme();
  const xssize = useMediaQuery(theme.breakpoints.only("xs"));
  const [modalView, setModalView] = useState(false);
  const handleView = (row) => {
    setCompra(row);
    setModalView(!modalView);
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
      field: "nombre_usuario",
      headerName: "Empleado",
      flex: 2,
      sortable: true,
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
            <Button
              onClick={() => {
                const vendidos = row.productos_comprados.map((prod) => {
                  return prod.cantidad + " " + prod.producto + "| ";
                });
                const newRow = {
                  ...row,
                  productos: vendidos,
                  total_compra: "$" + row.total_compra,
                };

                handleView(newRow);
              }}
              variant="contained"
              color="info"
            >
              <InfoIcon />
            </Button>
            {(permisos === "Administrador" || permisos === "Gerente") && (
              <Button
                onClick={() => {
                  navigate(`/compra/editar/${row.id_compra}`);
                }}
                variant="contained"
                color="secondary"
              >
                <EditIcon />
              </Button>
            )}
            {permisos === "Administrador" && (
              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(row)}
              >
                <DeleteForeverIcon />
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
              {xssize ? (
                <TableResponsiveCustom
                  isLoading={isLoading}
                  data={comprasBuscador}
                  columns={columns}
                  idData={"id_compra"}
                />
              ) : (
                <CustomTable
                  isLoading={isLoading}
                  data={comprasBuscador}
                  columns={columns}
                  idData={"id_compra"}
                />
              )}
            </>
          )}
        </IndexLayout>
        <EliminarCompra
          compra={compra}
          onClose={handleDelete}
          open={modalDelete}
          updateCompras={getCompras}
        />
        <VerGeneral
          key={compra?.id_compra}
          titulo="Detalle compra"
          onClose={handleView}
          open={modalView}
          datos={compra}
          names={formartView}
        />
      </Box>
    </>
  );
};
