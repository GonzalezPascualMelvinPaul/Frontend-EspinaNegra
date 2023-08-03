import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";
import Iconify from "../../components/iconify/Iconify";
import { IndexLayout } from "../../layouts";
import { useNavigate } from "react-router-dom";

export const IndexDashboard = () => {
  const navigate = useNavigate();
  const cards = [
    {
      title: "Agregar Productos",
      url: "/producto/agregar",
      description: "Pagina para agregar nuevos productos",
      urlImage:
        "https://emprendepyme.net/wp-content/uploads/2023/03/cualidades-producto-1200x900.jpg",
    },
    {
      title: "Agregar Clientes",
      url: "/cliente/agregar",
      description: "Pagina para agregar nuevos clientes",
      urlImage:
        "https://www.grupocibernos.com/hs-fs/hubfs/fidelizar-clientes.jpg?width=960&name=fidelizar-clientes.jpg",
    },
    {
      title: "Agregar Proveedores",
      url: "/proveedor/agregar",
      description: "Pagina para agregar nuevos proveedores",
      urlImage:
        "https://thelogisticsworld.com/wp-content/uploads/2020/09/proveedores-e1663621176409.jpeg",
    },
    {
      title: "Agregar Bodegas",
      url: "/bodega/agregar",
      description: "Pagina para agregar nuevas bodegas",
      urlImage:
        "https://k-espacio.com/wp-content/uploads/almacen-problemas-y-soluciones.jpg",
    },
    {
      title: "Crear Produccion",
      url: "/produccion/agregar",
      description: "Pagina para crear nuevas producciones",
      urlImage:
        "https://www.microtech.es/hubfs/Fotos%20blog/produccion_empresa_fabricacion.jpg",
    },
    {
      title: "Crear Envasado",
      url: "/envasado/agregar",
      description: "Pagina para crear nuevos envasados",
      urlImage:
        "https://thefoodtech.com/wp-content/uploads/2022/03/industria-de-envase-principal.jpg",
    },
  ];

  return (
    <>
      <IndexLayout title={""}>
        <Grid
          alignContent={"center"}
          justifyContent={"center"}
          container
          spacing={3}
        >
          <Grid justifyContent={"center"} item xs={12}>
            <Typography variant="h6">Atajos Rapidos</Typography>
          </Grid>
          {cards.map((option) => (
            <Grid item key={option.title} sx={4}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea onClick={() => navigate(option.url)}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={option.urlImage}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {option.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {option.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </IndexLayout>
    </>
  );
};
