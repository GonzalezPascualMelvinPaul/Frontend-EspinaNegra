import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Iconify from "../../components/iconify/Iconify";
import { IndexLayout } from "../../layouts";
import { Buscador } from "../../ui";
import { AddCircleOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const IndexEnvasado = () => {
  const [envasados, setEnvasados] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [buscador, setBuscador] = useState("");
  const [envasadosBuscador, setEnvasadosBuscador] = useState([]);
  const [envasado, setEnvasado] = useState(null);
  const [modalDelete, setModalDelete] = useState(false);
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

  const handleSearch = (event) => {
    setBuscador(event.target.value);
    searching(envasados, event.target.value);
  };

  const searching = (envasados, buscador) => {
    const newEnvasados = envasados.filter((envasado) => {
      if (envasado.nombre.toUpperCase().includes(buscador.toUpperCase()))
        return envasado;
    });

    setEnvasadosBuscador(newEnvasados);
  };
  const handleDelete = (row) => {
    setEnvasado(row);
    setModalDelete(!modalDelete);
  };

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
              <Buscador buscador={[]} handleSearch={handleSearch} />
            </Grid>
          </Grid>
        </IndexLayout>
      </Box>
    </>
  );
};
