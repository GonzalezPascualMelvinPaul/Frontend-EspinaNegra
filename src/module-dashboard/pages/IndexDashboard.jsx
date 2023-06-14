import { Button, Container, Stack, Typography } from "@mui/material";
import React from "react";
import { Helmet } from "react-helmet-async";
import Iconify from "../../components/iconify/Iconify";

export const IndexDashboard = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Container>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>
          <Button
            onClick={() => {}}
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Ejemplo
          </Button>
        </Stack>
      </Container>
    </>
  );
};
