import { Button, Container, Stack, Typography } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";
import Iconify from "../../components/iconify/Iconify";

export const IndexProduccion = () => {
  return (
    <>
      <Helmet>
        <title>Produccion</title>
      </Helmet>
      <Container>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Produccion
          </Typography>
          <Button
            onClick={() => {}}
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Produccion
          </Button>
        </Stack>
      </Container>
    </>
  );
};
