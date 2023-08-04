import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Iconify from "../../components/iconify/Iconify";
import { IndexLayout } from "../../layouts";
import { useNavigate } from "react-router-dom";
import { AddCircleOutline } from "@mui/icons-material";
import { Buscador } from "../../ui";
import { useSelector } from "react-redux";

export const IndexProduccion = () => {
  const [producciones, setProducciones] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [buscador, setBuscador] = useState("");
  const [produccionesBuscador, setProduccionesBuscador] = useState([]);
  const [produccion, setProduccion] = useState(null);
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
    searching(producciones, event.target.value);
  };

  const searching = (producciones, buscador) => {
    const newProducciones = producciones.filter((produccion) => {
      if (produccion.nombre.toUpperCase().includes(buscador.toUpperCase()))
        return produccion;
    });

    setProduccionesBuscador(newProducciones);
  };

  const handleDelete = (row) => {
    setProduccion(row);
    setModalDelete(!modalDelete);
  };

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
              <Buscador buscador={[]} handleSearch={handleSearch} />
            </Grid>
          </Grid>
        </IndexLayout>
      </Box>
    </>
  );
};
