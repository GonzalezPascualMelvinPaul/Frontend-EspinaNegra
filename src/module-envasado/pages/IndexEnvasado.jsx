import {
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
import { Buscador, CustomTable } from "../../ui";
import { AddCircleOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getEnvasadosProvider } from "../../providers/envasado/providerEnvasado";
import { TableResponsiveCustom } from "../../ui/components/TableResponsiveCustom";
import { EliminarEnvasado } from "./EliminarEnvasado";
import { VerGeneral } from "../../ui/components/VerGeneral";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const formartView = [
  { name: "id_envasado", title: "ID de Envasado" },
  { name: "descripcion_envasado", title: "Descripción de Envasado" },
  { name: "fecha_inicio_envasado", title: "Fecha de Inicio de Envasado" },
  { name: "fecha_final_envasado", title: "Fecha Final de Envasado" },
  {
    name: "folio_holograma_envasado",
    title: "Folios de Hologramas utilizados",
  },
  { name: "nombre_producto_envasado", title: "Nombre Producto" },
  { name: "folio_marbete_envasado", title: "Folios de Marbete utilizados" },
  { name: "total_detalle_envasado", title: "Total envasado" },
];

export const IndexEnvasado = () => {
  const [envasados, setEnvasados] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [buscador, setBuscador] = useState("");
  const [envasadosBuscador, setEnvasadosBuscador] = useState([]);
  const [envasado, setEnvasado] = useState(null);
  const [error, setError] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [permisos, setPermisos] = useState("Usuario");
  const theme = useTheme();
  const xssize = useMediaQuery(theme.breakpoints.only("xs"));

  const [modalView, setModalView] = useState(false);
  const handleView = (row) => {
    setEnvasado(row);
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

  const getEnvasado = async () => {
    const { ok, data } = await getEnvasadosProvider();
    setIsLoading(false);
    if (!ok) {
      setError("Hubo un error");
    } else {
      console.log(data);
    }

    setEnvasados(data?.envasados);
    setEnvasadosBuscador(data?.envasados);
    setIsLoading(false);
  };

  const handleSearch = (event) => {
    setBuscador(event.target.value);
    searching(envasados, event.target.value);
  };

  const searching = (envasados, buscador) => {
    const newEnvasados = envasados.filter((envasado) => {
      if (
        envasado.descripcion_envasado
          .toUpperCase()
          .includes(buscador.toUpperCase())
      )
        return envasado;
    });

    setEnvasadosBuscador(newEnvasados);
  };

  const handleDelete = (row) => {
    setEnvasado(row);
    setModalDelete(!modalDelete);
  };
  useEffect(() => {
    getEnvasado();
  }, []);

  const columns = [
    {
      field: "id_envasado",
      headerName: "ID",
      width: 50,
      sortable: true,
    },
    {
      field: "fecha_inicio_envasado",
      headerName: "Fecha de Inicio",
      width: 140,
      sortable: true,
    },
    {
      field: "fecha_final_envasado",
      headerName: "Fecha Final",
      width: 140,
      sortable: true,
    },
    {
      field: "descripcion_envasado",
      headerName: "Descripcion",
      width: 150,
      sortable: true,
    },
    {
      field: "nombre_producto_envasado",
      headerName: "Mezcal Envasado",
      width: 140,
      sortable: true,
    },
    {
      field: "total_detalle_envasado",
      headerName: "Total de produccion",
      width: 160,
      sortable: true,
      renderCell: ({ value }) => {
        return value ? `$ ${value}` : "";
      },
    },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 300,
      sortable: false,
      disableColumnMenu: true,
      renderCell: ({ row }) => {
        return (
          <Stack spacing={2} direction="row">
            <Button
              onClick={() => {
                console.log(row);
                const newRow = {
                  ...row,
                  total_detalle_envasado: "$" + row.total_detalle_envasado,
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
                  navigate(`/envasado/editar/${row.id_envasado}`);
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
        <IndexLayout title={"Envasado"}>
          <Grid
            alignItems={"center"}
            justifyContent={{ xs: "center", md: "space-between" }}
            flexDirection={{ xs: "column", md: "row" }}
            display={"flex"}
          >
            {(permisos === "Administrador" || permisos === "Gerente") && (
              <Grid item xs={12} md={4}>
                <Button
                  onClick={() => navigate("/envasado/agregar")}
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
                  data={envasadosBuscador}
                  columns={columns}
                  idData={"id_envasado"}
                />
              ) : (
                <CustomTable
                  isLoading={isLoading}
                  data={envasadosBuscador}
                  columns={columns}
                  idData={"id_envasado"}
                />
              )}
            </>
          )}
        </IndexLayout>
        <EliminarEnvasado
          open={modalDelete}
          onClose={handleDelete}
          envasado={envasado}
          updateEnvasados={getEnvasado}
        />

        <VerGeneral
          titulo="Detalle envasado"
          onClose={handleView}
          open={modalView}
          datos={envasado}
          names={formartView}
        />
      </Box>
    </>
  );
};
