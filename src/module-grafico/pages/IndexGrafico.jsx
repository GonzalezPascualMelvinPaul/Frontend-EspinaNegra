import { Button, Container, Stack, Typography } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";
import Iconify from "../../components/iconify/Iconify";

import GoogleMaps from "../../ui/components/GoogleMaps";

export const IndexGrafico = () => {
  return (
    <>
      <Helmet>
        <title>Graficos</title>
      </Helmet>
      <Container>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Graficos
          </Typography>
          <Button
            onClick={() => {}}
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Graficos
          </Button>
          <GoogleMaps />
        </Stack>
      </Container>
    </>
  );
};
