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

const formartView = [
  { name: "id_envasado", title: "ID de Envasado" },
  { name: "descripcion_envasado", title: "Descripción de Envasado" },
  { name: "fecha_inicio_envasado", title: "Fecha de Inicio de Envasado" },
  { name: "fecha_final_envasado", title: "Fecha Final de Envasado" },
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
      flex: 1,
      sortable: true,
    },
    {
      field: "fecha_inicio_envasado",
      headerName: "Fecha de Inicio",
      flex: 2,
      sortable: true,
    },
    {
      field: "fecha_final_envasado",
      headerName: "Fecha Final",
      flex: 2,
      sortable: true,
    },
    {
      field: "descripcion_envasado",
      headerName: "Envasado",
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
            <Button
              onClick={() => {
                console.log(row);
                const newRow = {
                  ...row,
                };

                handleView(newRow);
              }}
              variant="contained"
              color="info"
            >
              Ver
            </Button>
            {(permisos === "Administrador" || permisos === "Gerente") && (
              <Button
                onClick={() => {
                  navigate(`/envasado/editar/${row.id_envasado}`);
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
