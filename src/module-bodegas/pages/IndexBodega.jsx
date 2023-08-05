import {
  Box,
  Button,
  Grid,
  Skeleton,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBodegasProvider } from "../../providers/bodega/providerBodega";
import { IndexLayout } from "../../layouts";
import { Buscador, CustomTable } from "../../ui";
import { AddCircleOutline } from "@mui/icons-material";
import { EliminarBodega } from "./EliminarBodega";
import { TableResponsiveCustom } from "../../ui/components/TableResponsiveCustom";

export const IndexBodega = () => {
  const [bodegas, setBodegas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [buscador, setBuscador] = useState("");
  const [bodegaBuscador, setBodegaBuscador] = useState([]);
  const [bodega, setBodega] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const xssize = useMediaQuery(theme.breakpoints.only("xs"));

  const handleSearch = (event) => {
    setBuscador(event.target.value);
    searching(bodegas, event.target.value);
  };

  const searching = (bodegas, buscador) => {
    const newBodega = bodegas.filter((bodega) => {
      if (bodega.nombre_bodega.toUpperCase().includes(buscador.toUpperCase()))
        return bodega;
    });

    setBodegaBuscador(newBodega);
  };

  const handleDelete = (row) => {
    setBodega(row);
    setModalDelete(!modalDelete);
  };

  const columns = [
    {
      field: "nombre_bodega",
      headerName: "Nombre",
      flex: 1,
      sortable: true,
    },
    {
      field: "descripcion_bodega",
      headerName: "Descripción",
      flex: 1,
    },
    {
      field: "direccion",
      headerName: "Dirección",
      flex: 3,
      renderCell: ({ row }) => {
        return `${row.direccion.calle_direccion}, ${row.direccion.ciudad_direccion}, Oaxaca`;
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
                navigate(`/bodega/editar/${row.id}`);
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

  const getBodegas = async () => {
    const { data } = await getBodegasProvider();
    setBodegas(data?.bodegas);
    setBodegaBuscador(data?.bodegas);
    setIsLoading(false);
  };

  useEffect(() => {
    getBodegas();
  }, []);
  return (
    <>
      <Box>
        <IndexLayout title={"Bodegas"}>
          <Grid
            alignItems={"center"}
            justifyContent={{ xs: "center", md: "space-between" }}
            flexDirection={{ xs: "column", md: "row" }}
            display={"flex"}
          >
            <Grid item xs={12} md={4}>
              <Button
                onClick={() => navigate("/bodega/agregar")}
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
                  data={bodegaBuscador}
                  columns={columns}
                  idData={"id_bodega"}
                />
              ) : (
                <CustomTable
                  isLoading={isLoading}
                  data={bodegaBuscador}
                  columns={columns}
                  idData={"id_bodega"}
                />
              )}
            </>
          )}
        </IndexLayout>
        <EliminarBodega
          open={modalDelete}
          onClose={handleDelete}
          bodega={bodega}
          updateBodegas={getBodegas}
        />
      </Box>
    </>
  );
};
